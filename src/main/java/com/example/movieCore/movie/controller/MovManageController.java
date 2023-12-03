package com.example.movieCore.movie.controller;

import com.example.movieCore.movie.api.DataConverter;
import com.example.movieCore.movie.api.MovieApiClientImpl;
import com.example.movieCore.movie.bean.MovieGenreBean;
import com.example.movieCore.movie.bean.MovieNationBean;
import com.example.movieCore.movie.service.MovManageServiceImpl;
import com.example.movieCore.movie.vo.MovVo;
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
public class MovManageController {

    private final MovManageServiceImpl movManageService;
    private final MovieApiClientImpl movieApiClientImpl;

    private final MakeUUID makeUUID = new MakeUUID();

    /** 영화 목록, 영화 상세정보 api 호출 및 이관 */
    @PostMapping(value = "/callMovieApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMovieApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        boolean successResult = true;

        MovVo movVo = movieApiClientImpl.callMovieApi(1);

        int maxPage = movVo.getTotCnt()/100 + 1;

        for (int curPage = 1; curPage < maxPage+1; curPage++) {
            // 영화 목록 api 호출 (1페이지당 100개)
            movVo = movieApiClientImpl.callMovieApi(curPage);

            // LinkedHashMap 데이터 BeanList 구조로 변환
            movVo.setMovieBeanList(DataConverter.convertToMovieBeanList((List) movVo.getMovieBeanList()));

            // 영화 100개 인서트
            for (int j = 0; j < movVo.getMovieBeanList().size(); j++) {
                // 영화 한 개 정보 세팅
                movVo.setMovieBean(movVo.getMovieBeanList().get(j));



                // 제작사 코드들 추출 및 매핑 테이블 인서트
                if(movVo.getMovieBean().getCompanys() != null && movVo.getMovieBean().getCompanys().size() >0){

                    for (int i = 0; i < movVo.getMovieBean().getCompanys().size(); i++) {

                        // 영화에서 회사 코드 추출
                        LinkedHashMap<String, Object> companyMap = movVo.getMovieBean().getCompanys().get(i);
                        String companyCd = (String) companyMap.get("companyCd");
                        movVo.getMovieBean().setCompanyCd(companyCd);

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
                if (movVo.getMovieBean().getOpenDt() == null || movVo.getMovieBean().getOpenDt().isEmpty()) {
                    movVo.getMovieBean().setOpenDt(null);
                }


                /** 영화 상세 정보 api 호출 */
                movVo.setMovieInfoBean(movieApiClientImpl.callMovieInfoApi(movVo.getMovieBean().getMovieCd()));



                /** 리스트 데이터 가공 */

                // 제작 국가 (리스트) 매핑 이관
                if(movVo.getMovieInfoBean().getNations().size() > 0){
                    MovieNationBean movieNationBean = new MovieNationBean();

                    for (int k = 0; k < movVo.getMovieInfoBean().getNations().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getNations().get(k);

                        // 제작 국가명 추출
                        movieNationBean.setKorNm((String)dataMap.get("nationNm"));
                        
                        // 제작 국가 코드 조회
                        movieNationBean.setNationCd(movManageService.selectMovieNation(movVo));

                        if(!StringUtil.isNullOrEmpty(movieNationBean.getNationCd())){
                            movieNationBean.setMovieCd(movVo.getMovieBean().getMovieCd());
                            movVo.setMovieNationBean(movieNationBean);

                            // 영화 <=> 제작국가 매핑 인서트
                            movManageService.insertMovieNationMap(movVo);
                        }



                    }
                }




                if(movVo.getMovieInfoBean().getShowTypes().size() > 0){
                    String showTypeGroupNm = "";
                    String showTypeNm = "";

                    for (int k = 0; k < movVo.getMovieInfoBean().getShowTypes().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getShowTypes().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(showTypeGroupNm) && !showTypeGroupNm.equals(""))showTypeGroupNm += ",";
                            if(!StringUtil.isNullOrEmpty(showTypeNm) && !showTypeNm.equals(""))showTypeNm += ",";
                        }

                        showTypeGroupNm += (String) dataMap.get("showTypeGroupNm");
                        showTypeNm += (String) dataMap.get("showTypeNm");

                    }
                    movVo.getMovieInfoBean().setShowTypeGroupNm(showTypeGroupNm);
                    movVo.getMovieInfoBean().setShowTypeNm(showTypeNm);

                }

                if(movVo.getMovieInfoBean().getAudits().size() > 0){
                    String auditNo = "";
                    String watchGradeNm = "";

                    for (int k = 0; k < movVo.getMovieInfoBean().getAudits().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getAudits().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(auditNo) && !auditNo.equals(""))auditNo += ",";
                            if(!StringUtil.isNullOrEmpty(watchGradeNm) && !watchGradeNm.equals(""))watchGradeNm += ",";
                        }

                        auditNo += (String) dataMap.get("auditNo");
                        watchGradeNm += (String) dataMap.get("watchGradeNm");

                    }
                    movVo.getMovieInfoBean().setAuditNo(auditNo);
                    movVo.getMovieInfoBean().setWatchGradeNm(watchGradeNm);

                }



                if(movVo.getMovieInfoBean().getGenres().size() > 0){

                    for (int k = 0; k < movVo.getMovieInfoBean().getGenres().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getGenres().get(k);
                        String genreNm = (String) dataMap.get("genreNm");


                        // 장르 검색
                        MovieGenreBean movieGenreBean = movManageService.selectMovieGenre(genreNm);

                        // 장르 없는 경우 장르 인서트
                        if(movieGenreBean == null){
                            movieGenreBean = new MovieGenreBean();
                            // 장르 코드 새로 생성
                            String genreCd = makeUUID.makeShortUUID("GR");
                            movieGenreBean.setGenreCd(genreCd);

                            movieGenreBean.setGenreNm(genreNm);
                            movieGenreBean.setMovieCd(movVo.getMovieBean().getMovieCd());
                            movVo.setMovieGenreBean(movieGenreBean);

                            movManageService.insertMovieGenre(movVo);

                        }

                        // 영화 <=> 장르 매핑 인서트
                        movieGenreBean.setMovieCd(movVo.getMovieBean().getMovieCd());
                        movVo.setMovieGenreBean(movieGenreBean);

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

        MovVo movVo;

        MovieApiClientImpl movieApiClient = new MovieApiClientImpl();


        // 최초 토탈 갯수 조회용
        movVo = movieApiClient.callMovieCompanyApi(1);


        boolean successResult = true;

        int maxPage = movVo.getTotCnt()/10 + 1 ;
        for (int curPage = 1; curPage < maxPage+1; curPage++) {
            movVo = movieApiClient.callMovieCompanyApi(curPage);
            for (int i = 0; i < movVo.getMovieCompanyBeanList().size(); i++) {
                try {
                    /** bean에 세팅 */
                    movVo.setMovieCompanyBean(movVo.getMovieCompanyBeanList().get(i));

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
        MovieApiClientImpl movieApiClient = new MovieApiClientImpl();

        /** 토탈 갯수 조회 */
        MovVo movVo = movieApiClient.callMoviePeopleApi(1);


        boolean successResult = true;

        int maxPage = movVo.getTotCnt()/100 + 1 ;   // 1페이지당 100 개씩
        for (int curPage = 1; curPage < maxPage+1; curPage++) {
            movVo = movieApiClient.callMoviePeopleApi(curPage);
            for (int i = 0; i < movVo.getMoviePeopleBeanList().size(); i++) {
                try {
                    /** bean에 세팅 */
                    movVo.setMoviePeopleBean(movVo.getMoviePeopleBeanList().get(i));

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

        MovVo movVo = new MovVo();
        MovieApiClientImpl movieApiClient = new MovieApiClientImpl();
        int successCnt = 0;
        int failCnt = 0;

        // 디비서 영화인 리스트 조회
        movVo.setMoviePeopleBeanList(movManageService.selectMoviePeopleList(movVo));


        for (int i = 0; i < movVo.getMoviePeopleBeanList().size(); i++) {
            String peopleCd = movVo.getMoviePeopleBeanList().get(i).getPeopleCd();
            // 영화인 상세정보 조회 api 호출
            movVo.setMoviePeopleInfoBean(movieApiClient.callMoviePeopleInfoApi(peopleCd));

            try {
                // 영화인 상세정보 디비 인서트
                movManageService.insertMoviePeopleInfoBean(movVo);
                successCnt++;

            }catch (Exception e){
                failCnt++;

            }


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

        MovVo movVo;
        MovieApiClientImpl movieApiClient = new MovieApiClientImpl();

        movVo = movieApiClient.callMovieNationApi();

        // 영화 제작 국가 인서트 반복문
        for (int i = 0; i < movVo.getMovieNationBeanList().size(); i++) {
            movVo.setMovieNationBean(movVo.getMovieNationBeanList().get(i));

            movManageService.insertMovieNationBean(movVo);

        }
        




        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successCnt", "successCnt");
        return resMap;

    }













}
