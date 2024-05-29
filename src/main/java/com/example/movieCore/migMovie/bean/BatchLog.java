package com.example.movieCore.migMovie.bean;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BatchLog {

    // 배치 명
    private String batchName;

    // 배치 시작시간
    private java.sql.Timestamp batchRunTime;

    // 배치 타입 (자동/수동)
    private String batchType;

    // 배치 실패 갯수
    private int batchFailCount;

    // 배치 오류 내용
    private String batchErrorText;

    // 배치 성공 여부
    private String batchStatus;

    // 배치 종료 시간
    private java.sql.Timestamp batchEndTime;

    // 배치 소요 시간
    private String batchDuration;



    // 소요 시간 계산 메소드
    public void calculateBatchDuration() {
        if (batchRunTime != null && batchEndTime != null) {
            long durationMillis = batchEndTime.getTime() - batchRunTime.getTime();
            this.batchDuration = formatDuration(durationMillis);
        } else {
            this.batchDuration = null;
        }
    }

    // 밀리초 단위 시간을 사람 읽을 수 있는 형식으로 변환하는 메소드
    private String formatDuration(long durationMillis) {
        long seconds = (durationMillis / 1000) % 60;
        long minutes = (durationMillis / (1000 * 60)) % 60;
        long hours = (durationMillis / (1000 * 60 * 60)) % 24;
        long days = (durationMillis / (1000 * 60 * 60 * 24));

        StringBuilder duration = new StringBuilder();
        if (days > 0) {
            duration.append(days).append(" days ");
        }
        if (hours > 0) {
            duration.append(hours).append(" hours ");
        }
        if (minutes > 0) {
            duration.append(minutes).append(" minutes ");
        }
        if (seconds > 0) {
            duration.append(seconds).append(" seconds");
        }
        return duration.toString().trim();
    }


}
