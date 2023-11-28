package com.example.movieCore.movie.controller;

import com.example.movieCore.movie.api.DataConverter;
import com.example.movieCore.movie.api.MovieApiClient;
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
    private final MovieApiClient movieApiClient;

    @PostMapping(value = "/callMovieApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMovieApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        boolean successResult = true;

        // 테스트) 영화 200개만 세팅 (1페이지 당 10개)
        for (int i = 0; i < 21; i++) {
            // 영화 목록 api 호출 (10개)
            MovVo movVo = movieApiClient.callMovieApi(i + "");

            // LinkedHashMap 데이터 BeanList 구조로 변환
            movVo.setMovieBeanList(DataConverter.convertToMovieBeanList((List) movVo.getMovieBeanList()));

            // 영화 10개 반복
            for (int j = 0; j < movVo.getMovieBeanList().size(); j++) {
                // 영화 한 개 정보 세팅
                movVo.setMovieBean(movVo.getMovieBeanList().get(j));

                // 감독 명 데이터 가공
                if (movVo.getMovieBean().getDirectors() != null && !movVo.getMovieBean().getDirectors().isEmpty()) {
                    Object directorsObject = movVo.getMovieBean().getDirectors();

                    // 확인된 형변환 가능한 경우 처리
                    if (directorsObject instanceof List<?>) {
                        List<?> directorsList = (List<?>) directorsObject;

                        // 리스트가 비어 있지 않은 경우
                        if (!directorsList.isEmpty()) {
                            // 여러 감독이 있는 경우, 모든 감독명을 구분자 ","로 연결하여 할당
                            StringBuilder peopleNmBuilder = new StringBuilder();

                            for (Object singleDirectorObject : directorsList) {
                                if (singleDirectorObject instanceof LinkedHashMap<?, ?>) {
                                    LinkedHashMap<?, ?> director = (LinkedHashMap<?, ?>) singleDirectorObject;
                                    Object peopleNmObject = director.get("peopleNm");

                                    // 감독명이 있는 경우
                                    if (peopleNmObject != null) {
                                        String peopleNm = peopleNmObject.toString();
                                        if (peopleNmBuilder.length() > 0) {
                                            peopleNmBuilder.append(","); // 구분자 추가
                                        }
                                        peopleNmBuilder.append(peopleNm);
                                    } else {
                                        System.out.println("peopleNm 키가 존재하지 않습니다.");
                                    }
                                }
                            }

                            // 최종 결과를 MovieBean에 할당
                            movVo.getMovieBean().setPeopleNm(peopleNmBuilder.toString());
                        }
                    } else {
                        // 형변환이 불가능한 경우 예외 처리
                        System.out.println("감독 명 형변환 오류");
                    }
                }


                // 제작사 코드/명 데이터 가공
                if (movVo.getMovieBean().getCompanys() != null && !movVo.getMovieBean().getCompanys().isEmpty()) {
                    Object companysObject = movVo.getMovieBean().getCompanys();

                    // 확인된 형변환 가능한 경우 처리
                    if (companysObject instanceof List<?>) {
                        List<?> companysList = (List<?>) companysObject;

                        // 리스트가 비어 있지 않은 경우
                        if (!companysList.isEmpty()) {

                            // 여러 제작사가 있는 경우, 모든 제작사 코드와 제작사 명을 구분자 ","로 연결하여 할당
                            StringBuilder companyCdBuilder = new StringBuilder();
                            StringBuilder companyNmBuilder = new StringBuilder();

                            for (Object singleCompanysObject : companysList) {
                                if (singleCompanysObject instanceof LinkedHashMap<?, ?>) {
                                    LinkedHashMap<?, ?> companys = (LinkedHashMap<?, ?>) singleCompanysObject;

                                    // 제작사 코드 할당
                                    if (companys.containsKey("companyCd")) {
                                        Object valueObject = companys.get("companyCd");
                                        String value = (valueObject != null) ? valueObject.toString() : null;
                                        if (value != null) {
                                            if (companyCdBuilder.length() > 0) {
                                                companyCdBuilder.append(","); // 구분자 추가
                                            }
                                            companyCdBuilder.append(value);
                                        }
                                    }

                                    // 제작사 명 할당
                                    if (companys.containsKey("companyNm")) {
                                        Object valueObject = companys.get("companyNm");
                                        String value = (valueObject != null) ? valueObject.toString() : null;
                                        if (value != null) {
                                            if (companyNmBuilder.length() > 0) {
                                                companyNmBuilder.append(","); // 구분자 추가
                                            }
                                            companyNmBuilder.append(value);
                                        }
                                    }
                                }
                            }

                            // 최종 결과를 MovieBean에 할당
                            movVo.getMovieBean().setCompanyCd(companyCdBuilder.toString());
                            movVo.getMovieBean().setCompanyNm(companyNmBuilder.toString());
                        }
                    } else {
                        // 형변환이 불가능한 경우 예외 처리
                        System.out.println("제작사 코드/명 형변환 오류");
                    }
                }

                // 개봉일 없을시 예외 처리
                if (movVo.getMovieBean().getOpenDt() == null || movVo.getMovieBean().getOpenDt().isEmpty()) {
                    movVo.getMovieBean().setOpenDt(null);
                }


                /** 영화 상세 정보 api 호출 */
                movVo.setMovieInfoBean(movieApiClient.callMovieInfoApi(movVo.getMovieBean().getMovieCd()));


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

                if(movVo.getMovieInfoBean().getDirectors().size() > 0){
                    String directorNm = "";
                    String directorNmEn = "";

                    for (int k = 0; k < movVo.getMovieInfoBean().getDirectors().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getDirectors().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(directorNm) && !directorNm.equals(""))directorNm += ",";
                            if(!StringUtil.isNullOrEmpty(directorNmEn) && !directorNmEn.equals(""))directorNmEn += ",";
                        }

                        directorNm += (String) dataMap.get("peopleNm");
                        directorNmEn += (String) dataMap.get("peopleNmEn");

                    }
                    movVo.getMovieInfoBean().setDirectorNm(directorNm);
                    movVo.getMovieInfoBean().setDirectorNmEn(directorNmEn);


                }

                if(movVo.getMovieInfoBean().getActors().size() > 0){
                    String actorsNm  = "";
                    String actorsNmEn = "";

                    for (int k = 0; k < movVo.getMovieInfoBean().getDirectors().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getDirectors().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(actorsNm) && !actorsNm.equals(""))actorsNm += ",";
                            if(!StringUtil.isNullOrEmpty(actorsNmEn) && !actorsNmEn.equals(""))actorsNmEn += ",";
                        }

                        actorsNm += (String) dataMap.get("peopleNm");
                        actorsNmEn += (String) dataMap.get("peopleNmEn");

                    }
                    movVo.getMovieInfoBean().setActorsNm(actorsNm);
                    movVo.getMovieInfoBean().setActorsNmEn(actorsNmEn);

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

                if(movVo.getMovieInfoBean().getCompanys().size() > 0){
                    String companyCd = "";
                    String companyNm = "";
                    String companyNmEn = "";

                    for (int k = 0; k < movVo.getMovieInfoBean().getCompanys().size(); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getCompanys().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(companyCd) && !companyCd.equals(""))companyCd += ",";
                            if(!StringUtil.isNullOrEmpty(companyNm) && !companyNm.equals(""))companyNm += ",";
                            if(!StringUtil.isNullOrEmpty(companyNmEn) && !companyNmEn.equals(""))companyNmEn += ",";
                        }

                        companyCd += (String) dataMap.get("companyCd");
                        companyNm += (String) dataMap.get("companyNm");
                        companyNmEn += (String) dataMap.get("companyNmEn");

                    }
                    movVo.getMovieInfoBean().setCompanyCd(companyCd);
                    movVo.getMovieInfoBean().setCompanyNm(companyNm);
                    movVo.getMovieInfoBean().setCompanyNmEn(companyNmEn);

                }

                if(movVo.getMovieInfoBean().getStaffs().size() > 0){
                    String staffNm  = "";
                    String staffNmEn = "";
                    String staffRoleNm = "";

                    for (int k = 0; (k < movVo.getMovieInfoBean().getStaffs().size()); k++) {
                        LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMovieInfoBean().getStaffs().get(k);
                        if(k>0){
                            if(!StringUtil.isNullOrEmpty(staffNm) && !staffNm.equals(""))staffNm += ",";
                            if(!StringUtil.isNullOrEmpty(staffNmEn) && !staffNmEn.equals(""))staffNmEn += ",";
                            if(!StringUtil.isNullOrEmpty(staffRoleNm) && !staffRoleNm.equals(""))staffRoleNm += ",";
                        }

                        staffNm += (String) dataMap.get("peopleNm");
                        staffNmEn += (String) dataMap.get("peopleNmEn");
                        staffRoleNm += (String) dataMap.get("staffRoleNm");

                        // 스탭많으면 50명까지만 컽
                        if(k>50){
                            break;
                        }

                    }
                    movVo.getMovieInfoBean().setStaffsNm(staffNm);
                    movVo.getMovieInfoBean().setStaffsNmEn(staffNmEn);
                    movVo.getMovieInfoBean().setStaffsRoleNm(staffRoleNm);

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


                System.out.println("확인용");




                try {
                    // 영화 목록(정보1개) 디비 인서트
                     //movManageService.insertMovieBean(movVo);

                    // 영화 상세정보 디비 인서트
                     //movManageService.insertMovieInfoBean(movVo);

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





    /** 영화 회사 api 호출 컨트롤러 */
    @PostMapping(value = "/callMovieCompanyApiSyncDB")
    @ResponseBody
    public void callMovieCompanyApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        MovVo movVo = new MovVo();

        movVo = movieApiClient.callMovieCompanyApi();

        System.out.println("완료?");

    }



}
