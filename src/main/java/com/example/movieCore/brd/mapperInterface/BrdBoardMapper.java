package com.example.movieCore.brd.mapperInterface;

import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.vo.BrdVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface BrdBoardMapper {

    public boolean createBoard(BrdVo brdVo);

    ArrayList<BrdFolderBean> selectAllFolderList();

    ArrayList<BrdBoardBean> selectAllBoardList();

    ArrayList<BrdBoardBean> selectBoardListByFolId(BrdVo brdVo);
}
