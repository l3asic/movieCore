package com.example.movieCore.brd.bean;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.utils.Paging;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class BrdBoardBean {

    private String brdId;

    private String folId;

    private String folName;

    private String brdName;

    private String brdComment;

    private String memId;

    private String memName;

    private String state;

    private int odr;

    private java.sql.Timestamp createDt;

    private String noticeYn;

    private String imgUploadYn;

    private String fileLimit;

    private String fileCntLimit;

    private String replYn;

    private ArrayList<BrdArticleBean> articleBeanList;

    private String atclCnt;


    /** 검색 조건 */
    private String schSelect;

    /** 검색 내용 */
    private String schText; 
   
    /** 페이징 */
    private Paging paging;

    /** 정렬 조건 */
    private String sortKey;
    private String sortOdr;

    /** 배너 이미지 */
    private FileBean fileBean;

    private boolean selected;

}
