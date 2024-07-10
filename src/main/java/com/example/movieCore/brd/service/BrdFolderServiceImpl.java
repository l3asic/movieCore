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

    public int selectFolderListAdminTotalCnt(BrdVo brdVo) {
        return brdFolderMapper.selectFolderListAdminTotalCnt(brdVo);
    }

    public ArrayList<BrdFolderBean> selectFolderListAdmin(BrdVo brdVo) {
        return brdFolderMapper.selectFolderListAdmin(brdVo);
    }

    public int updateFolderStateAdmin(BrdVo brdVo) {
        return brdFolderMapper.updateFolderStateAdmin(brdVo);
    }

    public void updateFolderOrderAdmin(BrdFolderBean folderBean) {
        brdFolderMapper.updateFolderOrderAdmin(folderBean);
    }

    public int getMaxOdr() {
        return brdFolderMapper.getMaxOdr();
    }

    public void updateFolderName(BrdVo brdVo) {
        brdFolderMapper.updateFolderName(brdVo);
    }
}
