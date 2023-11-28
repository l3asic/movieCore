package com.example.movieCore.movie.api;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.bean.MovieInfoBean;

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






}
