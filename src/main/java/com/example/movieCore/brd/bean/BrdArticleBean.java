package com.example.movieCore.brd.bean;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;

@Getter
@Setter
public class BrdArticleBean implements Serializable {

    private String atclId;

    private String brdId;

    private String brdName;

    private String memId;

    private String subject;

    private String content;

    private int viewCnt;

    private java.sql.Timestamp createDt;

    private java.sql.Timestamp updateDt;

    private java.sql.Timestamp expireDt;

    private String expireYn;

    private String state;

    private int atclReplCnt;


    /** 작성자명 */
    private String memName;

    /** 폴더 리스트 */
    private ArrayList<BrdFolderBean> folderBeanList;

    /** 댓글 리스트 */
    private ArrayList<BrdReplyBean> replyBeanList;

}
