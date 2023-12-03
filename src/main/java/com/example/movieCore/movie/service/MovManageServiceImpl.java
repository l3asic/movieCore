package com.example.movieCore.movie.service;

import com.example.movieCore.movie.bean.MovieGenreBean;
import com.example.movieCore.movie.bean.MoviePeopleBean;
import com.example.movieCore.movie.mapperInterface.MovManageMapper;
import com.example.movieCore.movie.vo.MovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class MovManageServiceImpl {

    @Autowired
    private MovManageMapper movManageMapper;


    public void insertMovieBean(MovVo movVo) {
        movManageMapper.insertMovieBean(movVo);
    }

    public void insertMovieInfoBean(MovVo movVo) {
        movManageMapper.insertMovieInfoBean(movVo);
    }

    public void insertMovieCompanyBean(MovVo movVo) {
        movManageMapper.insertMovieCompanyBean(movVo);
    }

    public void insertMoviePeopleBean(MovVo movVo) {
        movManageMapper.insertMoviePeopleBean(movVo);
    }

    public void insertMovieCompanyMap(MovVo movVo) {
        movManageMapper.insertMovieCompanyMap(movVo);
    }

    public ArrayList<MoviePeopleBean> selectMoviePeopleList(MovVo movVo) {
        return movManageMapper.selectMoviePeopleList(movVo);
    }

    public void insertMoviePeopleInfoBean(MovVo movVo) {
        movManageMapper.insertMoviePeopleInfoBean(movVo);
    }

    public void insertMovieNationBean(MovVo movVo) {
        movManageMapper.insertMovieNationBean(movVo);
    }

    public void insertMovieNationMap(MovVo movVo) {
        movManageMapper.insertMovieNationMap(movVo);
    }

    public String selectMovieNation(MovVo movVo) {
        return movManageMapper.selectMovieNation(movVo);
    }

    public int checkTheCompany(MovVo movVo) {
        return movManageMapper.checkTheCompany(movVo);
    }

    public MovieGenreBean selectMovieGenre(String genreNm) {
        return movManageMapper.selectMovieGenre(genreNm);
    }

    public void insertMovieGenre(MovVo movVo) {
        movManageMapper.insertMovieGenre(movVo);
    }

    public void insertMovieGenreMap(MovVo movVo) {
        movManageMapper.insertMovieGenreMap(movVo);
    }
}
