package com.example.movieCore.movie.service;

import com.example.movieCore.movie.bean.MovieBean;
import com.example.movieCore.movie.bean.MovieCompanyBean;
import com.example.movieCore.movie.bean.MovieGenreBean;
import com.example.movieCore.movie.mapperInterface.MovMovieMapper;
import com.example.movieCore.movie.vo.MovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class MovMovieServiceImpl {

    @Autowired
    private MovMovieMapper movMovieMapper;

    public ArrayList<MovieBean> selectMovieListAdmin(MovVo movVo) {
        return movMovieMapper.selectMovieListAdmin(movVo);
    }


    public int selectMovieListTotalCntAdmin(MovVo movVo) {
        return movMovieMapper.selectMovieListTotalCntAdmin(movVo);
    }

    public int updateMovieStateAdmin(MovVo movVo) {
        return movMovieMapper.updateMovieStateAdmin(movVo);
    }


    public ArrayList<MovieBean> selectMovieList(MovVo movVo) {
        return movMovieMapper.selectMovieList(movVo);
    }


    public int selectMovieListTotalCnt(MovVo movVo) {
        return movMovieMapper.selectMovieListTotalCnt(movVo);
    }

    public MovieBean selectMovieInfo(MovVo movVo) {
        return movMovieMapper.selectMovieInfo(movVo);
    }

    public ArrayList<MovieGenreBean> selectMovieGenreList(MovVo movVo) {
        return movMovieMapper.selectMovieGenreList(movVo);
    }

    public ArrayList<MovieCompanyBean> selectMovieCompanyList(MovVo movVo) {
        return movMovieMapper.selectMovieCompanyList(movVo);
    }
}
