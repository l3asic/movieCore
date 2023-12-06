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




    /** 영화 목록 조회 */
    @PostMapping(value = "/selectMovieList")
    @ResponseBody
    public Map<String, Object> selectMovieList(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();


        try {

            //  최초 조회 일시 (페이징 널상태)
            if(movVo.getPaging() == null){
                int totalCnt = 0;
                movVo.setPaging(new Paging());
                totalCnt = movieService.selectMovieListTotalCnt(movVo);
                movVo.getPaging().setTotalItems(totalCnt);
            }

            // 페이지 이동 조회시 (setCurrentPage 로 페이징변수 갱신)
            movVo.getPaging().setCurrentPage(movVo.getPaging().getCurrentPage());

            movVo.setMovieBeanList(movieService.selectMovieList(movVo));
            resMap.put("movVo", movVo);
            successResult = true;

        }catch (Exception e){

        }


        resMap.put("successResult", successResult);
        return resMap;

    }



}
