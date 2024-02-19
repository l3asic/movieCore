package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.bean.MovieCompanyBean;
import com.example.movieCore.movie.bean.MovieGenreBean;
import com.example.movieCore.movie.bean.MovieNationBean;
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
}
