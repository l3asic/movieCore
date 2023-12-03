package com.example.movieCore.movie.api;

import com.example.movieCore.movie.bean.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class DataConverter {
    public static ArrayList<MovieBean> convertToMovieBeanList(List<LinkedHashMap<String, Object>> linkedHashMapList) {
        ArrayList<MovieBean> movieBeanList = new ArrayList<>();

        for (LinkedHashMap<String, Object> linkedHashMap : linkedHashMapList) {
            MovieBean movieBean = convertToMovieBean(linkedHashMap);
            movieBeanList.add(movieBean);
        }

        return movieBeanList;
    }

    private static MovieBean convertToMovieBean(LinkedHashMap<String, Object> linkedHashMap) {
        MovieBean movieBean = new MovieBean();
        movieBean.setMovieCd((String) linkedHashMap.get("movieCd"));
        movieBean.setMovieNm((String) linkedHashMap.get("movieNm"));
        movieBean.setMovieNmEn((String) linkedHashMap.get("movieNmEn"));
        movieBean.setPrdtYear((String) linkedHashMap.get("prdtYear"));
        movieBean.setOpenDt((String) linkedHashMap.get("openDt"));
        movieBean.setTypeNm((String) linkedHashMap.get("typeNm"));
        movieBean.setPrdtStatNm((String) linkedHashMap.get("prdtStatNm"));
        movieBean.setNationAlt((String) linkedHashMap.get("nationAlt"));
        movieBean.setGenreAlt((String) linkedHashMap.get("genreAlt"));
        movieBean.setRepNationNm((String) linkedHashMap.get("repNationNm"));
        movieBean.setRepGenreNm((String) linkedHashMap.get("repGenreNm"));

        List<String> directors = (List<String>) linkedHashMap.get("directors");
        List<String> companys = (List<String>) linkedHashMap.get("companys");

        movieBean.setDirectors(directors != null ? new ArrayList<>(directors) : new ArrayList<>());
        movieBean.setCompanys(companys != null ? new ArrayList<>(companys) : new ArrayList<>());

        return movieBean;
    }




    /** 영화 상세 정보 데이터 변환 */
    public MovieInfoBean extractMovieInfoBean(Map<String, Object> jsonMap) {
        MovieInfoBean movieInfoBean = new MovieInfoBean();

        if (jsonMap.containsKey("movieInfoResult")) {
            Object movieInfoResultObject = jsonMap.get("movieInfoResult");

            if (movieInfoResultObject instanceof LinkedHashMap<?, ?>) {
                LinkedHashMap<?, ?> movieInfoResult = (LinkedHashMap<?, ?>) movieInfoResultObject;

                if (movieInfoResult.containsKey("movieInfo")) {
                    Object movieInfoObject = movieInfoResult.get("movieInfo");

                    if (movieInfoObject instanceof LinkedHashMap<?, ?>) {
                        LinkedHashMap<?, ?> movieInfo = (LinkedHashMap<?, ?>) movieInfoObject;

                        // Now, extract values from movieInfo and set them to the MovieInfoBean
                        movieInfoBean.setMovieCd(getStringFromMap(movieInfo, "movieCd"));
                        movieInfoBean.setMovieNm(getStringFromMap(movieInfo, "movieNm"));
                        movieInfoBean.setMovieNmEn(getStringFromMap(movieInfo, "movieNmEn"));
                        movieInfoBean.setMovieNmOg(getStringFromMap(movieInfo, "movieNmOg"));
                        movieInfoBean.setShowTm(getStringFromMap(movieInfo, "showTm"));
                        movieInfoBean.setPrdtYear(getStringFromMap(movieInfo, "prdtYear"));
                        movieInfoBean.setOpenDt(getStringFromMap(movieInfo, "openDt"));
                        movieInfoBean.setPrdtStatNm(getStringFromMap(movieInfo, "prdtStatNm"));
                        movieInfoBean.setTypeNm(getStringFromMap(movieInfo, "typeNm"));
                        movieInfoBean.setNations(getListFromMap(movieInfo, "nations"));
                        movieInfoBean.setGenres(getListFromMap(movieInfo, "genres"));
                        movieInfoBean.setDirectors(getListFromMap(movieInfo, "directors"));
                        movieInfoBean.setActors(getListFromMap(movieInfo, "actors"));
                        movieInfoBean.setShowTypes(getListFromMap(movieInfo, "showTypes"));
                        movieInfoBean.setCompanys(getListFromMap(movieInfo, "companys"));
                        movieInfoBean.setAudits(getListFromMap(movieInfo, "audits"));
                        movieInfoBean.setStaffs(getListFromMap(movieInfo, "staffs"));
                        movieInfoBean.setSource(getStringFromMap(movieInfo, "source"));
                    }
                }
            }
        }

        return movieInfoBean;
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
    public ArrayList<MovieCompanyBean> convertToMovieCompanyBeanList(Object jsonMap) {
        ArrayList<MovieCompanyBean> movieCompanyBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("companyListResult")) {
                LinkedHashMap<String, Object> companyListResult = (LinkedHashMap<String, Object>) topLevelMap.get("companyListResult");

                if (companyListResult.containsKey("companyList")) {
                    ArrayList<LinkedHashMap<String, Object>> companyList = (ArrayList<LinkedHashMap<String, Object>>) companyListResult.get("companyList");

                    for (LinkedHashMap<String, Object> companyMap : companyList) {
                        movieCompanyBeanList.add(convertToMovieCompanyBean(companyMap));
                    }
                }
            }
        }

        return movieCompanyBeanList;
    }

    private MovieCompanyBean convertToMovieCompanyBean(LinkedHashMap<String, Object> linkedHashMap) {
        MovieCompanyBean movieCompanyBean = new MovieCompanyBean();
        movieCompanyBean.setCompanyCd((String) linkedHashMap.get("companyCd"));
        movieCompanyBean.setCompanyNm((String) linkedHashMap.get("companyNm"));
        movieCompanyBean.setCompanyNmEn((String) linkedHashMap.get("companyNmEn"));
        movieCompanyBean.setCompanyPartNames((String) linkedHashMap.get("companyPartNames"));
        movieCompanyBean.setCeoNm((String) linkedHashMap.get("ceoNm"));
        movieCompanyBean.setFilmoNames((String) linkedHashMap.get("filmoNames"));

        return movieCompanyBean;
    }




    /** 영화 인 데이터 형 변환 */
    public ArrayList<MoviePeopleBean> convertToMoviePeopleBeanList(Object jsonMap) {
        ArrayList<MoviePeopleBean> moviePeopleBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("peopleListResult")) {
                LinkedHashMap<String, Object> peopleListResult = (LinkedHashMap<String, Object>) topLevelMap.get("peopleListResult");

                if (peopleListResult.containsKey("peopleList")) {
                    ArrayList<LinkedHashMap<String, Object>> peopleList = (ArrayList<LinkedHashMap<String, Object>>) peopleListResult.get("peopleList");

                    for (LinkedHashMap<String, Object> peopleMap : peopleList) {
                        moviePeopleBeanList.add(convertToMoviePeopleBean(peopleMap));
                    }
                }
            }
        }

        return moviePeopleBeanList;
    }

    private MoviePeopleBean convertToMoviePeopleBean(LinkedHashMap<String, Object> people) {
        MoviePeopleBean moviePeopleBean = new MoviePeopleBean();
        moviePeopleBean.setPeopleCd((String) people.get("peopleCd"));
        moviePeopleBean.setPeopleNm((String) people.get("peopleNm"));
        moviePeopleBean.setPeopleNmEn((String) people.get("peopleNmEn"));
        moviePeopleBean.setRepRoleNm((String) people.get("repRoleNm"));
        moviePeopleBean.setFilmoNames((String) people.get("filmoNames"));

        return moviePeopleBean;
    }


    public ArrayList<MoviePeopleInfoBean> convertToMoviePeopleInfoBeanList(Object jsonMap) {
        ArrayList<MoviePeopleInfoBean> moviePeopleInfoBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("peopleInfoResult")) {
                LinkedHashMap<String, Object> peopleInfoResult = (LinkedHashMap<String, Object>) topLevelMap.get("peopleInfoResult");

                if (peopleInfoResult.containsKey("peopleInfo")) {
                    LinkedHashMap<String, Object> peopleInfo = (LinkedHashMap<String, Object>) peopleInfoResult.get("peopleInfo");

                    MoviePeopleInfoBean moviePeopleInfoBean = convertToMoviePeopleInfoBean(peopleInfo);
                    moviePeopleInfoBeanList.add(moviePeopleInfoBean);
                }
            }
        }

        return moviePeopleInfoBeanList;
    }

    private MoviePeopleInfoBean convertToMoviePeopleInfoBean(LinkedHashMap<String, Object> linkedHashMap) {
        MoviePeopleInfoBean moviePeopleInfoBean = new MoviePeopleInfoBean();
        moviePeopleInfoBean.setPeopleCd((String) linkedHashMap.get("peopleCd"));
        moviePeopleInfoBean.setPeopleNm((String) linkedHashMap.get("peopleNm"));
        moviePeopleInfoBean.setPeopleNmEn((String) linkedHashMap.get("peopleNmEn"));
        moviePeopleInfoBean.setSex((String) linkedHashMap.get("sex"));
        moviePeopleInfoBean.setRepRoleNm((String) linkedHashMap.get("repRoleNm"));


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
            moviePeopleInfoBean.setFilmos(filmos);
        } else {
            moviePeopleInfoBean.setFilmos(""); // 빈 문자열로 설정 또는 null로 설정하셔도 됩니다.
        }

        return moviePeopleInfoBean;
    }


    public ArrayList<MovieNationBean> convertToMovieNationBeanList(Object jsonMap) {
        ArrayList<MovieNationBean> movieNationBeanList = new ArrayList<>();

        if (jsonMap instanceof LinkedHashMap) {
            LinkedHashMap<String, Object> topLevelMap = (LinkedHashMap<String, Object>) jsonMap;

            if (topLevelMap.containsKey("codes")) {
                ArrayList<LinkedHashMap<String, Object>> codesList = (ArrayList<LinkedHashMap<String, Object>>) topLevelMap.get("codes");

                for (LinkedHashMap<String, Object> codeMap : codesList) {
                    movieNationBeanList.add(convertToMovieNationBean(codeMap));
                }
            }
        }

        return movieNationBeanList;
    }

    private MovieNationBean convertToMovieNationBean(LinkedHashMap<String, Object> linkedHashMap) {
        MovieNationBean movieNationBean = new MovieNationBean();
        movieNationBean.setFullCd((String) linkedHashMap.get("fullCd"));
        movieNationBean.setKorNm((String) linkedHashMap.get("korNm"));
        movieNationBean.setEngNm((String) linkedHashMap.get("engNm"));

        return movieNationBean;
    }






}
