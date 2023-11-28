package com.example.movieCore.movie.mapperInterface;

import com.example.movieCore.movie.vo.MovVo;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface MovManageMapper {

    void insertMovieBean(MovVo movVo);

    void insertMovieInfoBean(MovVo movVo);

    void insertMovieCompanyBean(MovVo movVo);
}
