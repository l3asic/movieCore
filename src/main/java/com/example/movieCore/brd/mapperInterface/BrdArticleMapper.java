package com.example.movieCore.brd.mapperInterface;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdReplyBean;
import com.example.movieCore.brd.vo.BrdVo;
import com.example.movieCore.cmm.FileBean;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface BrdArticleMapper {

    boolean atclRegistry(BrdVo brdVo);


    ArrayList<BrdArticleBean> selectArticleList(BrdVo brdVo);

    ArrayList<BrdArticleBean> searchArticle(BrdVo brdVo);

    BrdArticleBean selectArticleDetail(BrdVo brdVo);

    ArrayList<BrdBoardBean> selectBoardList(BrdVo brdVo);

    int selectArticleListTotalCnt(BrdVo brdVo);

    int deleteArticle(BrdVo brdVo);

    void insertFileBean(FileBean fileBean);
    void insertArticleFileMapping(@Param("atclId") String atclId, @Param("fileId") String fileId);

    int selectArticleListTotalCntAdmin(BrdVo brdVo);

    ArrayList<BrdArticleBean> selectArticleListAdmin(BrdVo brdVo);

    int updateArticleStateAdmin(BrdVo brdVo);

    void updateArticleAdmin(BrdVo brdVo);

    ArrayList<BrdReplyBean> selectReplyListAdmin(BrdVo brdVo);

    void addArticleViewLog(BrdVo brdVo);

    void updateArticleViewCnt(BrdVo brdVo);

    BrdBoardBean selectBoardByBrdId(BrdVo brdVo);

    ArrayList<BrdReplyBean> selectReplyList(BrdVo brdVo);

    void insertReplyBean(BrdVo brdVo);

    int updateReplyState(BrdVo brdVo);

    int selectArticleReplCnt(BrdVo brdVo);

    void updateArticleReplCnt(BrdVo brdVo);

    boolean atclUpdate(BrdVo brdVo);

    void deleteFileBean(BrdVo brdVo);

    void deleteArticleFileBeanMap(BrdVo brdVo);

    ArrayList<BrdArticleBean> selectHotArticle(BrdVo brdVo);
}
