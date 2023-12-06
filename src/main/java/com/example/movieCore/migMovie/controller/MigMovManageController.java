package com.example.movieCore.migMovie.controller;

import com.example.movieCore.migMovie.api.DataConverter;
import com.example.movieCore.migMovie.api.MigMovieApiClientImpl;
import com.example.movieCore.migMovie.bean.MigMovieGenreBean;
import com.example.movieCore.migMovie.bean.MigMovieNationBean;
import com.example.movieCore.migMovie.service.MigMovManageServiceImpl;
import com.example.movieCore.migMovie.vo.MigMovVo;
import com.example.movieCore.utils.MakeUUID;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
                if (movVo.getMigMovieBean().getOpenDt() == null || movVo.getMigMovieBean().getOpenDt().isEmpty()) {
                    movVo.getMigMovieBean().setOpenDt(null);
                }


                /** 영화 상세 정보 api 호출 */
                movVo.setMigMovieInfoBean(migMovieApiClientImpl.callMovieInfoApi(movVo.getMigMovieBean().getMovieCd()));



                /** 리스트 데이터 가공 */

                // 제작 국가 (리스트) 매핑 이관
                if(movVo.getMigMovieInfoBean().getNations().size() > 0){
                    MigMovieNationBean migMovieNationBean = new MigMovieNationBean();

                    for (int k = 0; k < movVo.getMigMovieInfoBean().getNations().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getNations().get(k);

                        // 제작 국가명 추출
                        migMovieNationBean.setKorNm((String)dataMap.get("nationNm"));
                        
                        // 제작 국가 코드 조회
                        migMovieNationBean.setNationCd(movManageService.selectMovieNation(movVo));

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




                if(movVo.getMigMovieInfoBean().getShowTypes().size() > 0){
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

                if(movVo.getMigMovieInfoBean().getAudits().size() > 0){
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



                if(movVo.getMigMovieInfoBean().getGenres().size() > 0){

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

        int divideCnt = 0;

        String customKey =key1;

//        for (int i = 0; i < movVo.getMoviePeopleBeanList().size(); i++) {
        for (int i = 0; i < 60000; i++) {
            String peopleCd = movVo.getMigMoviePeopleBeanList().get(i).getPeopleCd();

            if(divideCnt>40000){
                customKey = key2;
            }



            try {
                // 영화인 상세정보 조회 api 호출
                movVo.setMigMoviePeopleInfoBean(movieApiClient.callMoviePeopleInfoApi(peopleCd,customKey));
                // 영화인 상세정보 디비 인서트
                movManageService.insertMoviePeopleInfoBean(movVo);
                successCnt++;

            }catch (Exception e){
                e.printStackTrace();
                failCnt++;

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













}
