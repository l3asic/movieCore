package com.example.movieCore.brd.mapperInterface;

import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.vo.BrdVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface BrdBoardMapper {

    public boolean createBoard(BrdVo brdVo);

    ArrayList<BrdFolderBean> selectAllFolderBoardList();

    ArrayList<BrdBoardBean> selectAllBoardList();

    int selectBoardListAdminTotalCnt(BrdVo brdVo);

    ArrayList<BrdFolderBean> selectBoardListAdmin(BrdVo brdVo);

    int updateBoardStateAdmin(BrdVo brdVo);

    void updateBoardOrderAndFolderAdmin(BrdBoardBean boardBean);

    void updateBoard(BrdVo brdVo);

    int getMaxBoardOdr(BrdBoardBean boardBean);

    void insertFileBean(BrdVo brdVo);

    void insertFileBeanMap(BrdVo brdVo);
}
