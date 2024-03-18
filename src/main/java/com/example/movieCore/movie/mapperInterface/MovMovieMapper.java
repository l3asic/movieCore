package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.movie.bean.*;
import com.example.movieCore.movie.vo.MovVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MovMovieMapper {

    ArrayList<MovieBean> selectMovieListAdmin(MovVo movVo);

    int selectMovieListTotalCntAdmin(MovVo movVo);

    int updateMovieStateAdmin(MovVo movVo);


    ArrayList<MovieBean> selectMovieList(MovVo movVo);

    int selectMovieListTotalCnt(MovVo movVo);

    MovieBean selectMovieInfo(MovVo movVo);

    ArrayList<MovieGenreBean> selectMovieGenreList(MovVo movVo);

    ArrayList<MovieCompanyBean> selectMovieCompanyList(MovVo movVo);

    ArrayList<MovieNationBean> selectMovieNationList(MovVo movVo);

    int addMovieViewCnt(MovVo movVo);

    void reFreshMovieTotalViewCnt(MovVo movVo);

    void addMovieFav(MovVo movVo);

    void deleteMovieFav(MovVo movVo);

    int selectMovieFavorite(MovVo movVo);

    void updateMovPersonalMoviePoint(MovVo movVo);

    MoviePersonalMoviePoint selectMoviePersonalMoviePointBean(MovVo movVo);

    void deleteMovPersonalMoviePoint(MovVo movVo);

    void updateMovieInfoPoint(MovVo movVo);

    ArrayList<MoviePeopleBean> selectMoviePeopleList(MovVo movVo);

    ArrayList<MoviePersonalMoviePoint> selectMoviePersonalMoviePointBeanList(MovVo movVo);

    void updateMovieState(MovVo movVo);

    void insertFileBean(MovVo movVo);

    void insertMovieFileMap(MovVo movVo);

    FileBean selectMoviePosterBean(MovVo movVo);

    ArrayList<MovieBean> selectMyFavMovList(MovVo movVo);

    void updateMovieFileState(MovVo movVo);

    MoviePersonalMoviePoint selectMoviePersonalMoviePoint(MovVo movVo);
}
