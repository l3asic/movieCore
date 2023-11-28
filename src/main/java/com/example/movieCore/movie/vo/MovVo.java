package com.example.movieCore.movie.vo;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.bean.MovieCompanyBean;
import com.example.movieCore.movie.bean.MovieInfoBean;
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


}
