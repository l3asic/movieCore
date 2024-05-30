package com.example.movieCore.migMovie.scheldule;

import com.example.movieCore.migMovie.bean.BatchConfig;
import com.example.movieCore.migMovie.bean.BatchLog;
import com.example.movieCore.migMovie.service.MigMovManageServiceImpl;
import com.example.movieCore.migMovie.vo.MigMovVo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

@Component
public class SchMovBoxOffice {

    private final MigMovManageServiceImpl movManageService;


    private boolean batchDailyBoxOfficeRun = false;

    public SchMovBoxOffice(MigMovManageServiceImpl movManageService) {
        this.movManageService = movManageService;
    }

    /**
     * 일일 박스 오피스 이관 배치 스케쥴러
     * */
    @Scheduled(cron = "0 0 23 * * *")
    public void batchDailyBoxOffice() {

        MigMovVo movVo = new MigMovVo();


        // 배치 동작 상태 확인
        batchDailyBoxOfficeRun = movManageService.dailyBoxOfficeRunCheck("batchDailyBoxOffice");

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
    
}
