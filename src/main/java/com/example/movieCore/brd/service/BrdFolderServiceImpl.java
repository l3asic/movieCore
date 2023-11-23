package com.example.movieCore.brd.service;

import com.example.movieCore.brd.mapperInterface.BrdFolderMapper;
import com.example.movieCore.brd.vo.BrdVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BrdFolderServiceImpl {

    @Autowired
    private BrdFolderMapper brdFolderMapper;


    public boolean createFolder(BrdVo vo) {

        return brdFolderMapper.createFolder(vo);
    }


}
