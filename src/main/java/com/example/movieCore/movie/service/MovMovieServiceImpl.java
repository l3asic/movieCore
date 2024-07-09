package com.example.movieCore.movie.service;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.login.vo.LoginMemberVo;
import com.example.movieCore.movie.bean.*;
import com.example.movieCore.movie.mapperInterface.MovMovieMapper;
import com.example.movieCore.movie.vo.MovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


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

    public int updateMovPersonalMoviePoint(MovVo movVo) {
        return movMovieMapper.updateMovPersonalMoviePoint(movVo);
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

    public ArrayList<MoviePeopleBean> selectMoviePeopleList(MovVo movVo) {
        return movMovieMapper.selectMoviePeopleList(movVo);
    }

    public ArrayList<MoviePersonalMoviePoint> selectMoviePersonalMoviePointBeanList(MovVo movVo) {
        return movMovieMapper.selectMoviePersonalMoviePointBeanList(movVo);
    }

    public void updateMovieState(MovVo movVo) {
        movMovieMapper.updateMovieState(movVo);
    }

    public void insertFileBean(MovVo movVo) {
        movMovieMapper.insertFileBean(movVo);
    }

    public void insertMovieFileMap(MovVo movVo) {
        movMovieMapper.insertMovieFileMap(movVo);
    }

    public FileBean selectMoviePosterBean(MovVo movVo) {
        return movMovieMapper.selectMoviePosterBean(movVo);
    }

    public ArrayList<MovieBean> selectMyFavMovList(MovVo movVo) {
        return movMovieMapper.selectMyFavMovList(movVo);
    }

    public void updateMovieFileState(MovVo movVo) {
        movMovieMapper.updateMovieFileState(movVo);
    }

    public MoviePersonalMoviePoint selectMoviePersonalMoviePoint(MovVo movVo) {
        return movMovieMapper.selectMoviePersonalMoviePoint(movVo);
    }



    public ArrayList<MovieBoxOfficeBean> selectBoxOfficeList(MovVo movVo) {
        return movMovieMapper.selectBoxOfficeList(movVo);
    }


    public int checkGenreTaste(MovVo movVo) {
       return movMovieMapper.checkGenreTaste(movVo);
    }

    public void insertGenreTaste(MovVo movVo) {
        movMovieMapper.insertGenreTaste(movVo);
    }

    public void updateGenreTaste(MovVo movVo) {
        movMovieMapper.updateGenreTaste(movVo);
    }

    public ArrayList<MovieGenreBean> viewLogTopMovGr(LoginMemberVo memVo) {
        return movMovieMapper.viewLogTopMovGr(memVo);
    }

    public ArrayList<MovieGenreBean> pointAvgTopMovGr(LoginMemberVo memVo) {
        return movMovieMapper.pointAvgTopMovGr(memVo);
    }

    public ArrayList<MovieGenreBean> favTopMovGr(LoginMemberVo memVo) {
        return movMovieMapper.favTopMovGr(memVo);
    }

    public ArrayList<MovieGenreBean> pointMaxTopMovGr(LoginMemberVo memVo) {
        return movMovieMapper.pointMaxTopMovGr(memVo);
    }

    public ArrayList<MovieBean> selectPersonalRecommendMov(MovVo movVo) {
        return movMovieMapper.selectPersonalRecommendMov(movVo);
    }

    public ArrayList<MovieBean> pointAvgTopMov() {
        return movMovieMapper.pointAvgTopMov();
    }

    public List<MovieBean> viewLogTopMov() {
        return movMovieMapper.viewLogTopMov();
    }
}
