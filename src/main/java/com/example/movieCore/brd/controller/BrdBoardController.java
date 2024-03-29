package com.example.movieCore.brd.controller;

import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.service.BrdBoardServiceImpl;
import com.example.movieCore.brd.vo.BrdVo;
import com.example.movieCore.utils.MakeUUID;
import com.example.movieCore.utils.Paging;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class BrdBoardController {

    private final BrdBoardServiceImpl boardService;


    /** 게시판 생성 시 */
    @PostMapping(value = "/createBoard")
    @ResponseBody
    public Map<String, Object> createBoard(HttpServletRequest request, HttpServletResponse response, BrdBoardBean boardBean) throws Exception{

        /** 기본값 세팅 */

        // 고유 id 생성 (folId)
        MakeUUID makeUUID = new MakeUUID();
        String brdId = makeUUID.makeShortUUID("BB");    // BB = BoardBoard
        boardBean.setBrdId(brdId);

        // 게시판 상태
        boardBean.setState("B");

        // 게시판 생성일
        boardBean.setCreateDt(new Date());




        /** 추가 임시 값 세팅 추후 삭제(변경)할 것*/
        // 회원 id
        boardBean.setMemId("001");

        // 게시판 순서
        boardBean.setOdr(0);





        /** 게시판 최종 디비 인서트 */
        BrdVo brdVo = new BrdVo();
        brdVo.setBoardBean(boardBean);

        boolean succesResult = false;

        succesResult = boardService.createBoard(brdVo);

        Map resMap = new HashMap<>();
        resMap.put("succesResult",succesResult);

        return resMap;


    }




    /** 모든 폴더/게시판 리스트 조회 */
    @PostMapping(value = "/selectAllFolderBoardList")
    @ResponseBody
    public Map<String, Object> selectAllFolderBoardList(HttpServletRequest request, HttpServletResponse response) throws Exception{

        BrdVo brdVo = new BrdVo();

        Map resMap = new HashMap<>();

        try {
            brdVo.setFolderBeanList(boardService.selectAllFolderBoardList());
            resMap.put("succesResult",true);
        }catch (Exception e){
            resMap.put("succesResult",false);
        }

        resMap.put("brdVo",brdVo);


        return resMap;


    }






    /** 모든 게시판 리스트 조회 */
    @PostMapping(value = "/selectAllBoardList")
    @ResponseBody
    public Map<String, Object> selectAllBoardList(HttpServletRequest request, HttpServletResponse response) throws Exception{

        BrdVo brdVo = new BrdVo();

        Map resMap = new HashMap<>();

        try {
            brdVo.setBoardBeanList(boardService.selectAllBoardList());
            resMap.put("succesResult",true);
        }catch (Exception e){
            resMap.put("succesResult",false);
        }

        resMap.put("brdVo",brdVo);


        return resMap;


    }

    /** 관리자 모듈 - 게시판 리스트 조회 */
    @PostMapping(value = "/selectBoardListAdmin")
    @ResponseBody
    public Map<String, Object> selectBoardListAdmin(HttpServletRequest request, HttpServletResponse response, BrdBoardBean boardBean) throws Exception{


        /** 폴더 리스트 조회디비서 셀렉트  */
        BrdVo brdVo = new BrdVo();
        brdVo.setBoardBean(boardBean);

        boolean succesResult = false;

        Map resMap = new HashMap<>();
        try {

            brdVo.setPaging(new Paging());
            brdVo.getPaging().setTotalItems(boardService.selectBoardListAdminTotalCnt(brdVo));

            //  페이지 이동시 (최초 조회시에는 패스)
            if(brdVo.getNewPage() != 0){
                // 페이지 이동 조회시 (setCurrentPage 로 페이징변수 갱신)
                brdVo.getPaging().setCurrentPage(brdVo.getNewPage());
            }


            brdVo.setBoardBeanList(boardService.selectBoardListAdmin(brdVo));
            resMap.put("brdVo",brdVo);
            succesResult = true;
        }catch (Exception e){

        }

        resMap.put("succesResult",succesResult);

        return resMap;


    }









}
