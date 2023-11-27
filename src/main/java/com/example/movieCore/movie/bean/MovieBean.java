package com.example.movieCore.movie.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

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
    
    /** 영화 감독들 */
    private List<String> directors;

    /** 감독명 */
    private String peopleNm;
    
    /** 제작사들  */
    private List<String> companys;

    /** 제작사 코드 */
    private String companyCd;

    /** 제작사 명 */
    private String companyNm;

    @Override
    public String toString() {
        return "MovieBean{" +
                "movieCd='" + movieCd + '\'' +
                ", movieNm='" + movieNm + '\'' +
                ", movieNmEn='" + movieNmEn + '\'' +
                ", prdtYear='" + prdtYear + '\'' +
                ", openDt='" + openDt + '\'' +
                ", typeNm='" + typeNm + '\'' +
                ", prdtStatNm='" + prdtStatNm + '\'' +
                ", nationAlt='" + nationAlt + '\'' +
                ", genreAlt='" + genreAlt + '\'' +
                ", repNationNm='" + repNationNm + '\'' +
                ", repGenreNm='" + repGenreNm + '\'' +
                ", directors=" + directors +
                ", companys=" + companys +
                '}';
    }







}
