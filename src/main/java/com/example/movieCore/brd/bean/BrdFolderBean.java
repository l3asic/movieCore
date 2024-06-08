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

    private String memName;

    private String folName;

    private String state;

    private int odr;

    private java.sql.Timestamp createDt;

    private String boardCnt;

    private ArrayList<BrdBoardBean> boardBeanList;
}
