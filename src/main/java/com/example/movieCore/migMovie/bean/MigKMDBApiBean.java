package com.example.movieCore.migMovie.bean;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@JsonIgnoreProperties(ignoreUnknown = true)
public class MigKMDBApiBean {

    private String movieCd;
    private String Query;
    private String docid;
    private String movieId;
    private String movieSeq;
    private String title;
    private String titleEng;
    private String titleOrg;
    private String titleEtc;
    private String directorNm;
    private String directorEnNm;
    private String directorId;
    private String actorNm;
    private String actorEnNm;
    private String actorId;
    private String nation;
    private String company;
    private String prodYear;
    private String plot;
    private String runtime;
    private String rating;
    private String genre;
    private String kmdbUrl;
    private String type;
    private String use;
    private String episodes;
    private String ratedYn;
    private String repRatDate;
    private String repRlsDate;
    private String ratingMain;
    private String ratingDate;
    private String ratingNo;
    private String ratingGrade;
    private String releaseDate;
    private String keywords;
    private String posterUrl;
    private String stillUrl;
    private String StaffNm;
    private String staffRoleGroup;
    private String StaffRole;
    private String StaffEtc;
    private String StaffId;
    private String vodClass;
    private String vodUrl;
    private String openThtr;
    private String screenArea;
    private String screenCnt;
    private String salesAcc;
    private String audiAcc;
    private String statSource;
    private String statDate;
    private String themeSong;
    private String soundtrack;
    private String fLocation;
    private String Awards1;
    private String Awards2;
    private String regDate;
    private String modDate;
    private String CodeNm;
    private String CodeNo;

    private String posters;
    private List<String> posterList;

}
