package com.example.movieCore.migMovie.api;

import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.migMovie.vo.MigMovVo;
import com.example.movieCore.movie.bean.MovieBoxOfficeBean;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Component
public class MigMovieApiClientImpl {
    /** 발급받은 API 키 */
    private String key = "7ed99cc4e7bce9910e15252a08c4ec17";
    private String key2 = "61e605aeb1f2bb5b622129f67ce109e2";

    private String key3 = "2de1d6d0dab3e485b0d97f0ff5b0bd25";
    private String key4 = "7957ef755545f3af1d212a0ece169def";
    private String key5 = "a4277be54018650843ae4f7b5b2a8984";
    private String key6 = "7880a9b4189631c7ea79e950f48d1d83";
    private String key7 = "836ad4f96d7c95ac85c96d2e5e8125f7";
    private String key8 = "9c6dea5d953915b92a695607cb91e48b";
    private String key9 = "973cd4977f769baff219c4d0867bdfba";
    private String key10 = "d546837bf35ea5ff3622dcbccd80bed5";

    private final DataConverter dataConverter = new DataConverter();


    /** 영화 목록 호출 */ //String curPage 페이지 숫자
    public MigMovVo callMovieApi(int curPage){
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

        MigMovVo movVo = new MigMovVo();

        // 토탈 갯수
        if (jsonMap.containsKey("movieListResult")) {
            LinkedHashMap<String, Object> movieListResult = (LinkedHashMap<String, Object>) jsonMap.get("movieListResult");
            if (movieListResult.containsKey("totCnt")) {
                movVo.setTotCnt((Integer) movieListResult.get("totCnt"));
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



        MigMovieInfoBean migMovieInfoBean;

        migMovieInfoBean = dataConverter.extractMovieInfoBean(jsonMap);

        return migMovieInfoBean;


    }



    /** 영화 회사 호출 */
    public MigMovVo callMovieCompanyApi(int curPage){

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




        MigMovVo movVo = new MigMovVo();

        if (jsonMap.containsKey("companyListResult")) {
            LinkedHashMap<String, Object> companyListResult = (LinkedHashMap<String, Object>) jsonMap.get("companyListResult");
            if (companyListResult.containsKey("totCnt")) {
                movVo.setTotCnt((Integer) companyListResult.get("totCnt"));
            }
        }

        ArrayList<MigMovieCompanyBean> migMovieCompanyBeanList = dataConverter.convertToMovieCompanyBeanList(jsonMap);
        movVo.setMigMovieCompanyBeanList(migMovieCompanyBeanList);



        return movVo;


    }



    /** 영화 인 호출 */
    public MigMovVo callMoviePeopleApi(int curPage){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&curPage=%s&itemPerPage=%s", apiUrl, key4, curPage+"","100" );

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





        MigMovVo movVo = new MigMovVo();

        if (jsonMap.containsKey("peopleListResult")) {
            LinkedHashMap<String, Object> peopleListResult = (LinkedHashMap<String, Object>) jsonMap.get("peopleListResult");
            if (peopleListResult.containsKey("totCnt")) {
                movVo.setTotCnt((Integer) peopleListResult.get("totCnt"));
            }
        }

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

        MigMovVo movVo = new MigMovVo();


        movVo.setMigMoviePeopleInfoBean(dataConverter.convertToMoviePeopleInfoBeanList(jsonMap).get(0));



        return movVo.getMigMoviePeopleInfoBean();


    }

    /**
     *  공통코드 - 영화 국가 api 호출
     */
    public MigMovVo callMovieNationApi(){

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

        MigMovVo movVo = new MigMovVo();

        movVo.setMigMovieNationBeanList(dataConverter.convertToMovieNationBeanList(jsonMap));



        return movVo;






    }

    /**
     *  포스터 조회 위한 KMDB api 호출
     */
    public List<MigKMDBApiBean> callKMDBApi(MigMovVo movVo){

        String ServiceKey = "G840O55BG4Z36A99PLBA";

        List<MigKMDBApiBean> migKMDBApiBeans =null;

        // API 엔드포인트 URL

        // api 호출 예시
//        "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=N&title=기생충&director=봉준호&ServiceKey=G840O55BG4Z36A99PLBA";
//        String apiUrlBasic = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_xml2.jsp?collection=kmdb_new2&detail=N&title=" + "영화제목" + "&director=" + "감독명" +  "&ServiceKey=" + "서비스키";
        String apiUrlBasic = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&detail=Y";


        try {
//             String apiUrl = apiUrlBasic + "&title=" + "기생충" + "&director=" + "봉준호" + "&ServiceKey=" + ServiceKey;

             String apiUrl = apiUrlBasic + "&title=" +movVo.getMigMovieBean().getMovieNm();
             // + "&title=" + "기생충" + "&director=" + "봉준호" + "&ServiceKey=" + ServiceKey;
             // String apiUrl = apiUrlBasic + "&title=" + "기생충" +"&ServiceKey=" + ServiceKey;

            // 감독 검색 조건 추가
            if(movVo.getMigMovieBean().getPeopleNm() != null && !movVo.getMigMovieBean().getPeopleNm().equals("")){
                apiUrl += "&director="+ movVo.getMigMovieBean().getPeopleNm();
            }
            
            // 서비스키 추가
            apiUrl += "&ServiceKey=" + ServiceKey;

            // RestTemplate 객체 생성
            RestTemplate restTemplate = new RestTemplate();

            // API 호출 및 응답 받기
            String jsonResponse = restTemplate.getForObject(apiUrl, String.class);

            migKMDBApiBeans = dataConverter.KmdbConvert(jsonResponse);


        } catch (Exception e) {
            e.printStackTrace();
        }


        return migKMDBApiBeans;

    }




    /**
     *  박스 오피스 api 호출
     */
    public MigMovVo callMovieBoxOfficeApi(){

        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // 어제 날짜 yyyyMMdd 형식
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        LocalDate yesterday = currentDate.minusDays(1);
        String targetDt = yesterday.format(formatter);


        // API 호출 URL 및 파라미터 조합
        String fullUrl = String.format("%s?key=%s&targetDt=%s", apiUrl, key2, targetDt);

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

        MigMovVo movVo = new MigMovVo();


        ArrayList<MovieBoxOfficeBean> boxOfficeBeanList = new ArrayList<>();
        boxOfficeBeanList = dataConverter.convertToMovieBoxOfficeBeanList(jsonMap);
        movVo.setBoxOfficeBeanList(boxOfficeBeanList);


        return movVo;






    }





    /** 영화 한개 호출 */
    public MigMovVo callOneMovieApi(MovieBoxOfficeBean boxOfficeBean){
        // API 엔드포인트 URL
        String apiUrl = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json";


        // WebClient 인스턴스 생성
        WebClient webClient = WebClient.create();

        // 개봉년도 파싱
        LocalDate localDate = boxOfficeBean.getOpenDt().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
        // 년도를 추출하여 문자열로 반환합니다.
        String openDt = String.valueOf(localDate.getYear());


        // API 호출 URL 및 파라미터 조합   ( 영화 제목 , 개봉일 기준으로 호출 )
        String fullUrl = String.format("%s?key=%s&movieNm=%s&openStartDt=%s&openEndDt=%s", apiUrl, key,boxOfficeBean.getMovieNm(),openDt,openDt);

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

        MigMovVo movVo = new MigMovVo();

        // 토탈 갯수
        if (jsonMap.containsKey("movieListResult")) {
            LinkedHashMap<String, Object> movieListResult = (LinkedHashMap<String, Object>) jsonMap.get("movieListResult");
            if (movieListResult.containsKey("totCnt")) {
                movVo.setTotCnt((Integer) movieListResult.get("totCnt"));
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







}