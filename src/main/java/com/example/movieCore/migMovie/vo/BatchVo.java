package com.example.movieCore.migMovie.vo;

import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.movie.bean.MovieBoxOfficeBean;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class BatchVo {

    


    /** 배치 설정 */
    private BatchConfig batchConfig;


    /** 배치 설정 리스트 */
    private ArrayList<BatchConfig> batches;

    /** 배치 로그 리스트 */
    private ArrayList<BatchLog> BatchLogList;






}
