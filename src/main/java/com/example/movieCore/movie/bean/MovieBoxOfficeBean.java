package com.example.movieCore.movie.bean;

import com.example.movieCore.cmm.FileBean;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
public class MovieBoxOfficeBean {


    /** 박스오피스 조회 일자 */
    private String showRange;

    /** 영화 코드 */
    private String movieCd;

    /** 영화 제목 */
    private String movieNm;

    /** 박스오피스 순위 */
    private String rank;

    /** 랭킹 신규진입 여부 old/new */
    private String rankOldAndNew;

    /** 해당일의 관객 수 */
    private String audiCnt;

    /** 전일 대비 관객 수 증감분 */
    private String audiInten;

    /** 전일 대비 관객 수 증감 비율 */
    private String audiChange;

    /** 누적 관객수 */
    private String audiAcc;

    /** 개봉일 */
    private java.sql.Timestamp openDt;

    /** 박스오피스 타입 (주간/일일) */
    private String boxOfficeType;


    /** 영화 정보 */
    private MovieBean movieBean;


    /** 영화 포스터 파일 정보 */
    private FileBean fileBean;



}
