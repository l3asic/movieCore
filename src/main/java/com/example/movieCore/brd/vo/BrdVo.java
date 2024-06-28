package com.example.movieCore.brd.vo;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.bean.BrdReplyBean;
import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.movie.bean.SearchBean;
import com.example.movieCore.utils.Paging;
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

    private ArrayList<BrdReplyBean> replyBeanList;

    /** 페이징 */
    private Paging paging;

    /** 페이지 이동시 새페이지 번호 */
    private int newPage;

    private SearchBean searchBean;

    /** 파일 빈 */
    private FileBean fileBean;

    private ArrayList<FileBean> fileBeanList;


    /** 삭제/ 변경 용 모드 */
    private String mode;

}
