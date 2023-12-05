package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.movie.bean.MovieBean;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MovMovieMapper {

    ArrayList<MovieBean> selectAllMovieList();
}
