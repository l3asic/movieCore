package com.example.movieCore.brd.controller;

import com.example.movieCore.brd.bean.BrdArticleBean;
import com.example.movieCore.brd.bean.BrdBoardBean;
import com.example.movieCore.brd.service.BrdArticleServiceImpl;
import com.example.movieCore.brd.vo.BrdVo;
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
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class BrdArticleController {

    private final BrdArticleServiceImpl articleService;

    private static final String UPLOAD_DIR = "/movieCore/uploadFiles/brd"; // 파일 업로드 경로


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
        resMap.put("brdVo",brdVo);

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
     * 게시글 상세내역 디비서 셀렉트
     */
    @PostMapping(value = "/selectArticleDetail")
    @ResponseBody
    public Map<String, Object> selectArticleDetail(HttpServletRequest request, HttpServletResponse response, BrdArticleBean articleBean) throws Exception {

        /** 게시글 리스트 조회디비서 셀렉트  */
        BrdVo brdVo = new BrdVo();
        brdVo.setArticleBean(articleBean);

        boolean succesResult = false;

        Map resMap = new HashMap<>();
        try {
            brdVo.setArticleBeanList(articleService.selectArticleDetail(brdVo));
            brdVo.setBoardBeanList(articleService.selectBoardList(brdVo));


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










    @PostMapping("/atclFileUpload")
    public Map<String, Object> uploadFile(@RequestParam("file") MultipartFile file, @RequestParam("brdVo") String brdVoString) {
        BrdVo brdVo = new Gson().fromJson(brdVoString, BrdVo.class);

        Map resMap = new HashMap<>();
        boolean succesResult = false;

        String fullPath = "";

        try {
            // 상세 폴더 경로 추가

            // 상세경로를 날짜로 포멧팅
            LocalDate today = LocalDate.now();
            String formattedToday = today.format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
            fullPath = UPLOAD_DIR + "/" +formattedToday;

            // 파일이 비어있지 않은 경우에만 업로드를 진행합니다.
            if (!file.isEmpty()) {
                // 업로드할 디렉토리가 없다면 생성합니다.
                Path uploadPath = Paths.get(fullPath);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // 파일을 지정된 경로에 저장합니다.
                Path filePath = uploadPath.resolve(file.getOriginalFilename());
                Files.copy(file.getInputStream(), filePath);


                /** 파일매핑 , 파일경로 테이블에 저장 코드 추가 할것 @@@@ */


                succesResult = true;

            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        resMap.put("succesResult", succesResult);

        return resMap;
    }





















    }
