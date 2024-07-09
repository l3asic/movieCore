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

    private boolean batchWeeklyBoxOfficeRun = false;

    private boolean batchExpireArticleRun = false;

    public BatchSchelduler(MigMovManageServiceImpl movManageService) {
        this.movManageService = movManageService;
    }

    /**
     * 일일 박스 오피스 이관 배치 스케쥴러
     * 매일 23:00 작동
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
     * 주간 박스 오피스 이관 배치 스케쥴러
     * 매주 월요일 01:05 작동
     * */
    @Scheduled(cron = "0 5 1 * * MON")
    public void batchWeeklyBoxOffice() {

        MigMovVo movVo = new MigMovVo();


        // 배치 동작 상태 확인
        batchWeeklyBoxOfficeRun = movManageService.batchRunCheckByName("batchWeeklyBoxOffice");

        if(batchWeeklyBoxOfficeRun){ // 배치 정상 동작 상태

            movVo.setBatchConfig(new BatchConfig());
            movVo.getBatchConfig().setBatchType("자동");

            // 일일 박스오피스 이관 동작
            movManageService.syncWeeklyBoxOffice(movVo);
        }else{
            // 배치 정지된 상태

            BatchLog batchLog = new BatchLog();
            // 배치명
            batchLog.setBatchName("batchWeeklyBoxOffice");
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
     * 매일  01:00 작동
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
