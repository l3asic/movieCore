package com.example.movieCore.movie.controller;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.movie.bean.MoviePeopleBean;
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
public class MovFavController {

    private final MovMovieServiceImpl movieService;




    /** 내가 찜한 영화 리스트 조회 */
    @PostMapping(value = "/selectMyFavMovList")
    @ResponseBody
    public Map<String, Object> selectMyFavMovList(@RequestBody MovVo movVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();


        try {


            movVo.setMovieBeanList(movieService.selectMyFavMovList(movVo));

            resMap.put("movVo", movVo);
            successResult = true;

        }catch (Exception e){

        }


        resMap.put("successResult", successResult);
        return resMap;

    }





}
