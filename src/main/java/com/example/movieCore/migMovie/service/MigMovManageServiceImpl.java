package com.example.movieCore.migMovie.service;

import com.example.movieCore.migMovie.bean.MigMovieBean;
import com.example.movieCore.migMovie.bean.MigMovieGenreBean;
import com.example.movieCore.migMovie.bean.MigMovieNationBean;
import com.example.movieCore.migMovie.bean.MigMoviePeopleBean;
import com.example.movieCore.migMovie.mapperInterface.MigMovManageMapper;
import com.example.movieCore.migMovie.vo.MigMovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class MigMovManageServiceImpl {

    @Autowired
    private MigMovManageMapper migMovManageMapper;


    public void insertMovieBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieBean(movVo);
    }

    public void insertMovieInfoBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieInfoBean(movVo);
    }

    public void insertMovieCompanyBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieCompanyBean(movVo);
    }

    public void insertMoviePeopleBean(MigMovVo movVo) {
        migMovManageMapper.insertMoviePeopleBean(movVo);
    }

    public void insertMovieCompanyMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieCompanyMap(movVo);
    }

    public ArrayList<MigMoviePeopleBean> selectMoviePeopleList(MigMovVo movVo) {
        return migMovManageMapper.selectMoviePeopleList(movVo);
    }

    public void insertMoviePeopleInfoBean(MigMovVo movVo) {
        migMovManageMapper.insertMoviePeopleInfoBean(movVo);
    }

    public void insertMovieNationBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieNationBean(movVo);
    }

    public void insertMovieNationMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieNationMap(movVo);
    }

    public String selectMovieNation(MigMovieNationBean migMovieNationBean) {
        return migMovManageMapper.selectMovieNation(migMovieNationBean);
    }

    public int checkTheCompany(MigMovVo movVo) {
        return migMovManageMapper.checkTheCompany(movVo);
    }

    public MigMovieGenreBean selectMovieGenre(String genreNm) {
        return migMovManageMapper.selectMovieGenre(genreNm);
    }

    public void insertMovieGenre(MigMovVo movVo) {
        migMovManageMapper.insertMovieGenre(movVo);
    }

    public void insertMovieGenreMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieGenreMap(movVo);
    }

    public int checkPeopleInfo(String peopleCd) {
        return migMovManageMapper.checkPeopleInfo(peopleCd);
    }

    public int callDBTest() {
       return migMovManageMapper.callDBTest();
    }

    public ArrayList<MigMoviePeopleBean> selectPeopleCdByNm(String peopleNm) {
        return migMovManageMapper.selectPeopleCdByNm(peopleNm);
    }

    public void insertMoviePeopleMap(MigMovVo movVo) {
        migMovManageMapper.insertMoviePeopleMap(movVo);
    }

    public ArrayList<MigMovieBean> selectMovieList() {
        return migMovManageMapper.selectMovieList();
    }

    public String selectDirector(MigMovVo movVo) {
        return migMovManageMapper.selectDirector(movVo);
    }

    public void updateURL(MigMovVo movVo) {
        migMovManageMapper.updateURL(movVo);
    }

    public void insertMovieFileMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieFileMap(movVo);
    }

    public void insertFileBean(MigMovVo movVo) {
        migMovManageMapper.insertFileBean(movVo);
    }

    public int checkMovieCntByMovieCd(String movieCd) {
        return migMovManageMapper.checkMovieCntByMovieCd(movieCd);
    }

    public void insertBoxOffice(MigMovVo movVo) {
        migMovManageMapper.insertBoxOffice(movVo);
    }

    public void updateOpenDt(MigMovVo movVo) {
        migMovManageMapper.updateOpenDt(movVo);
    }
}
