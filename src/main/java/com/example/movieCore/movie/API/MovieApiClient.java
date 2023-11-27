package com.example.movieCore.movie.API;

import com.example.movieCore.movie.Bean.MovieBean;
import com.example.movieCore.movie.Vo.MovieVo;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.util.*;


public class MovieApiClient {

    public MovieVo callMovieApi(){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json";

        // 발급받은 API 키
        String key = "7ed99cc4e7bce9910e15252a08c4ec17";

        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        /** API 호출에 필요한 파라미터 설정*/

        // 페이지 숫자 (1페이지당 10개씩)
        String curPage = "1";
//        String param2 = "값2";


        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&curPage=%s", apiUrl, key, curPage);

        // API 호출 및 응답 받기
        String responseBody = webClient.get()
                .uri(fullUrl)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 응답 확인
        System.out.println(responseBody);


        // JSON 데이터를 객체로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> jsonMap = new HashMap<>();
        try {
            // 여기서는 예시로 String을 Map으로 변환하였습니다.
            // 실제로는 받아온 JSON 데이터에 맞게 적절한 클래스를 정의하고 사용하세요.
            jsonMap = objectMapper.readValue(responseBody, new TypeReference<>() {
            });
            System.out.println(jsonMap);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // movieListResult 에서 movieList 추출
        LinkedHashMap<String, Object> movieListResult = (LinkedHashMap<String, Object>) jsonMap.get("movieListResult");

        // movieList 를 BeanList로 받기
        ArrayList<MovieBean> movieBeanList = (ArrayList<MovieBean>) movieListResult.get("movieList");

        // vo에 세팅
        MovieVo movieVo = new MovieVo();
        movieVo.setMovieBeanList(movieBeanList);

        return movieVo;


    }






}