package com.example.movieCore.migMovie.scheldule;

import com.example.movieCore.migMovie.bean.BatchConfig;
import com.example.movieCore.migMovie.bean.BatchLog;
import com.example.movieCore.migMovie.service.MigMovManageServiceImpl;
import com.example.movieCore.migMovie.vo.BatchVo;
import com.example.movieCore.migMovie.vo.MigMovVo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class BatchSchelduler {

    private final MigMovManageServiceImpl movManageService;


    private boolean batchDailyBoxOfficeRun = false;

    private boolean batchExpireArticleRun = false;

    public BatchSchelduler(MigMovManageServiceImpl movManageService) {
        this.movManageService = movManageService;
    }

    /**
     * 일일 박스 오피스 이관 배치 스케쥴러
     * */
    @Scheduled(cron = "0 0 23 * * *")
    public void batchDailyBoxOffice() {

        MigMovVo movVo = new MigMovVo();


        // 배치 동작 상태 확인
        batchDailyBoxOfficeRun = movManageService.batchRunCheckByName("batchDailyBoxOffice");

        if(batchDailyBoxOfficeRun){ // 배치 정상 동작 상태

            movVo.setBatchConfig(new BatchConfig());
            movVo.getBatchConfig().setBatchType("자동");

            // 일일 박스오피스 이관 동작
            movManageService.syncDailyBoxOffice(movVo);
        }else{
            // 배치 정지된 상태

            BatchLog batchLog = new BatchLog();
            // 배치명
            batchLog.setBatchName("batchDailyBoxOffice");
            // 동작시간
            batchLog.setBatchRunTime(new Timestamp(System.currentTimeMillis()));
            // 배치 자동/수동
            batchLog.setBatchType("자동");
            // 실패 갯수
            batchLog.setBatchFailCount(0);
            // 오류 내용
            batchLog.setBatchErrorText("");
            // 배치 동작 상태
            batchLog.setBatchStatus("정지 상태");
            // 배치 종료 시간 기록
            batchLog.setBatchEndTime(new Timestamp(System.currentTimeMillis()));
            // 소요시간 계산
            batchLog.calculateBatchDuration();

            // 배치로그 최종 디비 인서트
            movManageService.insertStopBatchLog(batchLog);
            
        }

    }







    /**
     * 게시글 만료 배치 스케줄러
     * */
    @Scheduled(cron = "0 1 0 * * *")
    public void batchExpireArticle() {
        BatchVo batchVo = new BatchVo();
        batchVo.setBatchConfig(new BatchConfig());

        batchVo.getBatchConfig().setBatchName("batchExpireArticle");
        batchVo.getBatchConfig().setBatchType("자동");


        // 배치 동작 상태 확인
        batchExpireArticleRun = movManageService.batchRunCheckByName("batchExpireArticle");

        if(batchExpireArticleRun){
            movManageService.syncExpireArticle(batchVo);

        }else{
            // 배치 정지된 상태

            batchVo.setBatchLog(new BatchLog());
            // 배치명
            batchVo.getBatchLog().setBatchName("batchExpireArticle");
            // 동작시간
            batchVo.getBatchLog().setBatchRunTime(new Timestamp(System.currentTimeMillis()));
            // 배치 자동/수동
            batchVo.getBatchLog().setBatchType("자동");
            // 실패 갯수
            batchVo.getBatchLog().setBatchFailCount(0);
            // 오류 내용
            batchVo.getBatchLog().setBatchErrorText("");
            // 배치 동작 상태
            batchVo.getBatchLog().setBatchStatus("정지 상태");
            // 배치 종료 시간 기록
            batchVo.getBatchLog().setBatchEndTime(new Timestamp(System.currentTimeMillis()));
            // 소요시간 계산
            batchVo.getBatchLog().calculateBatchDuration();

            // 배치로그 최종 디비 인서트
            movManageService.insertStopBatchLog(batchVo.getBatchLog());

        }



    }
    
}
