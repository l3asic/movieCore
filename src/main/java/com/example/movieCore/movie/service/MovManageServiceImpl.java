package com.example.movieCore.movie.service;

import com.example.movieCore.movie.mapperInterface.MovManageMapper;
import com.example.movieCore.movie.vo.MovVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MovManageServiceImpl {

    @Autowired
    private MovManageMapper movManageMapper;


    public boolean insertMovieBean(MovVo movVo) {
        return movManageMapper.insertMovieBean(movVo);
    }
}
