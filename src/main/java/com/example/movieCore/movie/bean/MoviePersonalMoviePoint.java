package com.example.movieCore.movie.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoviePersonalMoviePoint {

    /** 영화 평가 (별점, 한줄평) */

    private String movieCd;
    private String memId;
    private String memName;
    private String point;
    private String repl;
    private String state;

    // 영화 평가인의 프사
    private String profileSrc;



}
