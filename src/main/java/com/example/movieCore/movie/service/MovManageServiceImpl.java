package com.example.movieCore.movie.service;

import com.example.movieCore.movie.mapperInterface.MovManageMapper;
import com.example.movieCore.movie.vo.MovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MovManageServiceImpl {

    @Autowired
    private MovManageMapper movManageMapper;


    public void insertMovieBean(MovVo movVo) {
        movManageMapper.insertMovieBean(movVo);
    }

    public void insertMovieInfoBean(MovVo movVo) {
        movManageMapper.insertMovieInfoBean(movVo);
    }

    public void insertMovieCompanyBean(MovVo movVo) {
        movManageMapper.insertMovieCompanyBean(movVo);
    }

    public void insertMoviePeopleBean(MovVo movVo) {
        movManageMapper.insertMoviePeopleBean(movVo);
    }
}
