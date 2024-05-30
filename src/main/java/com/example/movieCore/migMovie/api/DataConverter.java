package com.example.movieCore.migMovie.api;

import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.movie.bean.MovieBoxOfficeBean;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class DataConverter {
    public ArrayList<MigMovieBean> convertToMovieBeanList(List<LinkedHashMap<String, Object>> linkedHashMapList) {
        ArrayList<MigMovieBean> migMovieBeanList = new ArrayList<>();

        for (LinkedHashMap<String, Object> linkedHashMap : linkedHashMapList) {
            MigMovieBean migMovieBean = convertToMovieBean(linkedHashMap);
            migMovieBeanList.add(migMovieBean);
        }

        return migMovieBeanList;
    }

    private MigMovieBean convertToMovieBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMovieBean migMovieBean = new MigMovieBean();
        migMovieBean.setMovieCd((String) linkedHashMap.get("movieCd"));
        migMovieBean.setMovieNm((String) linkedHashMap.get("movieNm"));
        migMovieBean.setMovieNmEn((String) linkedHashMap.get("movieNmEn"));
        migMovieBean.setPrdtYear((String) linkedHashMap.get("prdtYear"));
        migMovieBean.setOpenDt((String) linkedHashMap.get("openDt"));
        migMovieBean.setTypeNm((String) linkedHashMap.get("typeNm"));
        migMovieBean.setPrdtStatNm((String) linkedHashMap.get("prdtStatNm"));
        migMovieBean.setNationAlt((String) linkedHashMap.get("nationAlt"));
        migMovieBean.setGenreAlt((String) linkedHashMap.get("genreAlt"));
        migMovieBean.setRepNationNm((String) linkedHashMap.get("repNationNm"));
        migMovieBean.setRepGenreNm((String) linkedHashMap.get("repGenreNm"));

        List<String> directors = (List<String>) linkedHashMap.get("directors");

        List<LinkedHashMap<String, Object>> companys = (List<LinkedHashMap<String, Object>>) linkedHashMap.get("companys");

        migMovieBean.setDirectors(directors != null ? new ArrayList<>(directors) : new ArrayList<>());
        migMovieBean.setCompanys(companys != null ? new ArrayList<>(companys) : new ArrayList<>());

        return migMovieBean;
    }




    /** 영화 상세 정보 데이터 변환 */
    public MigMovieInfoBean extractMovieInfoBean(Map<String, Object> jsonMap) {
        MigMovieInfoBean migMovieInfoBean = new MigMovieInfoBean();

        if (jsonMap.containsKey("movieInfoResult")) {
            Object movieInfoResultObject = jsonMap.get("movieInfoResult");

            if (movieInfoResultObject instanceof LinkedHashMap<?, ?>) {
                LinkedHashMap<?, ?> movieInfoResult = (LinkedHashMap<?, ?>) movieInfoResultObject;

                if (movieInfoResult.containsKey("movieInfo")) {
                    Object movieInfoObject = movieInfoResult.get("movieInfo");

                    if (movieInfoObject instanceof LinkedHashMap<?, ?>) {
                        LinkedHashMap<?, ?> movieInfo = (LinkedHashMap<?, ?>) movieInfoObject;

                        // Now, extract values from movieInfo and set them to the MovieInfoBean
                        migMovieInfoBean.setMovieCd(getStringFromMap(movieInfo, "movieCd"));
                        migMovieInfoBean.setMovieNm(getStringFromMap(movieInfo, "movieNm"));
                        migMovieInfoBean.setMovieNmEn(getStringFromMap(movieInfo, "movieNmEn"));
                        migMovieInfoBean.setMovieNmOg(getStringFromMap(movieInfo, "movieNmOg"));
                        migMovieInfoBean.setShowTm(getStringFromMap(movieInfo, "showTm"));
                        migMovieInfoBean.setPrdtYear(getStringFromMap(movieInfo, "prdtYear"));
                        migMovieInfoBean.setOpenDt(getStringFromMap(movieInfo, "openDt"));
                        migMovieInfoBean.setPrdtStatNm(getStringFromMap(movieInfo, "prdtStatNm"));
                        migMovieInfoBean.setTypeNm(getStringFromMap(movieInfo, "typeNm"));
                        migMovieInfoBean.setNations(getListFromMap(movieInfo, "nations"));
                        migMovieInfoBean.setGenres(getListFromMap(movieInfo, "genres"));
                        migMovieInfoBean.setDirectors(getListFromMap(movieInfo, "directors"));
                        migMovieInfoBean.setActors(getListFromMap(movieInfo, "actors"));
                        migMovieInfoBean.setShowTypes(getListFromMap(movieInfo, "showTypes"));
                        migMovieInfoBean.setCompanys(getListFromMap(movieInfo, "companys"));
                        migMovieInfoBean.setAudits(getListFromMap(movieInfo, "audits"));
                        migMovieInfoBean.setStaffs(getListFromMap(movieInfo, "staffs"));
                        migMovieInfoBean.setSource(getStringFromMap(movieInfo, "source"));
                    }
                }
            }
        }

        return migMovieInfoBean;
    }

    private String getStringFromMap(LinkedHashMap<?, ?> map, String key) {
        if (map.containsKey(key)) {
            Object value = map.get(key);
            return (value != null) ? value.toString() : null;
        }
        return null;
    }


    private List<Map<String, Object>> getListFromMap(LinkedHashMap<?, ?> map, String key) {
        if (map.containsKey(key)) {
            Object value = map.get(key);
            if (value instanceof List<?>) {
                //noinspection unchecked
                return (List<Map<String, Object>>) value;
            }
        }
        return null;
    }




    /** 영화 회사 데이터 변환 */
    public ArrayList<MigMovieCompanyBean> convertToMovieCompanyBeanList(Object jsonMap) {
        ArrayList<MigMovieCompanyBean> migMovieCompanyBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("companyListResult")) {
                LinkedHashMap<String, Object> companyListResult = (LinkedHashMap<String, Object>) topLevelMap.get("companyListResult");

                if (companyListResult.containsKey("companyList")) {
                    ArrayList<LinkedHashMap<String, Object>> companyList = (ArrayList<LinkedHashMap<String, Object>>) companyListResult.get("companyList");

                    for (LinkedHashMap<String, Object> companyMap : companyList) {
                        migMovieCompanyBeanList.add(convertToMovieCompanyBean(companyMap));
                    }
                }
            }
        }

        return migMovieCompanyBeanList;
    }

    private MigMovieCompanyBean convertToMovieCompanyBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMovieCompanyBean migMovieCompanyBean = new MigMovieCompanyBean();
        migMovieCompanyBean.setCompanyCd((String) linkedHashMap.get("companyCd"));
        migMovieCompanyBean.setCompanyNm((String) linkedHashMap.get("companyNm"));
        migMovieCompanyBean.setCompanyNmEn((String) linkedHashMap.get("companyNmEn"));
        migMovieCompanyBean.setCompanyPartNames((String) linkedHashMap.get("companyPartNames"));
        migMovieCompanyBean.setCeoNm((String) linkedHashMap.get("ceoNm"));
        migMovieCompanyBean.setFilmoNames((String) linkedHashMap.get("filmoNames"));

        return migMovieCompanyBean;
    }




    /** 영화 인 데이터 형 변환 */
    public ArrayList<MigMoviePeopleBean> convertToMoviePeopleBeanList(Object jsonMap) {
        ArrayList<MigMoviePeopleBean> migMoviePeopleBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("peopleListResult")) {
                LinkedHashMap<String, Object> peopleListResult = (LinkedHashMap<String, Object>) topLevelMap.get("peopleListResult");

                if (peopleListResult.containsKey("peopleList")) {
                    ArrayList<LinkedHashMap<String, Object>> peopleList = (ArrayList<LinkedHashMap<String, Object>>) peopleListResult.get("peopleList");

                    for (LinkedHashMap<String, Object> peopleMap : peopleList) {
                        migMoviePeopleBeanList.add(convertToMoviePeopleBean(peopleMap));
                    }
                }
            }
        }

        return migMoviePeopleBeanList;
    }

    private MigMoviePeopleBean convertToMoviePeopleBean(LinkedHashMap<String, Object> people) {
        MigMoviePeopleBean migMoviePeopleBean = new MigMoviePeopleBean();
        migMoviePeopleBean.setPeopleCd((String) people.get("peopleCd"));
        migMoviePeopleBean.setPeopleNm((String) people.get("peopleNm"));
        migMoviePeopleBean.setPeopleNmEn((String) people.get("peopleNmEn"));
        migMoviePeopleBean.setRepRoleNm((String) people.get("repRoleNm"));
        migMoviePeopleBean.setFilmoNames((String) people.get("filmoNames"));

        return migMoviePeopleBean;
    }


    public ArrayList<MigMoviePeopleInfoBean> convertToMoviePeopleInfoBeanList(Object jsonMap) {
        ArrayList<MigMoviePeopleInfoBean> migMoviePeopleInfoBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("peopleInfoResult")) {
                LinkedHashMap<String, Object> peopleInfoResult = (LinkedHashMap<String, Object>) topLevelMap.get("peopleInfoResult");

                if (peopleInfoResult.containsKey("peopleInfo")) {
                    LinkedHashMap<String, Object> peopleInfo = (LinkedHashMap<String, Object>) peopleInfoResult.get("peopleInfo");

                    MigMoviePeopleInfoBean migMoviePeopleInfoBean = convertToMoviePeopleInfoBean(peopleInfo);
                    migMoviePeopleInfoBeanList.add(migMoviePeopleInfoBean);
                }
            }
        }

        return migMoviePeopleInfoBeanList;
    }

    private MigMoviePeopleInfoBean convertToMoviePeopleInfoBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMoviePeopleInfoBean migMoviePeopleInfoBean = new MigMoviePeopleInfoBean();
        migMoviePeopleInfoBean.setPeopleCd((String) linkedHashMap.get("peopleCd"));
        migMoviePeopleInfoBean.setPeopleNm((String) linkedHashMap.get("peopleNm"));
        migMoviePeopleInfoBean.setPeopleNmEn((String) linkedHashMap.get("peopleNmEn"));
        migMoviePeopleInfoBean.setSex((String) linkedHashMap.get("sex"));
        migMoviePeopleInfoBean.setRepRoleNm((String) linkedHashMap.get("repRoleNm"));


        List<LinkedHashMap<String, Object>> filmoList = (List<LinkedHashMap<String, Object>>) linkedHashMap.get("filmos");

        if (filmoList != null && !filmoList.isEmpty()) {
            List<String> movieNmList = new ArrayList<>();

            int filmoCnt = 0;

            for (LinkedHashMap<String, Object> filmoMap : filmoList) {
                // 필모 너무 길면 스톱
                if(filmoCnt > 30){
                    break;
                }
                String movieNm = (String) filmoMap.get("movieNm");

                if (movieNm != null && !movieNm.isEmpty()) {
                    movieNmList.add(movieNm);
                }
                filmoCnt++;
            }

            String filmos = String.join(", ", movieNmList);
            migMoviePeopleInfoBean.setFilmos(filmos);
        } else {
            migMoviePeopleInfoBean.setFilmos(""); // 빈 문자열로 설정 또는 null로 설정하셔도 됩니다.
        }

        return migMoviePeopleInfoBean;
    }


    public ArrayList<MigMovieNationBean> convertToMovieNationBeanList(Object jsonMap) {
        ArrayList<MigMovieNationBean> migMovieNationBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("codes")) {
                ArrayList<LinkedHashMap<String, Object>> codesList = (ArrayList<LinkedHashMap<String, Object>>) topLevelMap.get("codes");

                for (LinkedHashMap<String, Object> codeMap : codesList) {
                    migMovieNationBeanList.add(convertToMovieNationBean(codeMap));
                }
            }
        }

        return migMovieNationBeanList;
    }

    private MigMovieNationBean convertToMovieNationBean(LinkedHashMap<String, Object> linkedHashMap) {
        MigMovieNationBean migMovieNationBean = new MigMovieNationBean();
        migMovieNationBean.setNationCd((String) linkedHashMap.get("fullCd"));
        migMovieNationBean.setKorNm((String) linkedHashMap.get("korNm"));
        migMovieNationBean.setEngNm((String) linkedHashMap.get("engNm"));

        return migMovieNationBean;
    }



    public List<MigKMDBApiBean> KmdbConvert(String jsonResponse){

        // 각 MigKMDBApiBean 정보를 담을 리스트 생성
        List<MigKMDBApiBean> migKMDBApiBeans = new ArrayList<>();

        try {
            // JSON 파싱을 위한 ObjectMapper 객체 생성
            ObjectMapper objectMapper = new ObjectMapper();

            // JSON 데이터를 JsonNode로 읽어들임
            JsonNode jsonNode = objectMapper.readTree(jsonResponse);

            // "Data" 배열에 대한 노드 가져오기
            JsonNode dataArray = jsonNode.get("Data");


            // "Data" 배열을 반복하며 각 항목을 MigKMDBApiBean 객체로 매핑
            if (dataArray.isArray()) {
                for (JsonNode dataNode : dataArray) {
                    // "Result" 배열 가져오기
                    JsonNode resultArray = dataNode.get("Result");

                    // "Result" 배열이 null이 아니고, 배열의 첫 번째 요소가 존재할 경우
                    if (resultArray != null && resultArray.isArray() && resultArray.size() > 0) {
                        // 배열의 첫 번째 요소에서 필요한 속성들 추출
                        JsonNode firstResult = resultArray.get(0);
                        MigKMDBApiBean migKMDBApiBean = objectMapper.treeToValue(firstResult, MigKMDBApiBean.class);



                        // 예고편 url 가공
                        JsonNode vodsNode = firstResult.get("vods");
                        if(vodsNode != null && vodsNode.isObject()){
                            JsonNode vodNode = vodsNode.get("vod");
                            String vodUrl = vodNode.get(0).get("vodUrl").asText();
                            migKMDBApiBean.setVodUrl(vodUrl);
                        }


                        // 플롯 데이터 가공
                        JsonNode plotsNode = firstResult.get("plots");
                        if (plotsNode != null && plotsNode.isObject()) {
                            // "plot" 키의 값을 가져오기
                            JsonNode plotValue = plotsNode.get("plot");

                            if (plotValue != null) {
                                if (plotValue.isArray()) {
                                    // 배열일 경우 처리 방법
                                    for (JsonNode plotNode : plotValue) {
                                        if(plotNode.get("plotLang").asText().equals("한국어") ){
                                            JsonNode plotTextNode = plotNode.get("plotText");
                                            String plotText =  plotTextNode.asText();
                                            migKMDBApiBean.setPlot(plotText);
                                        }

                                    }
                                }
                            }
                        }


                        // 포스터들 데이터 가공
                        if(migKMDBApiBean.getPosters() != null){
                            migKMDBApiBean.setPosterList(new ArrayList<>());
                            String[] posterArray = migKMDBApiBean.getPosters().split("\\|");
                            for (String poster : posterArray) {
                                migKMDBApiBean.getPosterList().add(poster);
                            }
                            // 첫번째 포스터로 메인 포스터 할당
                            migKMDBApiBean.setPosterUrl(migKMDBApiBean.getPosterList().get(0));
                        }


                        // MigKMDBApiBean 객체 리스트에 추가
                        migKMDBApiBeans.add(migKMDBApiBean);
                    }
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


        return migKMDBApiBeans;
    }



    public ArrayList<MovieBoxOfficeBean> convertToMovieBoxOfficeBeanList(Object jsonMap, String targetDt) {
        ArrayList<MovieBoxOfficeBean> movieBoxOfficeBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("boxOfficeResult")) {
                LinkedHashMap<String, Object> boxOfficeResult = (LinkedHashMap<String, Object>) topLevelMap.get("boxOfficeResult");

                if (boxOfficeResult.containsKey("dailyBoxOfficeList")) {
                    ArrayList<LinkedHashMap<String, Object>> dailyBoxOfficeList = (ArrayList<LinkedHashMap<String, Object>>) boxOfficeResult.get("dailyBoxOfficeList");

                    for (LinkedHashMap<String, Object> dailyBoxOffice : dailyBoxOfficeList) {
                        movieBoxOfficeBeanList.add(convertToMovieBoxOfficeBean(dailyBoxOffice, targetDt));
                    }
                }
            }
        }

        return movieBoxOfficeBeanList;
    }

    private MovieBoxOfficeBean convertToMovieBoxOfficeBean(LinkedHashMap<String, Object> linkedHashMap, String targetDt) {
        MovieBoxOfficeBean movieBoxOfficeBean = new MovieBoxOfficeBean();

//        String targetDt = getYesterdayDateString();
        movieBoxOfficeBean.setShowRange(targetDt);

        movieBoxOfficeBean.setMovieCd((String) linkedHashMap.get("movieCd"));
        movieBoxOfficeBean.setMovieNm((String) linkedHashMap.get("movieNm"));
        movieBoxOfficeBean.setRank((String) linkedHashMap.get("rank"));
        movieBoxOfficeBean.setRankOldAndNew((String) linkedHashMap.get("rankOldAndNew"));
        movieBoxOfficeBean.setAudiCnt((String) linkedHashMap.get("audiCnt"));
        movieBoxOfficeBean.setAudiInten((String) linkedHashMap.get("audiInten"));
        movieBoxOfficeBean.setAudiChange((String) linkedHashMap.get("audiChange"));
        movieBoxOfficeBean.setAudiAcc((String) linkedHashMap.get("audiAcc"));

        // Parse and set openDt as LocalDate
        String openDtStr = (String) linkedHashMap.get("openDt");
        Timestamp openDt = (Timestamp) parseDateString(openDtStr);
        movieBoxOfficeBean.setOpenDt(openDt);

        return movieBoxOfficeBean;
    }


    private String getYesterdayDateString() {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
        long yesterdayTimestamp = System.currentTimeMillis() - (1000 * 60 * 60 * 24);
        return dateFormat.format(new Date(yesterdayTimestamp));
    }

    private Date parseDateString(String dateString) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            return dateFormat.parse(dateString);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }







}
