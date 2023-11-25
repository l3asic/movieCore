package com.example.movieCore.brd.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
public class BrdFolderBean {
    private String folId;

    private String memId;

    private String folName;

    private String parentFolder;

    private String folLoc;

    private int depth;

    private String state;

    private int odr;

    private Date createDt;

    private ArrayList<BrdBoardBean> boardBeanList;
}
