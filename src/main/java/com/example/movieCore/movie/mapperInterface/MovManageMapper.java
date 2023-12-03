package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.movie.bean.MoviePeopleBean;
import com.example.movieCore.movie.vo.MovVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MovManageMapper {

    void insertMovieBean(MovVo movVo);

    void insertMovieInfoBean(MovVo movVo);

    void insertMovieCompanyBean(MovVo movVo);

    void insertMoviePeopleBean(MovVo movVo);

    void insertMovieCompanyMap(MovVo movVo);

    ArrayList<MoviePeopleBean> selectMoviePeopleList(MovVo movVo);

    void insertMoviePeopleInfoBean(MovVo movVo);

    void insertMovieNationBean(MovVo movVo);

    void insertMovieNationMap(MovVo movVo);

    String selectMovieNation(MovVo movVo);
}
