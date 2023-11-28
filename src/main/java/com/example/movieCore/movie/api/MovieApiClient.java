package com.example.movieCore.movie.api;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.bean.MovieInfoBean;
import com.example.movieCore.movie.vo.MovVo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.*;


@Component
public class MovieApiClient {
    /** 발급받은 API 키 */
    private String key = "7ed99cc4e7bce9910e15252a08c4ec17";


    /** 영화 목록 호출 */
    public MovVo callMovieApi(String curPage){  //String curPage 페이지 숫자

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        /** API 호출에 필요한 파라미터 설정*/

        // 페이지 숫자 (1페이지당 10개씩)
//        String curPage = "1";


        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&curPage=%s", apiUrl, key, curPage);

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

        // movieListResult 에서 movieList 추출
        LinkedHashMap<String, Object> movieListResult = (LinkedHashMap<String, Object>) jsonMap.get("movieListResult");

        // movieList 를 BeanList로 받기
        ArrayList<MovieBean> movieBeanList = (ArrayList<MovieBean>) movieListResult.get("movieList");

        // vo에 세팅
        MovVo movVo = new MovVo();
        movVo.setMovieBeanList(movieBeanList);

        return movVo;


    }



    /** 영화 상세정보 호출 */
    public MovieInfoBean callMovieInfoApi(String movieCd){  // 영화 코드

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
        MovieInfoBean movieInfoBean;

        movieInfoBean = dataConverter.extractMovieInfoBean(jsonMap);

        return movieInfoBean;


    }


    /** 영화 회사 호출 */
    public MovVo callMovieCompanyApi(){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/company/searchCompanyList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s", apiUrl, key);

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


//        DataConverter dataConverter = new DataConverter();
//        MovieInfoBean movieInfoBean;
//
//        movieInfoBean = dataConverter.extractMovieInfoBean(jsonMap);

        MovVo movVo = new MovVo();

        return movVo;


    }






}