package com.example.movieCore.cmm;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
public class FileBean {

    private String fileId;
    private String module;
    private String fileName;
    private String localName;
    private String fileExt;
    private String url;
    private String volume;
    private Date createDt;
    private String src;


    /** 영화 모듈용 컬럼 */
    private String role;
    private Date mapDt;


    /** 멤버 모듈용 컬럼 */
    private String profileIdx;



}
