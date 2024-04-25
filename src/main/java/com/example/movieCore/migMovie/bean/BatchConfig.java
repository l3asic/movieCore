package com.example.movieCore.migMovie.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BatchConfig {

    private String batchName;

    private String targetDt;

    private boolean batchRun;

}
