package com.example.movieCore.brd.controller;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.service.BrdArticleServiceImpl;
import com.example.movieCore.brd.vo.BrdVo;
import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.utils.MakeFileBean;
import com.example.movieCore.utils.MakeUUID;
import com.example.movieCore.utils.Paging;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Controller
@RequiredArgsConstructor
public class BrdArticleController {

    private final BrdArticleServiceImpl articleService;




    /** 게시글 등록 시 */
    @PostMapping(value = "/atclRegistry")
    @ResponseBody
    public Map<String, Object> atclRegistry(@RequestBody BrdVo brdVo) throws Exception {

        BrdArticleBean articleBean = brdVo.getArticleBean();

        /** 기본값 세팅 */
        MakeUUID makeUUID = new MakeUUID();
        String atclId = makeUUID.makeShortUUID("BA");   // BA = BoardArticle
        articleBean.setAtclId(atclId);

        // 조회 수
        articleBean.setViewCnt(0);

        // 생성 날짜
        Date date = new Date();
        Timestamp nowTime = new Timestamp(date.getTime());
        articleBean.setCreateDt(nowTime);

        // 수정 날짜
        articleBean.setUpdateDt(nowTime);

        // 상태 값 (기본값 Basic)
        articleBean.setState("B");

        // 댓글 수
        articleBean.setAtclReplCnt(0);

        /** 게시글 최종 디비 인서트 */
        boolean succesResult = articleService.atclRegistry(brdVo);

        Map<String, Object> resMap = new HashMap<>();
        resMap.put("succesResult", succesResult);
        resMap.put("brdVo", brdVo);

        return resMap;
    }






    /** 게시판 조회 */
    @PostMapping(value = "/selectBoardByBrdId")
    @ResponseBody
    public Map<String, Object> selectBoardByBrdId(@RequestBody BrdVo brdVo) throws Exception{

        boolean succesResult = false;

        Map resMap = new HashMap<>();
        try {
            brdVo.setBoardBean(articleService.selectBoardByBrdId(brdVo));

            resMap.put("brdVo",brdVo);
            succesResult = true;
        }catch (Exception e){

        }

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

            brdVo.setPaging(new Paging());
            brdVo.getPaging().setTotalItems(articleService.selectArticleListTotalCnt(brdVo));

            //  페이지 이동시 (최초 조회시에는 패스)
            if(brdVo.getNewPage() != 0){
                // 페이지 이동 조회시 (setCurrentPage 로 페이징변수 갱신)
                brdVo.getPaging().setCurrentPage(brdVo.getNewPage());
            }


            brdVo.setArticleBeanList(articleService.selectArticleList(brdVo));
            resMap.put("brdVo",brdVo);
            succesResult = true;
        }catch (Exception e){

        }

        resMap.put("succesResult",succesResult);

        return resMap;


    }

    @GetMapping(value = "/searchArticle")
    @ResponseBody
    public Map<String, Object> searchArticle(HttpServletRequest request, HttpServletResponse response, BrdBoardBean boardBean) throws Exception{


        /** 게시글 리스트 조회디비서 셀렉트  */
        BrdVo brdVo = new BrdVo();
        brdVo.setBoardBean(boardBean);

        boolean succesResult = false;

        Map resMap = new HashMap<>();
        try {
                brdVo.setArticleBeanList(articleService.searchArticle(brdVo));

            resMap.put("brdVo",brdVo);
            succesResult = true;
        }catch (Exception e){

        }

        resMap.put("succesResult",succesResult);

        return resMap;


    }

    /**
     * 게시글 상세정보 조회
     */
    @PostMapping(value = "/selectArticleDetail")
    @ResponseBody
    public Map<String, Object> selectArticleDetail(HttpServletRequest request, HttpServletResponse response, BrdArticleBean articleBean) throws Exception {

        BrdVo brdVo = new BrdVo();
        brdVo.setArticleBean(articleBean);

        boolean succesResult = false;

        Map resMap = new HashMap<>();
        try {

            /** 조회수 증가 동작 */
            // 조회 로그 업데이트
            articleService.addArticleViewLog(brdVo);

            // 게시글 조회수 갱신
            articleService.updateArticleViewCnt(brdVo);

            // 게시글 정보 조회
            brdVo.setArticleBean(articleService.selectArticleDetail(brdVo));

            // 댓글 리스트 조회
            brdVo.setReplyBeanList(articleService.selectReplyList(brdVo));

            resMap.put("brdVo", brdVo);
            succesResult = true;
        } catch (Exception e) {

        }

        resMap.put("succesResult", succesResult);

        return resMap;
    }



    /** 삭제 */
    @PostMapping(value = "/deleteArticle")
    @ResponseBody
    public Map<String, Object> deleteArticle(@RequestBody BrdVo brdVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        int successCnt = 0;
        try {
            successCnt = articleService.deleteArticle(brdVo);
            if(successCnt > 0) {
                successResult = true;
            }

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;

    }



    /**
    * 파일 업로드
    * */
    @PostMapping("/atclFileUpload")
    public Map<String, Object> uploadFile(@RequestParam("files") ArrayList<MultipartFile> files, @RequestParam("brdVo") String brdVoString) {
        BrdVo brdVo = new Gson().fromJson(brdVoString, BrdVo.class);

        Map<String, Object> resMap = new HashMap<>();
        boolean succesResult = false;

        try {
            MakeFileBean makeFileBean = new MakeFileBean();

            // 파일 업로드 및 파일 빈 값 할당
            ArrayList<FileBean> fileBeans = new ArrayList<>();
            for (MultipartFile file : files) {
                FileBean fileBean = makeFileBean.makingFileBean("BRD", file);
                fileBeans.add(fileBean);
            }
            brdVo.setFileBeanList(fileBeans);

            // 파일빈 디비 인서트
            articleService.insertFileBeans(brdVo);

            // 게시글 <-> 첨부파일 매핑 인서트
            articleService.insertArticleFileMap(brdVo);

            succesResult = true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        resMap.put("succesResult", succesResult);

        return resMap;
    }







    /** 관리자 - 게시글 리스트 조회 */
    @PostMapping(value = "/selectArticleListAdmin")
    @ResponseBody
    public Map<String, Object> selectArticleListAdmin(@RequestBody BrdVo brdVo) throws Exception {
        /** 게시글 리스트 조회디비서 셀렉트  */

        boolean succesResult = false;

        Map<String, Object> resMap = new HashMap<>();
        try {
            brdVo.setPaging(new Paging());
            brdVo.getPaging().setTotalItems(articleService.selectArticleListTotalCntAdmin(brdVo));

            //  페이지 이동시 (최초 조회시에는 패스)
            if (brdVo.getNewPage() != 0) {
                // 페이지 이동 조회시 (setCurrentPage 로 페이징변수 갱신)
                brdVo.getPaging().setCurrentPage(brdVo.getNewPage());
            }

            ArrayList<BrdArticleBean> articleList = articleService.selectArticleListAdmin(brdVo);
            for (BrdArticleBean article : articleList) {
                article.setCreateDt(article.getCreateDt() != null ? new Timestamp(article.getCreateDt().getTime()) : null);
                article.setExpireDt(article.getExpireDt() != null ? new Timestamp(article.getExpireDt().getTime()) : null);
            }
            brdVo.setArticleBeanList(articleList);
            resMap.put("brdVo", brdVo);
            succesResult = true;
        } catch (Exception e) {
            e.printStackTrace();
        }

        resMap.put("succesResult", succesResult);
        return resMap;
    }


    
    /** 관리자 - 게시글 상태 수정 */
    @PostMapping(value = "/updateArticleStateAdmin")
    @ResponseBody
    public Map<String, Object> updateArticleStateAdmin(@RequestBody BrdVo brdVo) {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;
        String successMsg = "";

        try {

            if(brdVo.getMode().equals("restore")){
                brdVo.setMode("B");
            }else if(brdVo.getMode().equals("delete")){
                brdVo.setMode("D");
            }

            int sucCnt = 0;
            sucCnt = articleService.updateArticleStateAdmin(brdVo);

            if(brdVo.getArticleBeanList().size() == sucCnt){
                successResult =true;
                successMsg = sucCnt + " 개의 게시글 상태가 변경되었습니다.";
            }else{
                successResult =false;
                int failCnt = brdVo.getArticleBeanList().size() - sucCnt;
                successMsg = failCnt + " 개의 게시글 상태 변경이 실패 하였습니다.";
            }


        } catch (Exception e) {
        }

        resMap.put("successResult", successResult);
        resMap.put("successMsg", successMsg);
        return resMap;
    }



    /** 게시글 상세 정보 수정 */
    @PostMapping(value = "/updateArticleAdmin")
    @ResponseBody
    public Map<String, Object> updateArticleAdmin(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;

        try {

            // 게시글 만료여부 검사
            // 현재 시간 가져오기
            Timestamp nowTime = new Timestamp(System.currentTimeMillis());
            Timestamp expireDt = brdVo.getArticleBean().getExpireDt();
            if (expireDt != null && expireDt.before(nowTime)) {
                brdVo.getArticleBean().setExpireYn("Y");
            }


            // 업데이트 로직 호출
             articleService.updateArticleAdmin(brdVo);

            successResult = true;
            resMap.put("successMsg", "게시글이 성공적으로 업데이트되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            resMap.put("errorMsg", "게시글 업데이트 중 오류가 발생했습니다.");
        }

        return resMap;
    }


    /** 게시글의 댓글 리스트 조회 */
    @PostMapping(value = "/selectReplyListAdmin")
    @ResponseBody
    public Map<String, Object> selectReplyListAdmin(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;

        try {
            brdVo.setReplyBeanList(articleService.selectReplyListAdmin(brdVo));
            resMap.put("brdVo", brdVo );

        } catch (Exception e) {
        }

        return resMap;
    }



    /** 댓글 작성 */
    @PostMapping(value = "/addReply")
    @ResponseBody
    public Map<String, Object> addReply(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;

        try {

            /** 기본 값 세팅 */
            MakeUUID makeUUID = new MakeUUID();
            String replId = makeUUID.makeShortUUID("BR");

            // 고유 댓글 id
            brdVo.getReplyBean().setReplId(replId);

            // 생성 날짜
            Date date = new Date();
            Timestamp nowTime = new Timestamp(date.getTime());
            brdVo.getReplyBean().setCreateDt(nowTime);

            // 업뎃 날짜
            brdVo.getReplyBean().setUpdateDt(nowTime);

            // 상태 값
            brdVo.getReplyBean().setState("B");

            // 댓글 인서트
            articleService.insertReplyBean(brdVo);

            /** 게시글의 댓글수 갱신 */
            // 댓글 수 조회
            brdVo.getReplyBean().setAtclReplCnt(articleService.selectArticleReplCnt(brdVo));
            // 댓글 수 업데이트
            articleService.updateArticleReplCnt(brdVo);

            /** 댓글 리스트 재조회 */
            brdVo.setReplyBeanList(articleService.selectReplyListAdmin(brdVo));

            successResult = true;

            resMap.put("brdVo", brdVo);
            resMap.put("successResult", successResult);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resMap;
    }



    /** 댓글 상태 변경 */
    @PostMapping(value = "/updateReplyState")
    @ResponseBody
    public Map<String, Object> updateReplyState(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;
        String successMsg = "";

        try {

            if(brdVo.getMode().equals("restore")){
                brdVo.setMode("B");
            }else if(brdVo.getMode().equals("delete")){
                brdVo.setMode("D");
            }

            int sucCnt = 0;
            sucCnt = articleService.updateReplyState(brdVo);

            if(brdVo.getReplyBeanList().size() == sucCnt){
                successResult =true;
                successMsg = sucCnt + " 개의 댓글 상태가 변경되었습니다.";
            }else{
                successResult =false;
                int failCnt = brdVo.getArticleBeanList().size() - sucCnt;
                successMsg = failCnt + " 개의 댓글 상태 변경이 실패 하였습니다.";
            }

            successResult = true;
            resMap.put("successResult", successResult);
            resMap.put("successMsg", successMsg);

        } catch (Exception e) {
            e.printStackTrace();
        }

        return resMap;
    }















}
