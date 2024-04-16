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
    @Scheduled(cron = "*/10 * * * * *")
    public void batchDailyBoxOffice() {
        // 실행할 메소드 내용 작성
        System.out.println(" *** 배치 검사 시작 ***\n");
        dailyBoxOfficeRun = movManageService.dailyBoxOfficeRunCheck("batchDailyBoxOffice");
        if(dailyBoxOfficeRun){
            System.out.println(" * 배치 동작 확인 * ");
        }else{
            System.out.println(" * 배치 정지 *");
        }

    }
    
}
