package com.example.movieCore.movie.controller;

import com.example.movieCore.movie.api.DataConverter;
import com.example.movieCore.movie.api.MovieApiClientImpl;
import com.example.movieCore.movie.service.MovManageServiceImpl;
import com.example.movieCore.movie.vo.MovVo;
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

    @PostMapping(value = "/callMovieApiSyncDB")
    @ResponseBody
    public Map<String, Object> callMovieApiSyncDB(HttpServletRequest request, HttpServletResponse response) throws Exception {

        boolean successResult = true;

        // 테스트) 영화 200개만 세팅 (1페이지 당 10개)
        for (int i = 0; i < 21; i++) {
            MovVo movVo = movieApiClientImpl.callMovieApi(i + "");

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

                // 영화 디비에 최종 인서트
                try {
                    successResult = movManageService.insertMovieBean(movVo);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            } // for j
        } // for i

        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successResult", successResult);
        return resMap;
    }
}
