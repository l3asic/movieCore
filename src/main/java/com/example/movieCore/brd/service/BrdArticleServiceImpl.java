package com.example.movieCore.brd.service;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.mapperInterface.BrdArticleMapper;
import com.example.movieCore.brd.vo.BrdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BrdArticleServiceImpl {

    @Autowired
    private BrdArticleMapper brdArticleMapper;

    public boolean atclRegistry(BrdVo brdVo) {

        return brdArticleMapper.atclRegistry(brdVo);
    }


    public ArrayList<BrdArticleBean> selectArticleList(BrdVo brdVo) {

        return brdArticleMapper.selectArticleList(brdVo);
    }

    public ArrayList<BrdArticleBean> searchArticle(BrdVo brdVo) {
        return brdArticleMapper.searchArticle(brdVo);
    }
}
