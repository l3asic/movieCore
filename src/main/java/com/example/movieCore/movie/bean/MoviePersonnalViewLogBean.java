package com.example.movieCore.movie.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class MoviePersonnalViewLogBean {
    
    /** 영화 조회 로그 */
    
    private String movieCd;
    private String memId;
    private java.sql.Timestamp   openDt;



}
