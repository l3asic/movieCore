package com.example.movieCore.brd.controller;

import com.example.movieCore.brd.bean.BrdFolderBean;
import com.example.movieCore.brd.service.BrdFolderServiceImpl;
import com.example.movieCore.brd.vo.BrdVo;
import com.example.movieCore.utils.MakeUUID;
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
        folderBean.setCreateDt(new Date());





        /** 추가 임시 값 세팅 추후 삭제(변경)할 것*/

        // 회원 id
        folderBean.setMemId("001");

        // 부모 폴더 id
        folderBean.setParentFolder(folId);

        // 폴더 경로
        folderBean.setFolLoc(folId);

        // 폴더 뎁스
        folderBean.setDepth(0);

        // 폴더 순서
        folderBean.setOdr(0);



        /** 폴더 최종 디비 인서트 */
        BrdVo brdVo = new BrdVo();
        brdVo.setFolderBean(folderBean);

        boolean succesResult = false;


        succesResult = folderService.createFolder(brdVo);

        Map resMap = new HashMap<>();
        resMap.put("succesResult",succesResult);

        return resMap;


    }

}
