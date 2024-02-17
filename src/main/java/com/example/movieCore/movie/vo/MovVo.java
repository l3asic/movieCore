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
    
    /** 페이지 이동시 새페이지 번호 */
    private int newPage;


    private String searchFilter;
    private String searchText;

    private String sortKey;
    private String sortOdr;


    /** 삭제/ 복원 모드 구분값 */
    private String mode;



}
