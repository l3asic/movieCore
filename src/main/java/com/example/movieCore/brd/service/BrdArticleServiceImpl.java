package com.example.movieCore.brd.service;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdReplyBean;
import com.example.movieCore.brd.mapperInterface.BrdArticleMapper;
import com.example.movieCore.brd.vo.BrdVo;
import com.example.movieCore.cmm.FileBean;
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

    public BrdArticleBean selectArticleDetail(BrdVo brdVo) {
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


    public void insertFileBeans(BrdVo brdVo) {
        for (FileBean fileBean : brdVo.getFileBeanList()) {
            brdArticleMapper.insertFileBean(fileBean);
        }
    }

    public void insertArticleFileMap(BrdVo brdVo) {
        for (FileBean fileBean : brdVo.getFileBeanList()) {
            brdArticleMapper.insertArticleFileMapping(brdVo.getArticleBean().getAtclId(), fileBean.getFileId());
        }
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

    public void updateArticleAdmin(BrdVo brdVo) {
        brdArticleMapper.updateArticleAdmin(brdVo);
    }

    public ArrayList<BrdReplyBean> selectReplyListAdmin(BrdVo brdVo) {
        return brdArticleMapper.selectReplyListAdmin(brdVo);
    }

    public void addArticleViewLog(BrdVo brdVo) {
        brdArticleMapper.addArticleViewLog(brdVo);
    }

    public void updateArticleViewCnt(BrdVo brdVo) {
        brdArticleMapper.updateArticleViewCnt(brdVo);
    }

    public BrdBoardBean selectBoardByBrdId(BrdVo brdVo) {
        return brdArticleMapper.selectBoardByBrdId(brdVo);
    }

    public ArrayList<BrdReplyBean> selectReplyList(BrdVo brdVo) {
        return brdArticleMapper.selectReplyList(brdVo);
    }

    public void insertReplyBean(BrdVo brdVo) {
        brdArticleMapper.insertReplyBean(brdVo);
    }

    public int updateReplyState(BrdVo brdVo) {
        return brdArticleMapper.updateReplyState(brdVo);
    }

    public int selectArticleReplCnt(BrdVo brdVo) {
        return brdArticleMapper.selectArticleReplCnt(brdVo);
    }

    public void updateArticleReplCnt(BrdVo brdVo) {
        brdArticleMapper.updateArticleReplCnt(brdVo);
    }


    public boolean atclUpdate(BrdVo brdVo) {
        return brdArticleMapper.atclUpdate(brdVo);
    }
}
