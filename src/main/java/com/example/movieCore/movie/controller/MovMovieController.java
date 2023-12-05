package com.example.movieCore.movie.controller;

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
    @PostMapping(value = "/selectAllMovieList")
    @ResponseBody
    public Map<String, Object> selectAllMovieList(HttpServletRequest request, HttpServletResponse response) throws Exception {
        MovVo movVo = new MovVo();

        movVo.setMovieBeanList(movieService.selectAllMovieList());


        Map<String, Object> resMap = new HashMap<>();
        resMap.put("successResult", "successResult");
        resMap.put("movVo", movVo);
        return resMap;

    }



}
