package com.example.movieCore.movie.vo;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.bean.SearchBean;
import com.example.movieCore.utils.Paging;
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


    /** 검색 조건 */
    private SearchBean searchBean;


    /** 페이징 */
    private Paging paging;

    private String searchFilter;
    private String searchText;


}
