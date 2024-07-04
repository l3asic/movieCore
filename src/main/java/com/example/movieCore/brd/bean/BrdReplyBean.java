package com.example.movieCore.brd.bean;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;

@Getter
@Setter
public class BrdReplyBean implements Serializable {

    private String replId;
    private String atclId;
    private String content;
    private String memId;
    private String memName;
    private Timestamp createDt;
    private Timestamp updateDt;
    private String state;
    private int atclReplCnt;
}
