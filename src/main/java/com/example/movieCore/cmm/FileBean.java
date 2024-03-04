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



}
