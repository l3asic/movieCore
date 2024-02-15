package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.vo.MovVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MovMovieMapper {

    ArrayList<MovieBean> selectMovieList(MovVo movVo);

    int selectMovieListTotalCnt(MovVo movVo);

    int movieListStateDelete(MovVo movVo);
}
