package com.example.movieCore.brd.vo;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdFolderBean;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Setter
@Getter
public class BrdVo {
    private BrdArticleBean articleBean;

    private BrdFolderBean folderBean;

    private BrdBoardBean boardBean;

    private ArrayList<BrdFolderBean> folderBeanList;

    private ArrayList<BrdBoardBean> boardBeanList;

    private ArrayList<BrdArticleBean> articleBeanList;
}
