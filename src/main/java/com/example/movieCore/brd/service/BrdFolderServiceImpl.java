package com.example.movieCore.brd.service;

import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.mapperInterface.BrdFolderMapper;
import com.example.movieCore.brd.vo.BrdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class BrdFolderServiceImpl {

    @Autowired
    private BrdFolderMapper brdFolderMapper;


    public boolean createFolder(BrdVo vo) {

        return brdFolderMapper.createFolder(vo);
    }


    public ArrayList<BrdFolderBean> selectAllFolderList() {
        return brdFolderMapper.selectAllFolderList();
    }
}
