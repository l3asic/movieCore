package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.vo.MovVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MovMovieMapper {

    ArrayList<MovieBean> selectMovieListAdmin(MovVo movVo);

    int selectMovieListTotalCntAdmin(MovVo movVo);

    int movieListStateDeleteAdmin(MovVo movVo);


    ArrayList<MovieBean> selectMovieList(MovVo movVo);

    int selectMovieListTotalCnt(MovVo movVo);

}
