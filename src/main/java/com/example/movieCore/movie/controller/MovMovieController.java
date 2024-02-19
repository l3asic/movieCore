package com.example.movieCore.movie.controller;

import com.example.movieCore.movie.bean.SearchBean;
import com.example.movieCore.movie.service.MovMovieServiceImpl;
import com.example.movieCore.movie.vo.MovVo;
import com.example.movieCore.utils.Paging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

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



    /** 관리자 모듈 - 영화 상태값 삭제로 변경 */
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

                resMap.put("movieBean", movVo.getMovieBean());
                successResult = true;
            }else{
                successResult = false;
            }

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;

    }







}
