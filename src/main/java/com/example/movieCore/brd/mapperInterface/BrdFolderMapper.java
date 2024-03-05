package com.example.movieCore.brd.mapperInterface;

import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.vo.BrdVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface BrdFolderMapper {

    public boolean createFolder(BrdVo vo);


    ArrayList<BrdFolderBean> selectAllFolderList();

    int selectFolderListAdminTotalCnt(BrdVo brdVo);

    ArrayList<BrdFolderBean> selectFolderListAdmin(BrdVo brdVo);
}
