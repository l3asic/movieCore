package com.example.movieCore.movie.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
public class MovieBean {

    /** mov_movie 테이블 */

    private String movieCd;
    private String movieNm;
    private String movieNmEn;
    private String prdtYear;
    private Date   openDt;
    private String typeNm;
    private String prdtStatNm;
    private String genreAlt;
    private String repGenreNm;
    private String state;


    /** mov_movie_info 테이블 */
    private String movieNmOg;
    private String showTm;
    private String nationNm;
    private String genreNm;
    private String cast;
    private String castEn;
    private String showTypes;
    private String showTypeGroupNm;
    private String showTypeNm;
    private String auditNo;
    private String watchGradeNm;
    private String pointYn;
    private String pointAvg;
    private String pointTotalCnt;
    private String totalViewCnt;
    private String previewUrl;

    /** 영화 찜하기 정보 */
    private boolean isFav;

    /** 영화 평가여부 정보 */
    private boolean isEvaluated;




    /** 제작사들 */
    private ArrayList<MovieCompanyBean> movieCompanyBeanList;



    /** 감독,배우,스태프들 */
    private ArrayList<MoviePeopleBean> moviePeopleBeanList;

    /** 감독들 */
    private ArrayList<MoviePeopleBean> movieDirectorBeanList;

    /** 배우 */
    private ArrayList<MoviePeopleBean> movieActorBeanList;

    /** 스태프 */
    private ArrayList<MoviePeopleBean> movieStaffBeanList;


    /** 제작 국가 */
    private ArrayList<MovieNationBean> movieNationBeanList;


    /** 장르 */
    private ArrayList<MovieGenreBean> movieGenreBeanList;


    /** 영화 평가 리스트 */
    private ArrayList<MoviePersonalMoviePoint> moviePersonalMoviePointBeanList;







}
