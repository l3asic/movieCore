package com.example.movieCore.movie.Bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MovieBean {

    /** 영화 코드 */
    private String movieCd;

    /** 영화 제목(국문) */
    private String movieNm;

    /** 영화 제목(영문) */
    private String movieNmEn;

    /** 제작년도 */
    private String prdtYear;

    /** 개봉일 */
    private String openDt;

    /** 영화 유형 */
    private String typeNm;

    /** 제작 상태 */
    private String prdtStatNm;

    /** 제작 국가 */
    private String nationAlt;

    /** 영화 장르 */
    private String genreAlt;

    /** 대표 제작 국가 명 */
    private String repNationNm;

    /** 대표 장르 명 */
    private String repGenreNm;
    
    /** 영화 감독 */
    private String directors;
    
    /** 제작사  */
    private String companys;


}
