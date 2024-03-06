package com.example.movieCore.movie.controller;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.movie.bean.MoviePeopleBean;
import com.example.movieCore.movie.bean.SearchBean;
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

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;


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

            // 영화 제작국가 조회 세팅
            if(movVo.getMovieBeanList() != null){
                for (int i = 0; i < movVo.getMovieBeanList().size(); i++) {
                    movVo.setMovieBean(movVo.getMovieBeanList().get(i));
                    movVo.getMovieBeanList().get(i).setMovieNationBeanList(movieService.selectMovieNationList(movVo));
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
                movVo.setFileBean(movieService.selectMoviePosterBean(movVo));


                resMap.put("movieBean", movVo.getMovieBean());
                resMap.put("moviePersonalMoviePointBean", movVo.getMoviePersonalMoviePointBean());
                resMap.put("fileBean", movVo.getFileBean());
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

        try {

            // 포인트 빈에 memId 세팅
            movVo.getMoviePersonalMoviePointBean().setMemId(movVo.getMemberBean().getMemId());

            // 업데이트 모드) 조회하고 없으면 인서트, 있으면 업데이트
            if(movVo.getMode().equals("update")){
                // 상태값 기본 세팅
                movVo.getMoviePersonalMoviePointBean().setState("B");
                movieService.updateMovPersonalMoviePoint(movVo);

            // 삭제 모드)
            }else if(movVo.getMode().equals("delete")){
                movieService.deleteMovPersonalMoviePoint(movVo);
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
            movVo.setFileBean(fileBean);

            // 포스터 파일빈 디비 인서트
            movieService.insertFileBean(movVo);

            // 영화 <-> 포스터 파일 매핑 인서트
            movieService.insertMovieFileMap(movVo);

            succesResult =true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        resMap.put("succesResult", succesResult);

        return resMap;
    }





}
