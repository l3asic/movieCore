package com.example.movieCore.brd.service;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
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

    public ArrayList<BrdArticleBean> selectArticleDetail(BrdVo brdVo) {
        return brdArticleMapper.selectArticleDetail(brdVo);
    }

    public ArrayList<BrdBoardBean> selectBoardList(BrdVo brdVo) {
        return brdArticleMapper.selectBoardList(brdVo);
    }

    public int selectArticleListTotalCnt(BrdVo brdVo) {
        return brdArticleMapper.selectArticleListTotalCnt(brdVo);
    }

    public int deleteArticle(BrdVo brdVo) {
        return brdArticleMapper.deleteArticle(brdVo);
    }

    public void insertFileBean(BrdVo brdVo) {
        brdArticleMapper.insertFileBean(brdVo);
    }

    public void insertArticleFileMap(BrdVo brdVo) {
        brdArticleMapper.insertArticleFileMap(brdVo);
    }

    public int selectArticleListTotalCntAdmin(BrdVo brdVo) {
        return brdArticleMapper.selectArticleListTotalCntAdmin(brdVo);
    }


    public ArrayList<BrdArticleBean> selectArticleListAdmin(BrdVo brdVo) {
        return brdArticleMapper.selectArticleListAdmin(brdVo);
    }


    public int updateArticleStateAdmin(BrdVo brdVo) {
        return brdArticleMapper.updateArticleStateAdmin(brdVo);
    }
}
