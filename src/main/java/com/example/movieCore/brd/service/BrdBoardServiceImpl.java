package com.example.movieCore.brd.service;

import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.mapperInterface.BrdBoardMapper;
import com.example.movieCore.brd.vo.BrdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BrdBoardServiceImpl {

    @Autowired
    private BrdBoardMapper brdBoardMapper;


    public boolean createBoard(BrdVo brdVo) {

        return brdBoardMapper.createBoard(brdVo);
    }


    public ArrayList<BrdFolderBean> selectAllFolderList() {

        return brdBoardMapper.selectAllFolderList();

    }

    public ArrayList<BrdBoardBean> selectAllBoardList() {
        return brdBoardMapper.selectAllBoardList();
    }

    public ArrayList<BrdBoardBean> selectBoardListByFolId(BrdVo brdVo) {
        return brdBoardMapper.selectBoardListByFolId(brdVo);
    }
}
