package com.example.movieCore.migMovie.mapperInterface;

import com.example.movieCore.migMovie.bean.MigMovieGenreBean;
import com.example.movieCore.migMovie.bean.MigMovieNationBean;
import com.example.movieCore.migMovie.bean.MigMoviePeopleBean;
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
}
