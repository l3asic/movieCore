package com.example.movieCore.login.controller;

import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.service.LoginServiceImpl;
import com.example.movieCore.login.vo.LoginMemberVo;
import lombok.RequiredArgsConstructor;
import com.example.movieCore.utils.MakeUUID;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class LoginController {

    @Autowired
    private LoginServiceImpl loginService;

    /** 회원 가입시 */
    @PostMapping(value = "/signUp")
    @ResponseBody
    public Map<String, Object> signUp(HttpServletRequest request, HttpServletResponse response, LoginMemberBean memberBean) throws Exception{

        /** 추가 값 세팅 */

        // 고유 id 생성 (memId)
        MakeUUID makeUUID = new MakeUUID();
        String memId = makeUUID.makeShortUUID("MEM");
        memberBean.setMemId(memId);

        // 가입일 생성
        Date memCreateDate = new Date();
        memberBean.setMemCreateDate(memCreateDate);


        /** 디비에 최종 인서트 */
        LoginMemberVo memberVo = new LoginMemberVo();
        memberVo.setMemberBean(memberBean);

        boolean succesResult = false;

        succesResult = loginService.signUp(memberVo);

        Map resMap = new HashMap();
        resMap.put("succesResult",succesResult);
        resMap.put("memberVo",memberVo);




        return resMap;




    }


}
