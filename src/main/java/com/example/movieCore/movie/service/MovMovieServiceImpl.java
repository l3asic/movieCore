package com.example.movieCore.movie.service;

import com.example.movieCore.movie.bean.*;
import com.example.movieCore.movie.mapperInterface.MovMovieMapper;
import com.example.movieCore.movie.vo.MovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class MovMovieServiceImpl {

    @Autowired
    private MovMovieMapper movMovieMapper;

    public ArrayList<MovieBean> selectMovieListAdmin(MovVo movVo) {
        return movMovieMapper.selectMovieListAdmin(movVo);
    }


    public int selectMovieListTotalCntAdmin(MovVo movVo) {
        return movMovieMapper.selectMovieListTotalCntAdmin(movVo);
    }

    public int updateMovieStateAdmin(MovVo movVo) {
        return movMovieMapper.updateMovieStateAdmin(movVo);
    }


    public ArrayList<MovieBean> selectMovieList(MovVo movVo) {
        return movMovieMapper.selectMovieList(movVo);
    }


    public int selectMovieListTotalCnt(MovVo movVo) {
        return movMovieMapper.selectMovieListTotalCnt(movVo);
    }

    public MovieBean selectMovieInfo(MovVo movVo) {
        return movMovieMapper.selectMovieInfo(movVo);
    }

    public ArrayList<MovieGenreBean> selectMovieGenreList(MovVo movVo) {
        return movMovieMapper.selectMovieGenreList(movVo);
    }

    public ArrayList<MovieCompanyBean> selectMovieCompanyList(MovVo movVo) {
        return movMovieMapper.selectMovieCompanyList(movVo);
    }

    public ArrayList<MovieNationBean> selectMovieNationList(MovVo movVo) {
        return movMovieMapper.selectMovieNationList(movVo);
    }

    public int addMovieViewCnt(MovVo movVo) {
        return movMovieMapper.addMovieViewCnt(movVo);
    }

    public void reFreshMovieTotalViewCnt(MovVo movVo) {
        movMovieMapper.reFreshMovieTotalViewCnt(movVo);
    }

    public void addMovieFav(MovVo movVo) {
        movMovieMapper.addMovieFav(movVo);
    }

    public void deleteMovieFav(MovVo movVo) {
        movMovieMapper.deleteMovieFav(movVo);
    }

    public boolean selectMovieFavorite(MovVo movVo) {
        if(movMovieMapper.selectMovieFavorite(movVo) == 1){
            return true;
        }else{
            return false;
        }
    }

    public void updateMovPersonalMoviePoint(MovVo movVo) {
        movMovieMapper.updateMovPersonalMoviePoint(movVo);
    }

    public MoviePersonalMoviePoint selectMoviePersonalMoviePointBean(MovVo movVo) {
        return movMovieMapper.selectMoviePersonalMoviePointBean(movVo);
    }

    public void deleteMovPersonalMoviePoint(MovVo movVo) {
        movMovieMapper.deleteMovPersonalMoviePoint(movVo);
    }

    public void updateMovieInfoPoint(MovVo movVo) {
        movMovieMapper.updateMovieInfoPoint(movVo);
    }
}
