package com.example.movieCore.movie.vo;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.migMovie.bean.BatchLog;
import com.example.movieCore.movie.bean.*;
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

    /** 영화 조회 리스트 */
    private ArrayList<MoviePersonnalViewLogBean> moviePersonnalViewLogBeanList;

    /** 사용자 정보 */
    private LoginMemberBean memberBean;

    /** 나의 영화 평가 (별점, 한줄평) */
    private MoviePersonalMoviePoint moviePersonalMoviePointBean;


    /** 일일 박스 오피스 */
    private MovieBoxOfficeBean movieBoxOfficeBean;


    /** 일일 박스 오피스 리스트 */
    private ArrayList<MovieBoxOfficeBean> movieBoxOfficeBeanList;


    /** 배치 로그 리스트 */
    private ArrayList<BatchLog> BatchLogList;


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


    /** 삭제/ 복원 모드 구분값 등 사용 용도 커스텀 컬럼 */
    private String mode;



}
