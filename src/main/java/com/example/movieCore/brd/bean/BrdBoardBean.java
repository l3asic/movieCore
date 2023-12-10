package com.example.movieCore.brd.bean;

import com.example.movieCore.utils.Paging;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
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

    private ArrayList<BrdArticleBean> articleBeanList;


    /** 검색 조건 */
    private String schSelect;

    /** 검색 내용 */
    private String schText;

    /** 페이징 */
    private Paging paging;

}
