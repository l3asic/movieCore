package com.example.movieCore.migMovie.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BatchConfig {

    private String batchName;

    private String targetDt;
    
    // 특정일자 배치 가능 여부
    private String dateBatchYn;

    private boolean batchRun;
    

    // 배치 자동/수동 구분값
    private String batchType;

}
