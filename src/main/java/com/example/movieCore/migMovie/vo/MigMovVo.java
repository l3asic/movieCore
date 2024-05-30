package com.example.movieCore.migMovie.vo;

import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.movie.bean.MovieBoxOfficeBean;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class MigMovVo {

    /** 이관 토탈 갯수 */
    private int totCnt;

    /** 영화 정보 */
    private MigMovieBean migMovieBean;

    /** 영화 리스트 */
    private ArrayList<MigMovieBean> migMovieBeanList;

    /** 영화 상세 정보 */
    private MigMovieInfoBean migMovieInfoBean;

    /** 영화 회사 정보 */
    private MigMovieCompanyBean migMovieCompanyBean;

    /** 영화 회사 리스트 */
    private ArrayList<MigMovieCompanyBean> migMovieCompanyBeanList;


    /** 영화 인 정보 */
    private MigMoviePeopleBean migMoviePeopleBean;

    /** 영화 인 리스트 */
    private ArrayList<MigMoviePeopleBean> migMoviePeopleBeanList;

    /** 영화인 상세정보 */
    private MigMoviePeopleInfoBean migMoviePeopleInfoBean;


    /** 영화 제작 국가  */
    private MigMovieNationBean migMovieNationBean;

    /** 영화 제작 국가 리스트 */
    private ArrayList<MigMovieNationBean> migMovieNationBeanList;


    /** 영화 제작 국가  */
    private MigMovieGenreBean migMovieGenreBean;




    /** 영화 일별 박스오피스 리스트 */
    private ArrayList<MovieBoxOfficeBean> boxOfficeBeanList;


    private MovieBoxOfficeBean boxOfficeBean;


    /** 배치 설정 */
    private BatchConfig batchConfig;

    /** 배치 로그 리스트 */
    private ArrayList<BatchLog> BatchLogList;






}
