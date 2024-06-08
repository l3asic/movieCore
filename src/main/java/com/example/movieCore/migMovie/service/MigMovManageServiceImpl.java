package com.example.movieCore.migMovie.service;

import com.example.movieCore.migMovie.api.DataConverter;
import com.example.movieCore.migMovie.api.MigMovieApiClientImpl;
import com.example.movieCore.migMovie.bean.*;
import com.example.movieCore.migMovie.mapperInterface.MigMovManageMapper;
import com.example.movieCore.migMovie.vo.MigMovVo;
import com.example.movieCore.movie.bean.MovieBoxOfficeBean;
import com.example.movieCore.utils.MakeUUID;
import io.netty.util.internal.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;


@Service
public class MigMovManageServiceImpl {

    @Autowired
    private MigMovManageMapper migMovManageMapper;

    private final MigMovieApiClientImpl migMovieApiClientImpl = new MigMovieApiClientImpl();
    private final MakeUUID makeUUID = new MakeUUID();

    private final DataConverter dataConverter = new DataConverter();


    public void insertMovieBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieBean(movVo);
    }

    public void insertMovieInfoBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieInfoBean(movVo);
    }

    public void insertMovieCompanyBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieCompanyBean(movVo);
    }

    public void insertMoviePeopleBean(MigMovVo movVo) {
        migMovManageMapper.insertMoviePeopleBean(movVo);
    }

    public void insertMovieCompanyMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieCompanyMap(movVo);
    }

    public ArrayList<MigMoviePeopleBean> selectMoviePeopleList(MigMovVo movVo) {
        return migMovManageMapper.selectMoviePeopleList(movVo);
    }

    public void insertMoviePeopleInfoBean(MigMovVo movVo) {
        migMovManageMapper.insertMoviePeopleInfoBean(movVo);
    }

    public void insertMovieNationBean(MigMovVo movVo) {
        migMovManageMapper.insertMovieNationBean(movVo);
    }

    public void insertMovieNationMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieNationMap(movVo);
    }

    public String selectMovieNation(MigMovieNationBean migMovieNationBean) {
        return migMovManageMapper.selectMovieNation(migMovieNationBean);
    }

    public int checkTheCompany(MigMovVo movVo) {
        return migMovManageMapper.checkTheCompany(movVo);
    }

    public MigMovieGenreBean selectMovieGenre(String genreNm) {
        return migMovManageMapper.selectMovieGenre(genreNm);
    }

    public void insertMovieGenre(MigMovVo movVo) {
        migMovManageMapper.insertMovieGenre(movVo);
    }

    public void insertMovieGenreMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieGenreMap(movVo);
    }

    public int checkPeopleInfo(String peopleCd) {
        return migMovManageMapper.checkPeopleInfo(peopleCd);
    }

    public int callDBTest() {
       return migMovManageMapper.callDBTest();
    }

    public ArrayList<MigMoviePeopleBean> selectPeopleCdByNm(String peopleNm) {
        return migMovManageMapper.selectPeopleCdByNm(peopleNm);
    }

    public void insertMoviePeopleMap(MigMovVo movVo) {
        migMovManageMapper.insertMoviePeopleMap(movVo);
    }

    public ArrayList<MigMovieBean> selectMovieList() {
        return migMovManageMapper.selectMovieList();
    }

    public String selectDirector(MigMovVo movVo) {
        return migMovManageMapper.selectDirector(movVo);
    }

    public void updateURL(MigMovVo movVo) {
        migMovManageMapper.updateURL(movVo);
    }

    public void insertMovieFileMap(MigMovVo movVo) {
        migMovManageMapper.insertMovieFileMap(movVo);
    }

    public void insertFileBean(MigMovVo movVo) {
        migMovManageMapper.insertFileBean(movVo);
    }

    public int checkMovieCntByMovieCd(String movieCd) {
        return migMovManageMapper.checkMovieCntByMovieCd(movieCd);
    }

    public void insertBoxOffice(MigMovVo movVo) {
        migMovManageMapper.insertBoxOffice(movVo);
    }

    public void updateOpenDt(MigMovVo movVo) {
        migMovManageMapper.updateOpenDt(movVo);
    }


    public boolean dailyBoxOfficeRunCheck(String batchName) {
        return migMovManageMapper.dailyBoxOfficeRunCheck(batchName);
    }




    /**
     * 일일 박스오피스 이관
     * */
    public BatchLog syncDailyBoxOffice(MigMovVo movVo){

        MigMovieApiClientImpl movieApiClient = new MigMovieApiClientImpl();

        /** 배치 로그 */
        BatchLog batchLog = new BatchLog();
        // 배치명
        batchLog.setBatchName("batchDailyBoxOffice");
        // 동작시간
        batchLog.setBatchRunTime(new Timestamp(System.currentTimeMillis()));
        // 배치 자동/수동
        batchLog.setBatchType(movVo.getBatchConfig().getBatchType());
        // 실패 갯수
        batchLog.setBatchFailCount(0);
        // 오류 내용
        batchLog.setBatchErrorText("");
        // 배치 동작 상태
        batchLog.setBatchStatus("정상 동작");




        ArrayList<MovieBoxOfficeBean> boxOfficeBeanList = null;

        try {
            // 박스오피스 api 호출
            movVo = movieApiClient.callMovieBoxOfficeApi(movVo);

            boxOfficeBeanList =  movVo.getBoxOfficeBeanList();

            // 호출된 박스오피스 영화 없음
            if(boxOfficeBeanList.size() == 0){
                // 배치 동작 상태
                batchLog.setBatchStatus("실패");

                // 오류 내용
                String errorText =
                        "api 호출 오류 \n" +
                                "오류 내용 : 호출된 영화 갯수 0 " +"\n\n" ;
                batchLog.setBatchErrorText(batchLog.getBatchErrorText() + errorText);
            }

        }catch (Exception e){
            // 배치 동작 상태
            batchLog.setBatchStatus("실패");

            // 오류 내용
            String errorText =
                    "api 호출 오류 \n" +
                    "오류 내용 : "  + getStackTraceAsString(e) +"\n\n" ;

            // 문자열 길이를 200자로 제한
            if (errorText.length() > 200) {
                errorText = errorText.substring(0, 200);
            }

            batchLog.setBatchErrorText(batchLog.getBatchErrorText() + errorText);

            /** api 호출 실패시 배치 로그 강제 인서트 */

            // 배치 종료 시간 기록
            batchLog.setBatchEndTime(new Timestamp(System.currentTimeMillis()));

            // 소요시간 계산
            batchLog.calculateBatchDuration();

            // 배치로그 최종 디비 인서트
            migMovManageMapper.insertBatchLog(batchLog);

        }




        for (int i = 0; i < boxOfficeBeanList.size(); i++) {

            try {

                    movVo.setBoxOfficeBean(boxOfficeBeanList.get(i));
                    String movieCd = movVo.getBoxOfficeBean().getMovieCd();

                    int checkCnt = 0;

                    // 기존 디비에서 영화 확인
                    checkCnt = checkMovieCntByMovieCd(movieCd);

                    // 기존디비에 없는 영화의 경우
                    if(checkCnt==0){
                        // 해당 영화 정보(1개) 이관
                        migOneMovie(movVo.getBoxOfficeBean());
                    }

                    // 개봉일 openDt 정보 업데이트
                    updateOpenDt(movVo);

                // 박스오피스 테이블 인서트
                insertBoxOffice(movVo);

            }catch (Exception e){
                /** 오류시 배치 로그 기록 */
                // 배치 동작 상태
                batchLog.setBatchStatus("실패");
                // 실패 갯수
                batchLog.setBatchFailCount(batchLog.getBatchFailCount()+1);
                // 실패 내용
                String errorText =
                        "오류 영화 코드 : " + boxOfficeBeanList.get(i).getMovieCd()+"\n" +
                        "오류 영화 내용 : " + boxOfficeBeanList.get(i).getMovieNm()+"\n" +
                        "오류 내용 : "  + getStackTraceAsString(e) +"\n\n" ;

                // 문자열 길이를 200자로 제한
                if (errorText.length() > 300) {
                    errorText = errorText.substring(0, 300);
                }

                batchLog.setBatchErrorText(batchLog.getBatchErrorText() + errorText);

            }
        }


        /** 배치 로그 인서트 */

        // 배치 종료 시간 기록
        batchLog.setBatchEndTime(new Timestamp(System.currentTimeMillis()));

        // 소요시간 계산
        batchLog.calculateBatchDuration();
        
        // 배치로그 최종 디비 인서트
        migMovManageMapper.insertBatchLog(batchLog);


        return  batchLog;



    }



    /** 오류 내용 편집 */
    public String getStackTraceAsString(Exception e) {
        StringWriter stringWriter = new StringWriter();
        PrintWriter printWriter = new PrintWriter(stringWriter);
        e.printStackTrace(printWriter);
        return stringWriter.toString();
    }

    /** 정지된 배치상태 기록 */
    public void insertStopBatchLog(BatchLog batchLog) {
        migMovManageMapper.insertBatchLog(batchLog);
    }






    /* 영화 한개 이관 메소드 */
    public void migOneMovie(MovieBoxOfficeBean boxOfficeBean) throws Exception {


        // 영화 한개 정보 api 조회
        MigMovVo movVo = migMovieApiClientImpl.callOneMovieApi(boxOfficeBean);

        // 데이터 컨버트
        movVo.setMigMovieBeanList(dataConverter.convertToMovieBeanList((List) movVo.getMigMovieBeanList()));


        // <디비 인서트>
        // 한개 정보 세팅
        movVo.setMigMovieBean(movVo.getMigMovieBeanList().get(0));


        // 제작사 코드들 추출 및 매핑 테이블 인서트
        if(movVo.getMigMovieBean().getCompanys() != null && movVo.getMigMovieBean().getCompanys().size() >0){
            for (int i = 0; i < movVo.getMigMovieBean().getCompanys().size(); i++) {
                // 영화에서 회사 코드 추출
                LinkedHashMap<String, Object> companyMap = movVo.getMigMovieBean().getCompanys().get(i);
                String companyCd = (String) companyMap.get("companyCd");
                movVo.getMigMovieBean().setCompanyCd(companyCd);

                // 회사 코드 실재 확인
                int companyCnt = 0;
                companyCnt = checkTheCompany(movVo);

                if(companyCnt>0){
                    insertMovieCompanyMap(movVo);
                }else {
                    System.out.println("영화에 맞는 회사가 디비에 없음?");
                }

            }
        }

        // 개봉일 없을시 예외 처리
        if (movVo.getMigMovieBean().getOpenDt() == null || movVo.getMigMovieBean().getOpenDt().isEmpty() || movVo.getMigMovieBean().getOpenDt().equals(""))  {
            movVo.getMigMovieBean().setOpenDt(null);
        }


        // 영화 상세 정보 api 호출
        movVo.setMigMovieInfoBean(migMovieApiClientImpl.callMovieInfoApi(movVo.getMigMovieBean().getMovieCd()));
        // 영화 상세정보가 없을경우
        if(movVo.getMigMovieInfoBean() == null || StringUtil.isNullOrEmpty(movVo.getMigMovieInfoBean().getMovieCd())){
            movVo.setMigMovieInfoBean(new MigMovieInfoBean());
            movVo.getMigMovieInfoBean().setMovieCd(movVo.getMigMovieBean().getMovieCd());
        }
        // 영화 상세정보 개봉일 없을시 예외 처리
        if (movVo.getMigMovieInfoBean().getOpenDt() == null || movVo.getMigMovieInfoBean().getOpenDt().isEmpty() || movVo.getMigMovieInfoBean().getOpenDt().equals(""))  {
            movVo.getMigMovieInfoBean().setOpenDt(null);
        }

        // 제작 국가 (리스트) 매핑 이관
        List<MigMovieNationBean> nationsList = movVo.getMigMovieInfoBean().getNations();
        if(nationsList == null || nationsList.isEmpty()) {
            System.out.println("제작 국가가 비었음?");
        }else{
            MigMovieNationBean migMovieNationBean = new MigMovieNationBean();

            for (int k = 0; k < movVo.getMigMovieInfoBean().getNations().size(); k++) {
                LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getNations().get(k);

                // 제작 국가명 추출
                migMovieNationBean.setKorNm((String)dataMap.get("nationNm"));

                // 제작 국가 코드 조회
                migMovieNationBean.setNationCd(selectMovieNation(migMovieNationBean));

                if(!StringUtil.isNullOrEmpty(migMovieNationBean.getNationCd())){
                    migMovieNationBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());
                    movVo.setMigMovieNationBean(migMovieNationBean);

                    // 영화 <=> 제작국가 매핑 인서트
                    insertMovieNationMap(movVo);
                }else {
                    System.out.println("검색된 제작국가 없음 ");
                }
            }
        }

        // 상영등급
        if(movVo.getMigMovieInfoBean().getShowTypes() != null && movVo.getMigMovieInfoBean().getShowTypes().size() > 0){
            String showTypeGroupNm = "";
            String showTypeNm = "";

            for (int k = 0; k < movVo.getMigMovieInfoBean().getShowTypes().size(); k++) {
                LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getShowTypes().get(k);
                if(k>0){
                    if(!StringUtil.isNullOrEmpty(showTypeGroupNm) && !showTypeGroupNm.equals(""))showTypeGroupNm += ",";
                    if(!StringUtil.isNullOrEmpty(showTypeNm) && !showTypeNm.equals(""))showTypeNm += ",";
                }

                showTypeGroupNm += (String) dataMap.get("showTypeGroupNm");
                showTypeNm += (String) dataMap.get("showTypeNm");

            }
            movVo.getMigMovieInfoBean().setShowTypeGroupNm(showTypeGroupNm);
            movVo.getMigMovieInfoBean().setShowTypeNm(showTypeNm);

        }

        if(movVo.getMigMovieInfoBean().getAudits() != null && movVo.getMigMovieInfoBean().getAudits().size() > 0){
            String auditNo = "";
            String watchGradeNm = "";

            for (int k = 0; k < movVo.getMigMovieInfoBean().getAudits().size(); k++) {
                LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getAudits().get(k);
                if(k>0){
                    if(!StringUtil.isNullOrEmpty(auditNo) && !auditNo.equals(""))auditNo += ",";
                    if(!StringUtil.isNullOrEmpty(watchGradeNm) && !watchGradeNm.equals(""))watchGradeNm += ",";
                }

                auditNo += (String) dataMap.get("auditNo");
                watchGradeNm += (String) dataMap.get("watchGradeNm");

            }
            movVo.getMigMovieInfoBean().setAuditNo(auditNo);
            movVo.getMigMovieInfoBean().setWatchGradeNm(watchGradeNm);

        }

        // 장르
        if(movVo.getMigMovieInfoBean().getGenres() != null && movVo.getMigMovieInfoBean().getGenres().size() > 0){
            for (int k = 0; k < movVo.getMigMovieInfoBean().getGenres().size(); k++) {
                LinkedHashMap<String, Object> dataMap = (LinkedHashMap<String, Object>) movVo.getMigMovieInfoBean().getGenres().get(k);
                String genreNm = (String) dataMap.get("genreNm");

                // 장르 검색
                MigMovieGenreBean migMovieGenreBean = selectMovieGenre(genreNm);

                // 장르 없는 경우 장르 인서트
                if(migMovieGenreBean == null){
                    migMovieGenreBean = new MigMovieGenreBean();
                    // 장르 코드 새로 생성
                    String genreCd = makeUUID.makeShortUUID("GR");
                    migMovieGenreBean.setGenreCd(genreCd);

                    migMovieGenreBean.setGenreNm(genreNm);
                    migMovieGenreBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());
                    movVo.setMigMovieGenreBean(migMovieGenreBean);

                    insertMovieGenre(movVo);

                }

                // 영화 <=> 장르 매핑 인서트
                migMovieGenreBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());
                movVo.setMigMovieGenreBean(migMovieGenreBean);

                insertMovieGenreMap(movVo);
            } // 장르 for

        }

        // 영화인
        // * 감독 매핑 인서트
        for (int l = 0; movVo.getMigMovieInfoBean().getDirectors() != null && l < movVo.getMigMovieInfoBean().getDirectors().size(); l++) {

            String peopleNm = (String) ((LinkedHashMap) movVo.getMigMovieInfoBean().getDirectors().get(l)).get("peopleNm");

            // 감독이름으로 영화인 테이블에서 peopleCd 조회
            ArrayList<MigMoviePeopleBean> directorBeanList = selectPeopleCdByNm(peopleNm);

            if(directorBeanList != null && directorBeanList.size()>0){
                for (int i = 0; i < directorBeanList.size(); i++) {

                    // 검색된 사람이 한명이면 바로 할당
                    if(directorBeanList.size() == 1) {
                        movVo.setMigMoviePeopleBean(directorBeanList.get(i));

                        break;

                        // 필모에 영화명이 있다면 할당
                    } else if (directorBeanList.get(i).getFilmoNames() != null
                            && directorBeanList.get(i).getFilmoNames().indexOf(movVo.getMigMovieBean().getMovieNm()) > -1
                    ) {
                        movVo.setMigMoviePeopleBean(directorBeanList.get(i));

                        break;

                        // 감독이면 할당 (동명이인 감독 두명일수도)
                    }else if(directorBeanList.get(i).getRepRoleNm().equals("감독")){
                        movVo.setMigMoviePeopleBean(directorBeanList.get(i));

                        break;

                    }

                } // for i

                // 영화 감독 매핑 인서트
                try {
                    if(movVo.getMigMoviePeopleBean() != null){
                        insertMoviePeopleMap(movVo);
                        movVo.setMigMoviePeopleBean(null);
                    }

                }catch (DuplicateKeyException e){

                }
            }else {
                System.out.println("검색된 감독이 없음?");
            }
        }


        // * 배우 매핑 인서트
        for (int l = 0; l < movVo.getMigMovieInfoBean().getActors().size(); l++) {

            String peopleNm = (String) ((LinkedHashMap) movVo.getMigMovieInfoBean().getActors().get(l)).get("peopleNm");

            // 배우 이름으로 영화인 테이블에서 peopleCd 조회
            ArrayList<MigMoviePeopleBean> actorBeanList = selectPeopleCdByNm(peopleNm);

            if(actorBeanList != null && actorBeanList.size()>0){
                for (int i = 0; i < actorBeanList.size(); i++) {

                    // 검색된 사람이 한명이면 바로 할당
                    if(actorBeanList.size() == 1) {
                        movVo.setMigMoviePeopleBean(actorBeanList.get(i));

                        break;

                        // 필모에 영화명이 있다면 할당
                    } else if (actorBeanList.get(i).getFilmoNames() != null
                            && actorBeanList.get(i).getFilmoNames().indexOf(movVo.getMigMovieBean().getMovieNm()) > -1
                    ) {
                        movVo.setMigMoviePeopleBean(actorBeanList.get(i));

                        break;

                        // 배우면 할당 (동명이인 배우 두명일수도)
                    }else if(actorBeanList.get(i).getRepRoleNm().equals("배우")){
                        movVo.setMigMoviePeopleBean(actorBeanList.get(i));

                        break;

                    }

                } // for i

                // 영화 배우 매핑 인서트
                try {
                    if(movVo.getMigMoviePeopleBean() != null){
                        insertMoviePeopleMap(movVo);
                        movVo.setMigMoviePeopleBean(null);
                    }
                }catch (DuplicateKeyException e){

                }
            }else {
                System.out.println("검색된 배우가 없음?");
            }

        }

        // 영화 목록(정보1개) 디비 인서트
        insertMovieBean(movVo);

        // 영화 상세정보 디비 인서트
        insertMovieInfoBean(movVo);





        /** 영화 포스터, 줄거리, 예고편 추가 이관 */
            // 1.5 감독 명 추가조회
//            movVo.setMigMovieBean(movVo.getMigMovieBeanList().get(i));
//            String directorNm = selectDirector(movVo);

//            movVo.getMigMovieBeanList().get(i).setPeopleNm(directorNm);

            // 2. 영화명과 감독명 api로 전달 및 포스터, 줄거리, 예고편 데이터 리턴
            MigMovieApiClientImpl movieApiClient = new MigMovieApiClientImpl();
            List<MigKMDBApiBean> migKMDBApiBeans = movieApiClient.callKMDBApi(movVo);


            // 3. 디비에 포스터, 줄거리, 예고편 데이터 업데이트
            if(migKMDBApiBeans != null && migKMDBApiBeans.size()>0){
                MigKMDBApiBean migKMDBApiBean = migKMDBApiBeans.get(0);

                // migKMDBApiBean  movieCd 세팅
                migKMDBApiBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());

                // 줄거리
                MigMovieInfoBean movieInfoBean = new MigMovieInfoBean();

                // 줄거리 바이트 제한
                String plot = migKMDBApiBean.getPlot();
                if (plot != null && plot.length() > 800) {
                    // 문자열이 800바이트를 넘으면 800바이트까지 자르기
                    plot = plot.substring(0, plot.offsetByCodePoints(0, 800));
                }
                movieInfoBean.setPlot(plot);

                // movieInfoBean  movieCd 세팅
                movieInfoBean.setMovieCd(movVo.getMigMovieBean().getMovieCd());

                // 예고편 url
                if(migKMDBApiBean.getVodUrl() != null && !migKMDBApiBean.getVodUrl().equals("")){
                    movieInfoBean.setPreviewUrl(migKMDBApiBean.getVodUrl());
                }

                movVo.setMigMovieInfoBean(movieInfoBean);

                // 줄거리, 영화 예고편 갱신
                if (movieInfoBean.getPlot() != null || movieInfoBean.getPreviewUrl() != null){
                    updateURL(movVo);
                }

                // 영화 포스터 갱신
                if(migKMDBApiBean.getPosterUrl() != null && !migKMDBApiBean.getPosterUrl().equals("") ){
                    // 데이터 가공
                    movieInfoBean.setPosterUrl(migKMDBApiBean.getPosterUrl());
                    movieInfoBean.setFileId(makeUUID.makeLongUUID("CF"));

                    // 매핑인서트
                    insertMovieFileMap(movVo);

                    // 파일 테이블 인서트
                    insertFileBean(movVo);



                }


            }









    }


    public boolean BoxOfficeBatchActiveUpdate(MigMovVo movVo) {
        return migMovManageMapper.BoxOfficeBatchActiveUpdate(movVo);
    }

    public ArrayList<BatchLog> selectBatchLog() {
        return migMovManageMapper.selectBatchLog();
    }
}
