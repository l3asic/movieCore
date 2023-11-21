package com.example.movieCore.brd.bean;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class BrdBoardBean {
    private String brdId;

    private String folId;

    private String brdName;

    private String brdComment;

    private String memId;

    private String state;

    private int odr;

    private Date createDt;

    private String noticeYn;

    private String imgUploadYn;

    private String fileLimit;

    private String fileCntLimit;

    private String replYn;

}
