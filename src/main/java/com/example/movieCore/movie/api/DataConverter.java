package com.example.movieCore.movie.api;

import com.example.movieCore.movie.bean.MovieBean;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

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
}
