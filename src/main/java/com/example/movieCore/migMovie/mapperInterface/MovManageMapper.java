package com.example.movieCore.migMovie.mapperInterface;

import com.example.movieCore.migMovie.bean.MigMovieGenreBean;
import com.example.movieCore.migMovie.bean.MigMoviePeopleBean;
import com.example.movieCore.migMovie.vo.MovVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MovManageMapper {

    void insertMovieBean(MovVo movVo);

    void insertMovieInfoBean(MovVo movVo);

    void insertMovieCompanyBean(MovVo movVo);

    void insertMoviePeopleBean(MovVo movVo);

    void insertMovieCompanyMap(MovVo movVo);

    ArrayList<MigMoviePeopleBean> selectMoviePeopleList(MovVo movVo);

    void insertMoviePeopleInfoBean(MovVo movVo);

    void insertMovieNationBean(MovVo movVo);

    void insertMovieNationMap(MovVo movVo);

    String selectMovieNation(MovVo movVo);

    int checkTheCompany(MovVo movVo);

    MigMovieGenreBean selectMovieGenre(String genreNm);

    void insertMovieGenre(MovVo movVo);

    void insertMovieGenreMap(MovVo movVo);
}
