package com.example.movieCore.movie.controller;

import com.example.movieCore.movie.api.DataConverter;
import com.example.movieCore.movie.api.MovieApiClientImpl;
import com.example.movieCore.movie.service.MovManageServiceImpl;
import com.example.movieCore.movie.vo.MovVo;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class MovManageController {

    private final MovManageServiceImpl movManageService;
    private final MovieApiClientImpl movieApiClientImpl;

    /** 영화 목록, 영화 상세정보 api 호출 및 이관 */
    @PostMapping(value = "/callMovieApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMovieApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        boolean successResult = true;
        // 테스트) 영화 200개만 세팅 (1페이지 당 10개)

        MovVo movVo = movieApiClientImpl.callMovieApi(1);

        int maxPage = movVo.getTotCnt()/100 + 1;

        for (int curPage = 1; curPage < maxPage+1; curPage++) {
            // 영화 목록 api 호출 (10개)
            movVo = movieApiClientImpl.callMovieApi(curPage);

            // LinkedHashMap 데이터 BeanList 구조로 변환
            movVo.setMovieBeanList(DataConverter.convertToMovieBeanList((List) movVo.getMovieBeanList()));

            // 영화 100개 인서트
            for (int j = 0; j < movVo.getMovieBeanList().size(); j++) {
                // 영화 한 개 정보 세팅
                movVo.setMovieBean(movVo.getMovieBeanList().get(j));



                // 제작사 코드 추출 (매핑 테이블 인서트 용)
                if(movVo.getMovieBean().getCompanys() != null && movVo.getMovieBean().getCompanys().size() >0){
                    String companyCd = movVo.getMovieBean().getCompanys().get(0);
                    movVo.getMovieBean().setCompanyCd(companyCd);
                }



                // 개봉일 없을시 예외 처리
                if (movVo.getMovieBean().getOpenDt() == null || movVo.getMovieBean().getOpenDt().isEmpty()) {
                    movVo.getMovieBean().setOpenDt(null);
                }


                /** 영화 상세 정보 api 호출 */
                movVo.setMovieInfoBean(movieApiClientImpl.callMovieInfoApi(movVo.getMovieBean().getMovieCd()));


                // 개봉일 없을시 예외 처리
                if (movVo.getMovieInfoBean().getOpenDt() == null || movVo.getMovieInfoBean().getOpenDt().isEmpty()) {
                    movVo.getMovieInfoBean().setOpenDt(null);
                }


                /** 리스트 데이터 가공 */

                if(movVo.getMovieInfoBean().getNations().size() > 0){
                    String nationNm = "";

                    for (int k = 0; k < movVo.getMovieInfoBean().getNations().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getNations().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(nationNm) && !nationNm.equals(""))nationNm += ",";
                        }

                        nationNm += (String) dataMap.get("nationNm");

                    }
                    movVo.getMovieInfoBean().setNationNm(nationNm);
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
                    String genreNm  = "";

                    for (int k = 0; k < movVo.getMovieInfoBean().getGenres().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getGenres().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(genreNm) && !genreNm.equals(""))genreNm += ",";
                        }

                        genreNm += (String) dataMap.get("genreNm");

                    }
                    movVo.getMovieInfoBean().setGenreNm(genreNm);

                }



                try {
                    // 영화 목록(정보1개) 디비 인서트
                     movManageService.insertMovieBean(movVo);

                    // 영화 목록, 회사 매핑 정보 디비 인서트
                     movManageService.insertMovieCompanyMap(movVo);

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
            movVo = movieApiClient.callMoviePeopleInfoApi(peopleCd);

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



















}
