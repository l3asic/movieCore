package com.example.movieCore.movie.controller;

import com.example.movieCore.movie.bean.SearchBean;
import com.example.movieCore.movie.service.MovMovieServiceImpl;
import com.example.movieCore.movie.vo.MovVo;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;


@Controller
@RequiredArgsConstructor
public class MovMovieController {

    private final MovMovieServiceImpl movieService;



    /** 모든 영화 목록 조회 */
    @PostMapping(value = "/selectMovieList")
    @ResponseBody
    public Map<String, Object> selectMovieList(HttpServletRequest request, HttpServletResponse response, SearchBean searchBean) throws Exception {

        MovVo movVo = new MovVo();
        movVo.setSearchBean(searchBean);

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        try {
            movVo.setMovieBeanList(movieService.selectMovieList(movVo));
            resMap.put("movVo", movVo);
            successResult = true;

        }catch (Exception e){

        }


        resMap.put("successResult", successResult);
        return resMap;

    }



}
