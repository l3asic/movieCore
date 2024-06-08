package com.example.movieCore.brd.controller;

import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.service.BrdBoardServiceImpl;
import com.example.movieCore.brd.vo.BrdVo;
import com.example.movieCore.utils.MakeUUID;
import com.example.movieCore.utils.Paging;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.sql.Timestamp;
import java.util.*;

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
        Date date = new Date();
        Timestamp nowTime = new Timestamp(date.getTime());
        boardBean.setCreateDt(nowTime);


        // 게시판 순서
        int newOdr = boardService.getMaxBoardOdr(boardBean) + 1; // getMaxOdr 메서드에서 최대 ODR 값을 가져온 후 +1
        boardBean.setOdr(newOdr);





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


    /** 관리자 모듈 - 폴더 별 게시판 리스트 조회 */
    @PostMapping(value = "/selectBoardListAdmin")
    @ResponseBody
    public Map<String, Object> selectBoardListAdmin(@RequestBody BrdVo brdVo) throws Exception {
        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();
        try {
            // 데이터 조회
            ArrayList<BrdFolderBean> folderBeanList = boardService.selectBoardListAdmin(brdVo);
            brdVo.setFolderBeanList(folderBeanList);
            resMap.put("brdVo", brdVo);
            successResult = true;
        } catch (Exception e) {
        }
        resMap.put("successResult", successResult);
        return resMap;
    }


    /** 관리자 모듈 - 게시판 상태 변경 */
    @PostMapping(value = "/updateBoardStateAdmin")
    @ResponseBody
    public Map<String, Object> updateBoardStateAdmin(@RequestBody BrdVo brdVo) throws Exception {
        boolean successResult = false;
        String successMsg = "";
        Map<String, Object> resMap = new HashMap<>();
        try {

            if ("restore".equals(brdVo.getMode())) {
                brdVo.setMode("B");
            } else if ("delete".equals(brdVo.getMode())) {
                brdVo.setMode("D");
            }

            int sucCnt = boardService.updateBoardStateAdmin(brdVo);

            if (brdVo.getBoardBeanList().size() == sucCnt) {
                successResult = true;
                successMsg = sucCnt + " 개의 게시판 상태가 변경되었습니다.";
            } else {
                successResult = false;
                int failCnt = brdVo.getFolderBeanList().size() - sucCnt;
                successMsg = failCnt + " 개의 게시판 상태 변경이 실패 하였습니다.";
            }


            resMap.put("brdVo", brdVo);
            successResult = true;
        } catch (Exception e) {
        }
        resMap.put("successResult", successResult);
        resMap.put("successMsg", successMsg);
        return resMap;
    }


    /** 관리자 모듈 - 폴더 별 게시판 순서 변경 */
    @PostMapping(value = "/updateBoardOrderAdmin")
    @ResponseBody
    public Map<String, Object> updateBoardOrderAdmin(@RequestBody BrdVo brdVo) throws Exception {
        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();
        try {
            for (BrdBoardBean boardBean : brdVo.getBoardBeanList()) {
                boardService.updateBoardOrderAndFolderAdmin(boardBean);
            }
            successResult = true;
        } catch (Exception e) {
            // Log the exception
        }
        resMap.put("successResult", successResult);
        return resMap;
    }



    /** 관리자 모듈 - 폴더 별 게시판 정보 업데이트 */
    @PostMapping(value = "/updateBoard")
    @ResponseBody
    public Map<String, Object> updateBoard(@RequestBody BrdVo brdVo) throws Exception {
        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();
        try {
            boardService.updateBoard(brdVo);

            successResult = true;
        } catch (Exception e) {
            // 예외 처리
        }
        resMap.put("successResult", successResult);
        return resMap;
    }

















}
