package com.example.movieCore.brd.controller;

import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.service.BrdFolderServiceImpl;
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
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class BrdFolderController {

    private final BrdFolderServiceImpl folderService;


    /** 폴더 생성 시 */
    @PostMapping(value = "/createFolder")
    @ResponseBody
    public Map<String, Object> createFolder(HttpServletRequest request, HttpServletResponse response, BrdFolderBean folderBean) throws Exception{

        /** 기본값 세팅 */

        // 고유 id 생성 (folId)
        MakeUUID makeUUID = new MakeUUID();
        String folId = makeUUID.makeShortUUID("BF");    // BF = BoardFolder
        folderBean.setFolId(folId);

        // 폴더 상태
        folderBean.setState("B");

        // 폴더 생성일
        Date date = new Date();
        Timestamp nowTime = new Timestamp(date.getTime());
        folderBean.setCreateDt(nowTime);

        // 새로운 ODR 값 설정
        int newOdr = folderService.getMaxOdr() + 1; // getMaxOdr 메서드에서 최대 ODR 값을 가져온 후 +1
        folderBean.setOdr(newOdr);

        /** 폴더 최종 디비 인서트 */
        BrdVo brdVo = new BrdVo();
        brdVo.setFolderBean(folderBean);

        boolean succesResult = folderService.createFolder(brdVo);

        Map<String, Object> resMap = new HashMap<>();
        resMap.put("succesResult", succesResult);

        return resMap;
    }




    /** 모든 폴더 리스트 조회 */
    @PostMapping(value = "/selectAllFolderList")
    @ResponseBody
    public Map<String, Object> selectAllFolderList(HttpServletRequest request, HttpServletResponse response) throws Exception{

        boolean succesResult = false;

        BrdVo brdVo = new BrdVo();

        Map resMap = new HashMap<>();

        try {
            brdVo.setFolderBeanList(folderService.selectAllFolderList());
            resMap.put("brdVo",brdVo);
            succesResult = true;
        }catch (Exception e){
            e.printStackTrace();

        }

        resMap.put("succesResult",succesResult);

        return resMap;


    }

    /** 관리자 모듈 - 폴더 리스트 조회 */
    @PostMapping(value = "/selectFolderListAdmin")
    @ResponseBody
    public Map<String, Object> selectFolderListAdmin(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean succesResult = false;

        try {
            brdVo.setPaging(new Paging());
            brdVo.getPaging().setTotalItems(folderService.selectFolderListAdminTotalCnt(brdVo));

            // 페이지 이동시 (최초 조회시에는 패스)
            if(brdVo.getNewPage() != 0){
                // 페이지 이동 조회시 (setCurrentPage 로 페이징변수 갱신)
                brdVo.getPaging().setCurrentPage(brdVo.getNewPage());
            }

            brdVo.setFolderBeanList(folderService.selectFolderListAdmin(brdVo));
            resMap.put("brdVo", brdVo);
            succesResult = true;
        } catch (Exception e) {
        }

        resMap.put("succesResult", succesResult);
        return resMap;
    }




    /** 관리자 모듈 - 폴더 상태 변경 (삭제/ 원복) */
    @PostMapping(value = "/updateFolderStateAdmin")
    @ResponseBody
    public Map<String, Object> updateFolderStateAdmin(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;
        String successMsg = "";

        try {

            if ("restore".equals(brdVo.getMode())) {
                brdVo.setMode("B");
            } else if ("delete".equals(brdVo.getMode())) {
                brdVo.setMode("D");
            }

            int sucCnt = folderService.updateFolderStateAdmin(brdVo);

            if (brdVo.getFolderBeanList().size() == sucCnt) {
                successResult = true;
                successMsg = sucCnt + " 개의 폴더 상태가 변경되었습니다.";
            } else {
                successResult = false;
                int failCnt = brdVo.getFolderBeanList().size() - sucCnt;
                successMsg = failCnt + " 개의 폴더 상태 변경이 실패 하였습니다.";
            }

        } catch (Exception e) {
        }

        resMap.put("successResult", successResult);
        resMap.put("successMsg", successMsg);
        return resMap;
    }





    /** 관리자 모듈 - 폴더 순서 변경  */
    @PostMapping(value = "/updateFolderOrderAdmin")
    @ResponseBody
    public Map<String, Object> updateFolderOrderAdmin(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;

        try {

            for (BrdFolderBean folderBean : brdVo.getFolderBeanList()) {
                folderService.updateFolderOrderAdmin(folderBean);
            }

            successResult = true;


        } catch (Exception e) {
        }

        resMap.put("successResult", successResult);
        return resMap;
    }



    /** 관리자 모듈 - 폴더 명 변경  */
    @PostMapping(value = "/updateFolderName")
    @ResponseBody
    public Map<String, Object> updateFolderName(@RequestBody BrdVo brdVo) throws Exception {
        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;

        try {

            folderService.updateFolderName(brdVo);

            successResult = true;


        } catch (Exception e) {
        }

        resMap.put("successResult", successResult);
        return resMap;
    }









}
