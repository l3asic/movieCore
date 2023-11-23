package com.example.movieCore.brd.controller;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.service.BrdArticleServiceImpl;
import com.example.movieCore.brd.vo.BrdVo;
import com.example.movieCore.utils.MakeUUID;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class BrdArticleController {

    private final BrdArticleServiceImpl articleService;


    /** 게시글 등록 시 */
    @PostMapping(value = "/atclRegistry")
    @ResponseBody
    public Map<String, Object> atclRegistry(HttpServletRequest request, HttpServletResponse response, BrdArticleBean articleBean) throws Exception{

        /** 기본값 세팅 */

        // 고유 id 생성 (memId)
        MakeUUID makeUUID = new MakeUUID();
        String atclId = makeUUID.makeShortUUID("BA");   // BA = BoardArticle
        articleBean.setAtclId(atclId);

        // 조회 수
        articleBean.setViewCnt(0);

        // 생성 날짜
        articleBean.setCreateDt(new Date());

        // 수정 날짜
        articleBean.setUpdateDt(new Date());

        // 만료일자 설정
        // articleBean.setExpireDt();
        // 추후 만료일 분기처리 필요

        // 게시 만료 여부
        articleBean.setExpireYn("N");
        // 추후 분기 처리 필요 (만료 안 되었으면 기본값 "N")

        // 상태 값 (기본값 Basic)
        articleBean.setState("B");

        // 댓글 수
        articleBean.setAtclReplCnt(0);



        /** 테스트용 기본값 추가 세팅 */

        // 만료 일자 세팅
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date expireDt = formatter.parse("2099-12-31");
        articleBean.setExpireDt(expireDt);;


        /** 게시글 최종 디비 인서트 */
        BrdVo brdVo = new BrdVo();
        brdVo.setArticleBean(articleBean);

        boolean succesResult = false;

        succesResult = articleService.atclRegistry(brdVo);

        Map resMap = new HashMap<>();
        resMap.put("succesResult",succesResult);

        return resMap;


    }




    /** 게시판의 게시글 리스트 조회 */
    @PostMapping(value = "/selectArticleList")
    @ResponseBody
    public Map<String, Object> selectArticleList(HttpServletRequest request, HttpServletResponse response, BrdBoardBean boardBean) throws Exception{



        /** 게시글 리스트 조회디비서 셀렉트  */
        BrdVo brdVo = new BrdVo();
        brdVo.setBoardBean(boardBean);

        boolean succesResult = false;

        Map resMap = new HashMap<>();
        try {
            brdVo.setArticleBeanList(articleService.selectArticleList(brdVo));
            resMap.put("brdVo",brdVo);
            succesResult = true;
        }catch (Exception e){

        }

        resMap.put("succesResult",succesResult);

        return resMap;


    }








}
