package com.example.movieCore.movie.controller;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.vo.LoginMemberVo;
import com.example.movieCore.movie.bean.*;
import com.example.movieCore.movie.service.MovMovieServiceImpl;
import com.example.movieCore.movie.vo.MovVo;
import com.example.movieCore.utils.MakeFileBean;
import com.example.movieCore.utils.Paging;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;


@Controller
@RequiredArgsConstructor
public class MovMovieController {

    private final MovMovieServiceImpl movieService;




    /** 관리자 모듈 - 영화 목록 조회 */
    @PostMapping(value = "/selectMovieListAdmin")
    @ResponseBody
    public Map<String, Object> selectMovieListAdmin(MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();


        try {

            movVo.setPaging(new Paging());
            movVo.getPaging().setTotalItems(movieService.selectMovieListTotalCntAdmin(movVo));

            // 페이지 이동시
            if(movVo.getNewPage() != 0){
                // 페이지 이동 조회시 (setCurrentPage 로 페이징변수 갱신)
                movVo.getPaging().setCurrentPage(movVo.getNewPage());
            }

            movVo.setMovieBeanList(movieService.selectMovieListAdmin(movVo));
            resMap.put("movVo", movVo);
            successResult = true;

        }catch (Exception e){

        }


        resMap.put("successResult", successResult);
        return resMap;

    }



    /** 관리자 모듈 - 영화 상태값 정상/삭제로 변경 */
    @PostMapping(value = "/updateMovieStateAdmin")
    @ResponseBody
    public Map<String, Object> updateMovieStateAdmin(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        String successMsg = "";
        Map<String, Object> resMap = new HashMap<>();

        try {

            if(movVo.getMode().equals("restore")){
                movVo.setMode("B");
            }else if(movVo.getMode().equals("delete")){
                movVo.setMode("D");
            }

            int sucCnt = 0;
            sucCnt = movieService.updateMovieStateAdmin(movVo);

            if(movVo.getMovieBeanList().size() == sucCnt){
                successResult =true;
                successMsg = sucCnt + " 개의 영화 상태가 변경되었습니다.";
            }else{
                successResult =false;
                int failCnt = movVo.getMovieBeanList().size() - sucCnt;
                successMsg = failCnt + " 개의 영화 상태 변경이 실패 하였습니다.";
            }

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);
        resMap.put("successMsg", successMsg);

        return resMap;
    }


    /** 영화 모듈 - 영화 목록 조회 */
    @PostMapping(value = "/selectMovieList")
    @ResponseBody
    public Map<String, Object> selectMovieList(MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();


        try {

            movVo.setPaging(new Paging());

            movVo.getPaging().setTotalItems(movieService.selectMovieListTotalCnt(movVo));

            // 페이지 이동시
            if(movVo.getNewPage() != 0){
                // 페이지 이동 조회시 (setCurrentPage 로 페이징변수 갱신)
                movVo.getPaging().setCurrentPage(movVo.getNewPage());
            }


            // 일반 영화 목록은 1페이지당 9개씩 세팅
            movVo.getPaging().setItemsPerPage(9);

            movVo.setMovieBeanList(movieService.selectMovieList(movVo));


            if(movVo.getMovieBeanList() != null){
                for (int i = 0; i < movVo.getMovieBeanList().size(); i++) {
                    // 영화 제작국가 조회 세팅
                    movVo.setMovieBean(movVo.getMovieBeanList().get(i));
                    movVo.getMovieBeanList().get(i).setMovieNationBeanList(movieService.selectMovieNationList(movVo));

                    // 영화 포스터 세팅
//                    movVo.getMovieBeanList().get(i).setFileBean(movieService.selectMoviePosterBean(movVo));

                }

            }

            resMap.put("movVo", movVo);
            successResult = true;

        }catch (Exception e){

        }


        resMap.put("successResult", successResult);
        return resMap;

    }


    /** 영화 모듈 - 선택 영화 상세 조회 */
    @PostMapping(value = "/selectMovieInfo")
    @ResponseBody
    public Map<String, Object> selectMovieInfo(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();


        try {
            
            // movieCd 값 기준 영화 상세정보 조회
            movVo.setMovieBean(movieService.selectMovieInfo(movVo));

            if(movVo.getMovieBean() != null){

                // 영화 장르 조회
                movVo.getMovieBean().setMovieGenreBeanList(movieService.selectMovieGenreList(movVo));
                
                // 영화 컴퍼니 조회
                movVo.getMovieBean().setMovieCompanyBeanList(movieService.selectMovieCompanyList(movVo));
                
                // 제작 국가 조회
                movVo.getMovieBean().setMovieNationBeanList(movieService.selectMovieNationList(movVo));

                // 영화 인 조회
                movVo.getMovieBean().setMoviePeopleBeanList(movieService.selectMoviePeopleList(movVo));

                // 감독/ 배우 / 스태프 / 기타  분류 및 할당
                if(movVo.getMovieBean().getMoviePeopleBeanList() != null){
                     ArrayList<MoviePeopleBean> peopleBeanList =  movVo.getMovieBean().getMoviePeopleBeanList();
                     ArrayList<MoviePeopleBean> directorBeanList = new ArrayList<>();
                     ArrayList<MoviePeopleBean> actorBeanList = new ArrayList<>();
                     ArrayList<MoviePeopleBean> staffBeanList = new ArrayList<>();

                    for (int i = 0; i < peopleBeanList.size(); i++) {

                        if(peopleBeanList.get(i).getRepRoleNm().equals("감독")){
                            directorBeanList.add(peopleBeanList.get(i));
                        }else if(peopleBeanList.get(i).getRepRoleNm().equals("배우")){
                            actorBeanList.add(peopleBeanList.get(i));
                        }else{  // 나머지는 스태프
                            staffBeanList.add(peopleBeanList.get(i));
                        }

                    }

                    // 분류 후 최종 값 핟랑
                    movVo.getMovieBean().setMovieDirectorBeanList(directorBeanList);
                    movVo.getMovieBean().setMovieActorBeanList(actorBeanList);
                    movVo.getMovieBean().setMovieStaffBeanList(staffBeanList);

                }




                // 영화 찜하기 정보 조회
                boolean isFav = false;
                isFav = movieService.selectMovieFavorite(movVo);
                movVo.getMovieBean().setFav(isFav);


                // 영화 나의 평가 정보 조회
                movVo.setMoviePersonalMoviePointBean(movieService.selectMoviePersonalMoviePointBean(movVo));

                // 영화 평가 여부 값 세팅
                if(movVo.getMoviePersonalMoviePointBean() != null){
                    movVo.getMovieBean().setEvaluated(true);
                }else {
                    movVo.getMovieBean().setEvaluated(false);
                }


                // 영화의 평가 정보들 조회
                movVo.getMovieBean().setMoviePersonalMoviePointBeanList(movieService.selectMoviePersonalMoviePointBeanList(movVo));

                // 영화 포스터 정보 조회
                //movVo.getMovieBean().setFileBean(movieService.selectMoviePosterBean(movVo));


                resMap.put("movieBean", movVo.getMovieBean());
                resMap.put("moviePersonalMoviePointBean", movVo.getMoviePersonalMoviePointBean());
                successResult = true;
            }else{
                successResult = false;
            }

        }catch (Exception e){

        }

        resMap.put("memberBean", movVo.getMemberBean());
        resMap.put("successResult", successResult);

        return resMap;

    }



    /** 영화 모듈 - 조회수 증가 */
    @PostMapping(value = "/addMovieViewCnt")
    @ResponseBody
    public Map<String, Object> addMovieViewCnt(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        try {

            int sucCnt = 0;

            // 영화 <-> 사용자 기준 조회로그 추가
            sucCnt = movieService.addMovieViewCnt(movVo);

            // 조회로그 추가 되었을 시
            if(sucCnt > 0){
                // 영화 토탈 조회 수 갱신
                movieService.reFreshMovieTotalViewCnt(movVo);
            }
            successResult = true;

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;

    }

    
    /** 영화 모듈 - 찜 하기 */
    @PostMapping(value = "/updateMovieFavorite")
    @ResponseBody
    public Map<String, Object> updateMovieFavorite(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        try {
            
            // 찜 추가
            if(movVo.getMode().equals("add")){
                movieService.addMovieFav(movVo);
                successResult = true;
                
            // 찜 제거
            }else if(movVo.getMode().equals("delete")){
                movieService.deleteMovieFav(movVo);
                successResult = true;
                
            }


        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;

    }



    /** 영화 모듈 - 평가 (별점, 한줄평) 등록  / 삭제  */
    @PostMapping(value = "/updateMovPersonalMoviePoint")
    @ResponseBody
    public Map<String, Object> updateMovPersonalMoviePoint(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        int insertUpdateCheck = 0; // 인서트면 1 업데이트면 2
        
        try {

            // 포인트 빈에 memId 세팅
            movVo.getMoviePersonalMoviePointBean().setMemId(movVo.getMemberBean().getMemId());

            // 업데이트 모드) 조회하고 없으면 인서트, 있으면 업데이트
            if(movVo.getMode().equals("update")){
                // 상태값 기본 세팅
                movVo.getMoviePersonalMoviePointBean().setState("B");
                insertUpdateCheck = movieService.updateMovPersonalMoviePoint(movVo);

            // 삭제 모드
            }else if(movVo.getMode().equals("delete")){
                movieService.deleteMovPersonalMoviePoint(movVo);
            }
            


            /** 사용자 장르 취향 갱신 (장르값 널이 아니고, 해당 영화를 첫평가 한다면 */
            if (movVo.getMovieBean() != null && movVo.getMovieBean().getMovieGenreBeanList() != null && insertUpdateCheck ==1){
                for (int i = 0; i < movVo.getMovieBean().getMovieGenreBeanList().size(); i++) {
                    MovieGenreBean movieGenreBean = movVo.getMovieBean().getMovieGenreBeanList().get(i);
                    movVo.getMovieBean().setMovieGenreBean(movieGenreBean);

                    // 사용자 장르 취향 존재 확인
                    int checkCnt = 0;
                    checkCnt = movieService.checkGenreTaste(movVo);
                    if(checkCnt == 0){
                        // 장르 취향 인서트
                        movieService.insertGenreTaste(movVo);
                    }else{
                        // 장르 취향 업데이트
                        movieService.updateGenreTaste(movVo);
                    }

                }
            }

            // 영화 상세정보 평가 값 갱신
            movieService.updateMovieInfoPoint(movVo);

            successResult = true;



        }catch (Exception e){

        }

        resMap.put("movVo", movVo);
        resMap.put("successResult", successResult);

        return resMap;

    }

    /** 관리자 모듈 - 영화리뷰 상태값 정상/삭제로 변경 */
    @PostMapping(value = "/updateMovieState")
    @ResponseBody
    public Map<String, Object> updateReviewState(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        String successMsg = "";
        Map<String, Object> resMap = new HashMap<>();

        try {

            if(movVo.getMode().equals("restore")){
                movVo.setMode("B");
            }else if(movVo.getMode().equals("delete")){
                movVo.setMode("D");
            }

            movieService.updateMovieState(movVo);


        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;
    }



    /** 영화 포스터 등록/변경 */
    @PostMapping("/moviePosterUpload")
    public Map<String, Object> moviePosterUpload(@RequestParam("file") MultipartFile file, @RequestParam("movVo") String movVoString) {
        MovVo movVo = new Gson().fromJson(movVoString, MovVo.class);

        Map resMap = new HashMap<>();
        boolean succesResult = false;

        try {

            MakeFileBean makeFileBean = new MakeFileBean();

            // 파일 업로드 및 파일 빈 값 할당
            FileBean fileBean = makeFileBean.makingFileBean("MOV",file);
            movVo.getMovieBean().setFileBean(fileBean);

            // 포스터 파일빈 디비 인서트
            movieService.insertFileBean(movVo);

            // 나머지 포스터 상태값 D로 변경
            movieService.updateMovieFileState(movVo);

            // 영화 <-> 포스터 파일 매핑 인서트
            movieService.insertMovieFileMap(movVo);

            succesResult =true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        resMap.put("succesResult", succesResult);

        return resMap;
    }




    /** 영화 모듈 - 일일 박스 오피스 영화 조회 */
    @PostMapping(value = "/selectBoxOfficeList")
    @ResponseBody
    public Map<String, Object> selectBoxOfficeList(@RequestBody Map<String, String> requestBody) throws Exception {

        String showRange = requestBody.get("showRange");
        String boxOfficeType = requestBody.get("boxOfficeType");

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        MovVo movVo = new MovVo();


        try {

            movVo.setMovieBoxOfficeBean(new MovieBoxOfficeBean());
            movVo.getMovieBoxOfficeBean().setShowRange(showRange);
            movVo.getMovieBoxOfficeBean().setBoxOfficeType(boxOfficeType);

            // 날짜 기준 일일 박스 오피스 조회
            movVo.setMovieBoxOfficeBeanList(movieService.selectBoxOfficeList(movVo));

            resMap.put("movVo", movVo);
            successResult = true;

        }catch (Exception e){

        }


        resMap.put("successResult", successResult);
        return resMap;

    }


    /** 사용자 추천 영화 조회 */
    @PostMapping(value = "/selectPersonalRecommendMov")
    @ResponseBody
    public Map<String, Object> selectPersonalRecommendMov(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();
        MovVo movVo = new MovVo();
        movVo.setMovieBean(new MovieBean());
        String returnMsg = "";

        try {

            // 비회원 처리
            if (memVo == null || memVo.getMemberBean() == null || memVo.getMemberBean().getMemId() == null) {
                if (memVo.getMemberBean() == null) {
                    memVo.setMemberBean(new LoginMemberBean());
                }
                memVo.getMemberBean().setMemId("MEM2157073142");
                returnMsg = "회원가입을 하고 더욱 좋은 영화를 추천 받아보세요";
                resMap.put("returnMsg", returnMsg);
            }

            ArrayList<MovieGenreBean> movieGenreBeanList = new ArrayList<>();

            // 최다 별점 장르
            movieGenreBeanList.addAll(movieService.pointAvgTopMovGr(memVo));

            // 최다 좋아요 장르
            movieGenreBeanList.addAll(movieService.favTopMovGr(memVo));

            // 최다 평가 장르
            movieGenreBeanList.addAll(movieService.pointMaxTopMovGr(memVo));

            // 최근 조회 장르
            movieGenreBeanList.addAll(movieService.viewLogTopMovGr(memVo));

            // 장르별 빈도 계산
            Map<String, Integer> genreCountMap = new HashMap<>();
            for (MovieGenreBean bean : movieGenreBeanList) {
                genreCountMap.put(bean.getRepGenreNm(), genreCountMap.getOrDefault(bean.getRepGenreNm(), 0) + 1);
            }

            // 빈도수 기준으로 정렬하여 상위 3개 추출
            List<Map.Entry<String, Integer>> topGenres = genreCountMap.entrySet().stream()
                    .sorted((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()))
                    .limit(3)
                    .collect(Collectors.toList());

            // 상위 3개의 장르를 새로운 MovieGenreBean 객체에 담기
            ArrayList<MovieGenreBean> topGenreBeans = new ArrayList<>();
            for (Map.Entry<String, Integer> entry : topGenres) {
                MovieGenreBean topGenreBean = new MovieGenreBean();
                topGenreBean.setRepGenreNm(entry.getKey());
                // 필요하다면 다른 필드도 설정할 수 있습니다.
                topGenreBeans.add(topGenreBean);
            }

            movVo.getMovieBean().setMovieGenreBeanList(topGenreBeans);

            // 장르 기준으로 별점 높은순 100개 조회
            List<MovieBean> movieList = movieService.selectPersonalRecommendMov(movVo);

            // 리스트를 무작위로 섞기
            Collections.shuffle(movieList);

            // 상위 10개를 선택하여 movVo에 설정
            List<MovieBean> randomTop10Movies = movieList.stream().limit(10).collect(Collectors.toList());
            movVo.setMovieBeanList((ArrayList<MovieBean>) randomTop10Movies);

            // 성공 결과 설정
            successResult = true;

            // 결과를 resMap에 설정
            resMap.put("movVo", movVo);

        } catch (Exception e) {
            successResult = false;
        }

        resMap.put("successResult", successResult);

        return resMap;
    }



    /** 최근 핫한 영화 조회 */
    @PostMapping(value = "/selectHotMovies")
    @ResponseBody
    public Map<String, Object> selectHotMovies(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();
        MovVo movVo = new MovVo();
        movVo.setMovieBean(new MovieBean());

        try {

            // 조회 로그 한달 기준 가장 많이 조회된 영화 top 100
            List<MovieBean> movieList = movieService.viewLogTopMov();

            // 리스트를 무작위로 섞기
            Collections.shuffle(movieList);

            // 상위 10개를 선택하여 movVo에 설정
            List<MovieBean> randomTop10Movies = movieList.stream().limit(10).collect(Collectors.toList());
            movVo.setMovieBeanList((ArrayList<MovieBean>) randomTop10Movies);

            // 성공 결과 설정
            successResult = true;

            // 결과를 resMap에 설정
            resMap.put("movVo", movVo);

        } catch (Exception e) {
            successResult = false;
        }

        resMap.put("successResult", successResult);

        return resMap;
    }



    /** 역대 최고 평점 영화 조회 */
    @PostMapping(value = "/selectTopRatedMovies")
    @ResponseBody
    public Map<String, Object> selectTopRatedMovies(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();
        MovVo movVo = new MovVo();
        movVo.setMovieBean(new MovieBean());

        try {

            // 최고 별점 영화 리스트 10개
            movVo.setMovieBeanList(movieService.pointAvgTopMov());

            // 성공 결과 설정
            successResult = true;

            // 결과를 resMap에 설정
            resMap.put("movVo", movVo);

        } catch (Exception e) {
            successResult = false;
        }

        resMap.put("successResult", successResult);

        return resMap;
    }







}
