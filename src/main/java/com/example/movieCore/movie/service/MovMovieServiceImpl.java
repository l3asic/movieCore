package com.example.movieCore.movie.service;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.mapperInterface.MovMovieMapper;
import com.example.movieCore.movie.vo.MovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class MovMovieServiceImpl {

    @Autowired
    private MovMovieMapper movMovieMapper;

    public ArrayList<MovieBean> selectMovieList(MovVo movVo) {
        return movMovieMapper.selectMovieList(movVo);
    }


}
