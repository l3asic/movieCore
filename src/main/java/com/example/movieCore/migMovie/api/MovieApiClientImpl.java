package com.example.movieCore.migMovie.api;

import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.migMovie.vo.MovVo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.*;


@Component
public class MovieApiClientImpl{
    /** 발급받은 API 키 */
    private String key = "7ed99cc4e7bce9910e15252a08c4ec17";
    private String key2 = "61e605aeb1f2bb5b622129f67ce109e2";


    /** 영화 목록 호출 */ //String curPage 페이지 숫자
    public MovVo callMovieApi(int curPage){
        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();


        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&curPage=%s&itemPerPage=%s", apiUrl, key, curPage+"","100");   // 1페이지당 100개씩

        // API 호출 및 응답 받기
        String responseBody = webClient.get()
                .uri(fullUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // JSON 데이터를 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();
        try {
            jsonMap = objectMapper.readValue(responseBody, new TypeReference<>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }

        MovVo movVo = new MovVo();

        // 토탈 갯수
        if (jsonMap.containsKey("peopleListResult")) {
            LinkedHashMap<String, Object> peopleListResult = (LinkedHashMap<String, Object>) jsonMap.get("movieListResult");
            if (peopleListResult.containsKey("totCnt")) {
                movVo.setTotCnt((Integer) peopleListResult.get("totCnt"));
            }
        }

        // movieListResult 에서 movieList 추출
        LinkedHashMap<String, Object> movieListResult = (LinkedHashMap<String, Object>) jsonMap.get("movieListResult");

        // movieList 를 BeanList로 받기
        ArrayList<MigMovieBean> migMovieBeanList = (ArrayList<MigMovieBean>) movieListResult.get("movieList");

        // vo에 세팅
        movVo.setMigMovieBeanList(migMovieBeanList);

        return movVo;


    }



    /** 영화 상세정보 호출 */   // 영화 코드
    public MigMovieInfoBean callMovieInfoApi(String movieCd){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&movieCd=%s", apiUrl, key, movieCd);

        // API 호출 및 응답 받기
        String responseBody = webClient.get()
                .uri(fullUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // JSON 데이터를 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();
        try {
            jsonMap = objectMapper.readValue(responseBody, new TypeReference<>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }



        DataConverter dataConverter = new DataConverter();
        MigMovieInfoBean migMovieInfoBean;

        migMovieInfoBean = dataConverter.extractMovieInfoBean(jsonMap);

        return migMovieInfoBean;


    }



    /** 영화 회사 호출 */
    public MovVo callMovieCompanyApi(int curPage){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/company/searchCompanyList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&curPage=%s", apiUrl, key, curPage+"" );

        // API 호출 및 응답 받기
        String responseBody = webClient.get()
                .uri(fullUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // JSON 데이터를 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();
        try {
            jsonMap = objectMapper.readValue(responseBody, new TypeReference<>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }




        MovVo movVo = new MovVo();

        if (jsonMap.containsKey("companyListResult")) {
            LinkedHashMap<String, Object> companyListResult = (LinkedHashMap<String, Object>) jsonMap.get("companyListResult");
            if (companyListResult.containsKey("totCnt")) {
                movVo.setTotCnt((Integer) companyListResult.get("totCnt"));
            }
        }

        DataConverter dataConverter = new DataConverter();
        ArrayList<MigMovieCompanyBean> migMovieCompanyBeanList = dataConverter.convertToMovieCompanyBeanList(jsonMap);
        movVo.setMigMovieCompanyBeanList(migMovieCompanyBeanList);



        return movVo;


    }



    /** 영화 인 호출 */
    public MovVo callMoviePeopleApi(int curPage){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&curPage=%s&itemPerPage=%s", apiUrl, key2, curPage+"","100" );

        // API 호출 및 응답 받기
        String responseBody = webClient.get()
                .uri(fullUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // JSON 데이터를 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();
        try {
            jsonMap = objectMapper.readValue(responseBody, new TypeReference<>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }





        MovVo movVo = new MovVo();

        if (jsonMap.containsKey("peopleListResult")) {
            LinkedHashMap<String, Object> peopleListResult = (LinkedHashMap<String, Object>) jsonMap.get("peopleListResult");
            if (peopleListResult.containsKey("totCnt")) {
                movVo.setTotCnt((Integer) peopleListResult.get("totCnt"));
            }
        }

        DataConverter dataConverter = new DataConverter();
        ArrayList<MigMoviePeopleBean> migMoviePeopleBeanList = dataConverter.convertToMoviePeopleBeanList(jsonMap);
        movVo.setMigMoviePeopleBeanList(migMoviePeopleBeanList);



        return movVo;


    }


    /**
     * 영화 인 상세정보 호출
     */
    public MigMoviePeopleInfoBean callMoviePeopleInfoApi(String peopleCd, String customKey){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&peopleCd=%s", apiUrl, customKey, peopleCd);

        // API 호출 및 응답 받기
        String responseBody = webClient.get()
                .uri(fullUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // JSON 데이터를 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();
        try {
            jsonMap = objectMapper.readValue(responseBody, new TypeReference<>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }

        MovVo movVo = new MovVo();


        DataConverter dataConverter = new DataConverter();

        movVo.setMigMoviePeopleInfoBean(dataConverter.convertToMoviePeopleInfoBeanList(jsonMap).get(0));



        return movVo.getMigMoviePeopleInfoBean();


    }

    /**
     *  공통코드 - 영화 국가 api 호출
     */
    public MovVo callMovieNationApi(){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/code/searchCodeList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&comCode=2204", apiUrl, key2);

        // API 호출 및 응답 받기
        String responseBody = webClient.get()
                .uri(fullUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // JSON 데이터를 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();
        try {
            jsonMap = objectMapper.readValue(responseBody, new TypeReference<>() {
            });
        } catch (IOException e) {
            e.printStackTrace();
        }

        DataConverter dataConverter = new DataConverter();

        MovVo movVo = new MovVo();

        movVo.setMigMovieNationBeanList(dataConverter.convertToMovieNationBeanList(jsonMap));



        return movVo;






    }






}