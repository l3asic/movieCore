package com.example.movieCore.migMovie.scheldule;

import com.example.movieCore.migMovie.service.MigMovManageServiceImpl;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SchMovBoxOffice {

    private final MigMovManageServiceImpl movManageService;


    private boolean dailyBoxOfficeRun = false;

    public SchMovBoxOffice(MigMovManageServiceImpl movManageService) {
        this.movManageService = movManageService;
    }

    /**
     * 일일 박스 오피스 이관 배치 스케쥴러
     * */
    @Scheduled(cron = "0 0 23 * * *")
    public void batchDailyBoxOffice() {

        System.out.println("배치 동작 상태 확인");
        // 배치 동작 상태 확인
        dailyBoxOfficeRun = movManageService.dailyBoxOfficeRunCheck("batchDailyBoxOffice");

        if(dailyBoxOfficeRun){ // 배치 정상 동작 상태
            // 일일 박스오피스 이관 동작
            movManageService.syncDailyBoxOffice();
            System.out.println("배치 정상 동작");

        }else{
            // 배치 정지된 상태
            System.out.println("배치 정지 상태");
        }

    }
    
}