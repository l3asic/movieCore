package com.example.movieCore.migMovie.controller;

import com.example.movieCore.migMovie.api.DataConverter;
import com.example.movieCore.migMovie.api.MigMovieApiClientImpl;
import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.migMovie.service.MigMovManageServiceImpl;
import com.example.movieCore.migMovie.vo.MigMovVo;
import com.example.movieCore.utils.MakeUUID;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

@Controller
@RequiredArgsConstructor
public class MigMovManageController {

    private final MigMovManageServiceImpl movManageService;
    private final MigMovieApiClientImpl migMovieApiClientImpl;

    private final MakeUUID makeUUID = new MakeUUID();

    private final DataConverter dataConverter = new DataConverter();

    /** 영화 목록, 영화 상세정보 api 호출 및 이관 */
    @PostMapping(value = "/callMovieApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMovieApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        boolean successResult = true;

        MigMovVo movVo = migMovieApiClientImpl.callMovieApi(1);

        int maxPage = movVo.getTotCnt()/100 + 1;

        for (int curPage = 1; curPage < maxPage+1; curPage++) {
            // 영화 목록 api 호출 (1페이지당 100개)
            movVo = migMovieApiClientImpl.callMovieApi(curPage);

            // LinkedHashMap 데이터 BeanList 구조로 변환
            movVo.setMigMovieBeanList(dataConverter.convertToMovieBeanList((List) movVo.getMigMovieBeanList()));

            // 영화 100개 인서트
            for (int j = 0; j < movVo.getMigMovieBeanList().size(); j++) {
                // 영화 한 개 정보 세팅
                movVo.setMigMovieBean(movVo.getMigMovieBeanList().get(j));



                // 제작사 코드들 추출 및 매핑 테이블 인서트
                if(movVo.getMigMovieBean().getCompanys() != null && movVo.getMigMovieBean().getCompanys().size() >0){

                    for (int i = 0; i < movVo.getMigMovieBean().getCompanys().size(); i++) {

                        // 영화에서 회사 코드 추출
                        LinkedHashMap<String, Object> companyMap = movVo.getMigMovieBean().getCompanys().get(i);
                        String companyCd = (String) companyMap.get("companyCd");
                        movVo.getMigMovieBean().setCompanyCd(companyCd);

                        // 회사 코드 실재 확인
                        int companyCnt = 0;
                        companyCnt = movManageService.checkTheCompany(movVo);

                        if(companyCnt>0){
                            movManageService.insertMovieCompanyMap(movVo);
                        }else {
                            System.out.println("영화에 맞는 회사가 디비에 없음?");
                        }



                    }



                }



                // 개봉일 없을시 예외 처리
                if (movVo.getMigMovieBean().getOpenDt() == null || movVo.getMigMovieBean().getOpenDt().isEmpty() || movVo.getMigMovieBean().getOpenDt().equals(""))  {
                    movVo.getMigMovieBean().setOpenDt(null);
                }


                /** 영화 상세 정보 api 호출 */
                movVo.setMigMovieInfoBean(migMovieApiClientImpl.callMovieInfoApi(movVo.getMigMovieBean().getMovieCd()));

                // 영화 상세정보가 없을경우
                if(movVo.getMigMovieInfoBean() == null || StringUtil.isNullOrEmpty(movVo.getMigMovieInfoBean().getMovieCd())){
                    movVo.setMigMovieInfoBean(new MigMovieInfoBean());
                    movVo.getMigMovieInfoBean().setMovieCd(movVo.getMigMovieBean().getMovieCd());
                }


                // 영화 상세정보 개봉일 없을시 예외 처리
                if (movVo.getMigMovieInfoBean().getOpenDt() == null || movVo.getMigMovieInfoBean().getOpenDt().isEmpty() || movVo.getMigMovieInfoBean().getOpenDt().equals(""))  {
                    movVo.getMigMovieInfoBean().setOpenDt(null);
                }

                /** 리스트 데이터 가공 */

                // 제작 국가 (리스트) 매핑 이관
//                if(!movVo.getMigMovieInfoBean().getNations().isEmpty()){
                List<MigMovieNationBean> nationsList = movVo.getMigMovieInfoBean().getNations();
                if(nationsList == null || nationsList.isEmpty()) {
                    System.out.println("제작 국가가 비었음?");
                }else{
                    MigMovieNationBean migMovieNationBean = new MigMovieNationBean();

                    for (int k = 0; k < movVo.getMigMovieInfoBean().getNations().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getNations().get(k);

                        // 제작 국가명 추출
                        migMovieNationBean.setKorNm((String)dataMap.get("nationNm"));
                        
                        // 제작 국가 코드 조회
                        migMovieNationBean.setNationCd(movManageService.selectMovieNation(migMovieNationBean));

                        if(!StringUtil.isNullOrEmpty(migMovieNationBean.getNationCd())){
                            migMovieNationBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());
                            movVo.setMigMovieNationBean(migMovieNationBean);

                            // 영화 <=> 제작국가 매핑 인서트
                            movManageService.insertMovieNationMap(movVo);
                        }else {
                            System.out.println("검색된 제작국가 없음 ");
                        }



                    }
                }




                if(movVo.getMigMovieInfoBean().getShowTypes() != null && movVo.getMigMovieInfoBean().getShowTypes().size() > 0){
                    String showTypeGroupNm = "";
                    String showTypeNm = "";

                    for (int k = 0; k < movVo.getMigMovieInfoBean().getShowTypes().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getShowTypes().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(showTypeGroupNm) && !showTypeGroupNm.equals(""))showTypeGroupNm += ",";
                            if(!StringUtil.isNullOrEmpty(showTypeNm) && !showTypeNm.equals(""))showTypeNm += ",";
                        }

                        showTypeGroupNm += (String) dataMap.get("showTypeGroupNm");
                        showTypeNm += (String) dataMap.get("showTypeNm");

                    }
                    movVo.getMigMovieInfoBean().setShowTypeGroupNm(showTypeGroupNm);
                    movVo.getMigMovieInfoBean().setShowTypeNm(showTypeNm);

                }

                if(movVo.getMigMovieInfoBean().getAudits() != null && movVo.getMigMovieInfoBean().getAudits().size() > 0){
                    String auditNo = "";
                    String watchGradeNm = "";

                    for (int k = 0; k < movVo.getMigMovieInfoBean().getAudits().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getAudits().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(auditNo) && !auditNo.equals(""))auditNo += ",";
                            if(!StringUtil.isNullOrEmpty(watchGradeNm) && !watchGradeNm.equals(""))watchGradeNm += ",";
                        }

                        auditNo += (String) dataMap.get("auditNo");
                        watchGradeNm += (String) dataMap.get("watchGradeNm");

                    }
                    movVo.getMigMovieInfoBean().setAuditNo(auditNo);
                    movVo.getMigMovieInfoBean().setWatchGradeNm(watchGradeNm);

                }



                if(movVo.getMigMovieInfoBean().getGenres() != null && movVo.getMigMovieInfoBean().getGenres().size() > 0){

                    for (int k = 0; k < movVo.getMigMovieInfoBean().getGenres().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getGenres().get(k);
                        String genreNm = (String) dataMap.get("genreNm");


                        // 장르 검색
                        MigMovieGenreBean migMovieGenreBean = movManageService.selectMovieGenre(genreNm);

                        // 장르 없는 경우 장르 인서트
                        if(migMovieGenreBean == null){
                            migMovieGenreBean = new MigMovieGenreBean();
                            // 장르 코드 새로 생성
                            String genreCd = makeUUID.makeShortUUID("GR");
                            migMovieGenreBean.setGenreCd(genreCd);

                            migMovieGenreBean.setGenreNm(genreNm);
                            migMovieGenreBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());
                            movVo.setMigMovieGenreBean(migMovieGenreBean);

                            movManageService.insertMovieGenre(movVo);

                        }

                        // 영화 <=> 장르 매핑 인서트
                        migMovieGenreBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());
                        movVo.setMigMovieGenreBean(migMovieGenreBean);

                        movManageService.insertMovieGenreMap(movVo);


                    } // 장르 for

                }

                
                
                
                /** 영화인 매핑 이관코드 */

                /** 감독 매핑 인서트 */
                for (int l = 0; movVo.getMigMovieInfoBean().getDirectors() != null && l < movVo.getMigMovieInfoBean().getDirectors().size(); l++) {

                    String peopleNm = (String) ((LinkedHashMap) movVo.getMigMovieInfoBean().getDirectors().get(l)).get("peopleNm");

                    // 감독이름으로 영화인 테이블에서 peopleCd 조회
                    ArrayList<MigMoviePeopleBean> directorBeanList = movManageService.selectPeopleCdByNm(peopleNm);

                    if(directorBeanList != null && directorBeanList.size()>0){
                        for (int i = 0; i < directorBeanList.size(); i++) {

                            // 검색된 사람이 한명이면 바로 할당
                            if(directorBeanList.size() == 1) {
                                movVo.setMigMoviePeopleBean(directorBeanList.get(i));

                                break;

                                // 필모에 영화명이 있다면 할당
                            } else if (directorBeanList.get(i).getFilmoNames() != null
                                    && directorBeanList.get(i).getFilmoNames().indexOf(movVo.getMigMovieBean().getMovieNm()) > -1
                            ) {
                                movVo.setMigMoviePeopleBean(directorBeanList.get(i));

                                break;

                                // 감독이면 할당 (동명이인 감독 두명일수도)
                            }else if(directorBeanList.get(i).getRepRoleNm().equals("감독")){
                                movVo.setMigMoviePeopleBean(directorBeanList.get(i));

                                break;

                            }

                        } // for i

                        // 영화 감독 매핑 인서트
                        try {
                            if(movVo.getMigMoviePeopleBean() != null){
                            movManageService.insertMoviePeopleMap(movVo);
                                movVo.setMigMoviePeopleBean(null);
                            }

                        }catch (DuplicateKeyException e){

                        }
                    }else {
                        System.out.println("검색된 감독이 없음?");
                    }




                }


                /** 배우 매핑 인서트 */
                for (int l = 0; l < movVo.getMigMovieInfoBean().getActors().size(); l++) {

                    String peopleNm = (String) ((LinkedHashMap) movVo.getMigMovieInfoBean().getActors().get(l)).get("peopleNm");

                    // 배우 이름으로 영화인 테이블에서 peopleCd 조회
                    ArrayList<MigMoviePeopleBean> actorBeanList = movManageService.selectPeopleCdByNm(peopleNm);

                    if(actorBeanList != null && actorBeanList.size()>0){
                        for (int i = 0; i < actorBeanList.size(); i++) {

                            // 검색된 사람이 한명이면 바로 할당
                            if(actorBeanList.size() == 1) {
                                movVo.setMigMoviePeopleBean(actorBeanList.get(i));

                                break;

                                // 필모에 영화명이 있다면 할당
                            } else if (actorBeanList.get(i).getFilmoNames() != null
                                    && actorBeanList.get(i).getFilmoNames().indexOf(movVo.getMigMovieBean().getMovieNm()) > -1
                            ) {
                                movVo.setMigMoviePeopleBean(actorBeanList.get(i));

                                break;

                                // 배우면 할당 (동명이인 배우 두명일수도)
                            }else if(actorBeanList.get(i).getRepRoleNm().equals("배우")){
                                movVo.setMigMoviePeopleBean(actorBeanList.get(i));

                                break;

                            }

                        } // for i

                        // 영화 배우 매핑 인서트
                        try {
                            if(movVo.getMigMoviePeopleBean() != null){
                            movManageService.insertMoviePeopleMap(movVo);
                                movVo.setMigMoviePeopleBean(null);
                            }
                        }catch (DuplicateKeyException e){

                        }
                    }else {
                        System.out.println("검색된 배우가 없음?");
                    }




                }




                try {
                    // 영화 목록(정보1개) 디비 인서트
                     movManageService.insertMovieBean(movVo);


                    // 영화 상세정보 디비 인서트
                     movManageService.insertMovieInfoBean(movVo);

                } catch (Exception e) {
                    successResult = false;
                    e.printStackTrace();
                }
            } // for j
        } // for i

        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successResult", successResult);
        return resMap;
    }




    /** 영화 회사 api 호출 및 이관 */
    @PostMapping(value = "/callMovieCompanyApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMovieCompanyApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        MigMovVo movVo;

        MigMovieApiClientImpl movieApiClient = new MigMovieApiClientImpl();


        // 최초 토탈 갯수 조회용
        movVo = movieApiClient.callMovieCompanyApi(1);


        boolean successResult = true;

        int maxPage = movVo.getTotCnt()/10 + 1 ;
        for (int curPage = 1; curPage < maxPage+1; curPage++) {
            movVo = movieApiClient.callMovieCompanyApi(curPage);
            for (int i = 0; i < movVo.getMigMovieCompanyBeanList().size(); i++) {
                try {
                    /** bean에 세팅 */
                    movVo.setMigMovieCompanyBean(movVo.getMigMovieCompanyBeanList().get(i));

                    // 디비 인서트
                    movManageService.insertMovieCompanyBean(movVo);

                }catch (Exception e){
                    successResult = false;
                    e.printStackTrace();
                }

            }

        }


        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successResult", successResult);
        return resMap;

    }



    /** 영화 인 api 호출 및 이관 */
    @PostMapping(value = "/callMoviePeopleApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMoviePeopleApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {
        MigMovieApiClientImpl movieApiClient = new MigMovieApiClientImpl();

        /** 토탈 갯수 조회 */
        MigMovVo movVo = movieApiClient.callMoviePeopleApi(1);


        boolean successResult = true;

        int maxPage = movVo.getTotCnt()/100 + 1 ;   // 1페이지당 100 개씩
        for (int curPage = 1; curPage < maxPage+1; curPage++) {
            movVo = movieApiClient.callMoviePeopleApi(curPage);
            for (int i = 0; i < movVo.getMigMoviePeopleBeanList().size(); i++) {
                try {
                    /** bean에 세팅 */
                    movVo.setMigMoviePeopleBean(movVo.getMigMoviePeopleBeanList().get(i));

                    // 디비 인서트
                    movManageService.insertMoviePeopleBean(movVo);

                }catch (Exception e){
                    successResult = false;
                    e.printStackTrace();
                }

            }

        }



        

        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successResult", "true");
        return resMap;
    }




    /** 영화 인 상세정보 api 호출 및 이관 */
    @PostMapping(value = "/callMoviePeopleInfoApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMoviePeopleInfoApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        MigMovVo movVo = new MigMovVo();
        MigMovieApiClientImpl movieApiClient = new MigMovieApiClientImpl();
        int successCnt = 0;
        int failCnt = 0;

        // 디비서 영화인 리스트 조회
        movVo.setMigMoviePeopleBeanList(movManageService.selectMoviePeopleList(movVo));

        /** 발급받은 API 키  분담용  */
        String key1 = "7ed99cc4e7bce9910e15252a08c4ec17";
        String key2 = "61e605aeb1f2bb5b622129f67ce109e2";
        String key3 = "2de1d6d0dab3e485b0d97f0ff5b0bd25";
        String key4 = "7957ef755545f3af1d212a0ece169def";
        String key5 = "a4277be54018650843ae4f7b5b2a8984";
        String key6 = "7880a9b4189631c7ea79e950f48d1d83";
        String key7 = "836ad4f96d7c95ac85c96d2e5e8125f7";
        String key8 = "9c6dea5d953915b92a695607cb91e48b";
        String key9 = "f72356a7dcb9b78b3e1e3768bb29a04e"; // 41번으로 교체
        String key10 = "d546837bf35ea5ff3622dcbccd80bed5";
        String key11 = "fc5475472496209a244f34c434e6e5ef";
        String key12 = "382ae0a5ec52ebdc9d00af23359cab17";
        String key13 = "1dfda86b3835d0739a0af1753b88aaf6";
        String key14 = "2307d9cdbb7a1020c99298fc305de0c3";
        String key15 = "87311a5e4325e97ab7adc4368eb9d6bb";
        String key16 = "a6431d0d15bf7c6beb185e330323b9ec";
        String key17 = "618325a178c05722bcfda7c9c714e2a9";
        String key18 = "16c66be398831cd4456586a16f65d1db";
        String key19 = "fbf4d7a1c30c1e9d83eca52acb2fcc7c";
        String key20 = "c2bffe81b4aaa64ef0e9195ff4601859";

        String key21 = "dfdb3c434e765d92000e7a1f8a5d090c";
        String key22 = "fb6a32ba84bc2898394eb39a0456c9ce";
        String key23 = "34e226c990d48e542c1a909e17768a6a";
        String key24 = "c511c15fc5d2a2e7ee85a1bb8c4d01b4";
        String key25 = "cd04240c9ef4fa2f3c2783e87c60e0a6";
        String key26 = "c2823031249d6b95956fb9c076c62f5f";
        String key27 = "39dc48dd4b0ad6ba919dd5412455744d";
        String key28 = "d810720f505c6990eebe8b332a6be8b3";
        String key29 = "2fa0873be3020de865549f1a8217e0b6";
        String key30 = "9588d2d495930c6858aa368015aee7db";

        String key31 = "8d6e5c9f4782a4266e7cdceb1a491159";
        String key32 = "5e43e76335a4f58d65ea815d4caab87a";
        String key33 = "956e9acd542f26b562e4a68f002be321";
        String key34 = "98c5c8eb45661a868c7aa14704997526";
        String key35 = "16c860a56a565302815984c0cd10d53d";
        String key36 = "b3a5cc51f33c53460f1797ea265083fa";
        String key37 = "013bf97fd5c9b24666bc2f5045b91f11";
        String key38 = "f034527d83ea2275fa99390a079467aa";
        String key39 = "962dfedf753c1aee3295ca88447b4d1a";
        String key40 = "f7c15d0adbbf6abb295a3912ee9c7632";

        // 이관 갯수
        int divideCnt = 0;

        // 오류 peopleCd 리스트
        List<String> errPeopleCd = new ArrayList<>();
        // 오류 메시지
        List<String> errMsg = new ArrayList<>();


        String customKey = "";

        for (int i = 0; i < movVo.getMigMoviePeopleBeanList().size(); i++) {

            String peopleCd = movVo.getMigMoviePeopleBeanList().get(i).getPeopleCd();

            // 상세정보 테이블에 존재 확인
            int checkCnt = 0;
            checkCnt = movManageService.checkPeopleInfo(peopleCd);
            if(checkCnt> 0){
                continue;
            }


            if(divideCnt<2999){
                customKey = key1;
            }else if(divideCnt==2999){
                customKey = key2;
            }else if(divideCnt==5999){
                customKey = key3;
            }else if(divideCnt==8999){
                customKey = key4;
            }else if(divideCnt==11999){
                customKey = key5;
            }else if(divideCnt==14999){
                customKey = key6;
            }else if(divideCnt==17999){
                customKey = key7;
            }else if(divideCnt==20999){
                customKey = key8;
            }else if(divideCnt==23999){
                customKey = key9;
            }else if(divideCnt==26999){
                customKey = key10;
            }else if(divideCnt==29999){
                customKey = key11;
            }else if(divideCnt==32999){
                customKey = key12;
            }else if(divideCnt==35999){
                customKey = key13;
            }else if(divideCnt==38999){
                customKey = key14;
            }else if(divideCnt==41999){
                customKey = key15;
            }else if(divideCnt==44999){
                customKey = key16;
            }else if(divideCnt==47999){
                customKey = key17;
            }else if(divideCnt==50999){
                customKey = key18;
            }else if(divideCnt==53999){
                customKey = key19;
            }else if(divideCnt==56999){
                customKey = key20;
            }else if(divideCnt==59999){
                customKey = key21;
            }else if(divideCnt==52999){
                customKey = key22;
            }else if(divideCnt==55999){
                customKey = key23;
            }else if(divideCnt==58999){
                customKey = key24;
            }else if(divideCnt==61999){
                customKey = key25;
            }else if(divideCnt==64999){
                customKey = key26;
            }else if(divideCnt==67999){
                customKey = key27;
            }else if(divideCnt==70999){
                customKey = key28;
            }else if(divideCnt==73999){
                customKey = key29;
            }else if(divideCnt==76999){
                customKey = key30;
            }else if(divideCnt==79999){
                customKey = key31;
            }else if(divideCnt==81999){
                customKey = key32;
            }else if(divideCnt==84999){
                customKey = key33;
            }else if(divideCnt==87999){
                customKey = key34;
            }else if(divideCnt==90999){
                customKey = key35;
            }else if(divideCnt==93999){
                customKey = key36;
            }else if(divideCnt==96999){
                customKey = key37;
            }else if(divideCnt==99999){
                customKey = key38;
            }else if(divideCnt==102999){
                customKey = key39;
            }else if(divideCnt==105999){
                customKey = key40;
            }



            try {
                // 영화인 상세정보 조회 api 호출
                movVo.setMigMoviePeopleInfoBean(movieApiClient.callMoviePeopleInfoApi(peopleCd,customKey));

                // 상세정보 없는 영화 인 예외처리 (peopleCd 그대로 할당, 나머지 공백 )
                if(movVo.getMigMoviePeopleInfoBean().getPeopleCd() == null){
                    movVo.getMigMoviePeopleInfoBean().setPeopleCd(peopleCd);
                }

                // 영화인 상세정보 디비 인서트
                movManageService.insertMoviePeopleInfoBean(movVo);
                successCnt++;

            }catch (Exception e){
                failCnt++;
                errPeopleCd.add(peopleCd);
                errMsg.add(e.getMessage());
            }

            divideCnt++;


        }






        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successCnt", successCnt);
        resMap.put("failCnt", failCnt);
        return resMap;
    }




    /** 영화 제작 국가 api 호출 및 이관 */
    @PostMapping(value = "/callMovieNationsApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMovieNationsApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        MigMovVo movVo;
        MigMovieApiClientImpl movieApiClient = new MigMovieApiClientImpl();

        movVo = movieApiClient.callMovieNationApi();

        // 영화 제작 국가 인서트 반복문
        for (int i = 0; i < movVo.getMigMovieNationBeanList().size(); i++) {
            movVo.setMigMovieNationBean(movVo.getMigMovieNationBeanList().get(i));

            movManageService.insertMovieNationBean(movVo);

        }
        




        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successCnt", "successCnt");
        return resMap;

    }





    /** 디비테스트 용 */
    @PostMapping(value = "/callDBTest")
    @ResponseBody
    public Map<String, Object> callDBTest(HttpServletRequest request, HttpServletResponse response) throws Exception {


        int rtnNum = 0;
        rtnNum = movManageService.callDBTest();

        System.out.println(rtnNum);



        Map<String, Object> resMap = new HashMap<>();
        resMap.put("rtnNum", rtnNum);
        return resMap;

    }













}
