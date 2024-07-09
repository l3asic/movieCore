package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.login.vo.LoginMemberVo;
import com.example.movieCore.movie.bean.*;
import com.example.movieCore.movie.vo.MovVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;


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

    int updateMovPersonalMoviePoint(MovVo movVo);

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


    ArrayList<MovieBoxOfficeBean> selectBoxOfficeList(MovVo movVo);

    int checkGenreTaste(MovVo movVo);

    void insertGenreTaste(MovVo movVo);

    void updateGenreTaste(MovVo movVo);

    ArrayList<MovieGenreBean> viewLogTopMovGr(LoginMemberVo memVo);

    ArrayList<MovieGenreBean> pointAvgTopMovGr(LoginMemberVo memVo);

    ArrayList<MovieGenreBean> favTopMovGr(LoginMemberVo memVo);

    ArrayList<MovieGenreBean> pointMaxTopMovGr(LoginMemberVo memVo);

    ArrayList<MovieBean> selectPersonalRecommendMov(MovVo movVo);

    ArrayList<MovieBean> pointAvgTopMov();

    List<MovieBean> viewLogTopMov();
}
