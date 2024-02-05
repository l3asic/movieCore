package com.example.movieCore.login.controller;

import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.service.LoginServiceImpl;
import com.example.movieCore.login.vo.LoginMemberVo;
import lombok.RequiredArgsConstructor;
import com.example.movieCore.utils.MakeUUID;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class LoginController {


    private final LoginServiceImpl loginService;

    /** 회원 가입시 */
    @PostMapping(value = "/signUp")
    @ResponseBody
    public Map<String, Object> signUp( LoginMemberBean memberBean) throws Exception{

        Map<String, Object> result = new HashMap<>();
        // 가입일 생성
        Date memCreateDate = new Date();
        // 고유 id 생성 (memId)
        MakeUUID makeUUID = new MakeUUID();
        String memId = makeUUID.makeShortUUID("MEM");

        memberBean.setMemId(memId);
        memberBean.setMemCreateDate(memCreateDate);
        /* 임시 권한 배정 (추후 수정함)*/
        memberBean.setMemRole("ROLE_USER");



        /** 디비에 최종 인서트 */
        LoginMemberVo memberVo = new LoginMemberVo();
        memberVo.setMemberBean(memberBean);

        result = loginService.signUp(memberVo);

        return result;




    }

    /* test controller */
    /*@GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public Map<String, Object> getMyUserInfo(LoginMemberBean memberBean){
        Map<String, Object> result = new HashMap<>();
        LoginMemberBean memInfo = loginService.getMemInfo(memberBean);
        result.put("memInfo", memInfo);

        return result;
    }*/


}
