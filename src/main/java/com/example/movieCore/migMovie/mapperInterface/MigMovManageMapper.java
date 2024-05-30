package com.example.movieCore.migMovie.mapperInterface;

import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.migMovie.vo.MigMovVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MigMovManageMapper {

    void insertMovieBean(MigMovVo movVo);

    void insertMovieInfoBean(MigMovVo movVo);

    void insertMovieCompanyBean(MigMovVo movVo);

    void insertMoviePeopleBean(MigMovVo movVo);

    void insertMovieCompanyMap(MigMovVo movVo);

    ArrayList<MigMoviePeopleBean> selectMoviePeopleList(MigMovVo movVo);

    void insertMoviePeopleInfoBean(MigMovVo movVo);

    void insertMovieNationBean(MigMovVo movVo);

    void insertMovieNationMap(MigMovVo movVo);

    String selectMovieNation(MigMovieNationBean migMovieNationBean);

    int checkTheCompany(MigMovVo movVo);

    MigMovieGenreBean selectMovieGenre(String genreNm);

    void insertMovieGenre(MigMovVo movVo);

    void insertMovieGenreMap(MigMovVo movVo);

    int checkPeopleInfo(String peopleCd);

    int callDBTest();

    ArrayList<MigMoviePeopleBean> selectPeopleCdByNm(String peopleNm);

    void insertMoviePeopleMap(MigMovVo movVo);

    ArrayList<MigMovieBean> selectMovieList();

    String selectDirector(MigMovVo movVo);

    void updateURL(MigMovVo movVo);

    void insertMovieFileMap(MigMovVo movVo);

    void insertFileBean(MigMovVo movVo);

    int checkMovieCntByMovieCd(String movieCd);

    void insertBoxOffice(MigMovVo movVo);

    void updateOpenDt(MigMovVo movVo);

    boolean dailyBoxOfficeRunCheck(String batchName);

    boolean BoxOfficeBatchActiveUpdate(MigMovVo movVo);

    void insertBatchLog(BatchLog batchLog);

    ArrayList<BatchLog> selectBatchLog();
}
