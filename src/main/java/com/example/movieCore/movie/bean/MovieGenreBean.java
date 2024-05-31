package com.example.movieCore.movie.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieGenreBean {

    /** 장르 */

    private String movieCd;
    private String genreCd;
    private String genreNm;


    /** 장르 취향 테이블 MOV_PERSONAL_GRNRE_TASTE */
    private String pointAvg;
    private int pointTotal;
    private int pointCount;

}
