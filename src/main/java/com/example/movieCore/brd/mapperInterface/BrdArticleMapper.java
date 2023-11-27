package com.example.movieCore.brd.mapperInterface;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.vo.BrdVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface BrdArticleMapper {

    boolean atclRegistry(BrdVo brdVo);


    ArrayList<BrdArticleBean> selectArticleList(BrdVo brdVo);

}
