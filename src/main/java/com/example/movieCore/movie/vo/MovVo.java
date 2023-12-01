package com.example.movieCore.movie.vo;

import com.example.movieCore.movie.bean.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class MovVo {

    /** 이관 토탈 갯수 */
    private int totCnt;

    /** 영화 정보 */
    private MovieBean movieBean;

    /** 영화 리스트 */
    private ArrayList<MovieBean> movieBeanList;

    /** 영화 상세 정보 */
    private MovieInfoBean movieInfoBean;

    /** 영화 회사 정보 */
    private MovieCompanyBean movieCompanyBean;

    /** 영화 회사 리스트 */
    private ArrayList<MovieCompanyBean> movieCompanyBeanList;


    /** 영화 인 정보 */
    private MoviePeopleBean moviePeopleBean;

    /** 영화 인 리스트 */
    private ArrayList<MoviePeopleBean> moviePeopleBeanList;

    /** 영화인 상세정보 */
    private MoviePeopleInfoBean moviePeopleInfoBean;









}
