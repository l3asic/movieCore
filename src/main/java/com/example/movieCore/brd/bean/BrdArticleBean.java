package com.example.movieCore.brd.bean;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class BrdArticleBean implements Serializable {
    private String atclId;

    private String brdId;

    private String memId;

    private String subject;

    private String content;

    private int viewCnt;

    private Date createDt;

    private Date updateDt;

    private Date expireDt;

    private String expireYn;

    private String state;

    private int atclReplCnt;


    /** 작성자명 */
    private String memName;
    /** 폴더코드번호 및 폴더명 */
    private String folId;
    private String folName;
    /** 게시판명 */
    private String brdName;

}
