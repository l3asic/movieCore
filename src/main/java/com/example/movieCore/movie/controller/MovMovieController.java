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
    @PostMapping(value = "/deleteMovieListAdmin")
    @ResponseBody
    public Map<String, Object> deleteMovieListAdmin(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        String successMsg = "";
        Map<String, Object> resMap = new HashMap<>();

        try {
            // 영화 삭제
            int sucCnt = movieService.movieListStateDeleteAdmin(movVo);

            if(movVo.getMovieBeanList().size() == sucCnt){
                successResult =true;
                successMsg = sucCnt + "개 영화가 삭제 되었습니다.";
            }else{
                successResult =false;
                int failCnt = movVo.getMovieBeanList().size() - sucCnt;
                successMsg = failCnt + " 개 영화가 실패 하였습니다.";
            }

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);
        resMap.put("successMsg", successMsg);

        return resMap;
    }




}
