package com.example.movieCore.movie.service;

import com.example.movieCore.migMovie.vo.MigMovVo;
import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.mapperInterface.MovMovieMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class MovMovieServiceImpl {

    @Autowired
    private MovMovieMapper movMovieMapper;

    public ArrayList<MovieBean> selectAllMovieList() {
        return movMovieMapper.selectAllMovieList();
    }


}
