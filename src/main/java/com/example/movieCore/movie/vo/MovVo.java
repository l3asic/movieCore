package com.example.movieCore.movie.vo;

import com.example.movieCore.movie.bean.MovieBean;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class MovVo {

    /** 영화 정보 */
    private MovieBean movieBean;

    /** 영화 리스트 */
    private ArrayList<MovieBean> movieBeanList;

}
