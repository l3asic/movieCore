package com.example.movieCore.login.controller;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.service.LoginServiceImpl;
import com.example.movieCore.login.vo.LoginMemberVo;
import com.example.movieCore.utils.MakeFileBean;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import com.example.movieCore.utils.MakeUUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class LoginController {


    private final LoginServiceImpl loginService;

    private final PasswordEncoder passwordEncoder;

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


    /** 회원 정보 업데이트 시 */
    @PostMapping(value = "/updateMemberInfo")
    @ResponseBody
    public Map<String, Object> updateMemberInfo( LoginMemberBean memberBean) throws Exception{

        Map<String, Object> res = new HashMap<>();
        boolean successResult = false;


         try {

             // 비밀번호도 변경 시
             if(memberBean.getChangePassword().equals("true")){
                 /* password 인코딩*/
                 memberBean.setLoginPassword(passwordEncoder.encode(memberBean.getLoginPassword()));
             }

             /** 디비 업데이트 */
             LoginMemberVo memberVo = new LoginMemberVo();
             memberVo.setMemberBean(memberBean);
             loginService.updateMemberInfo(memberVo);
             successResult = true;

         }catch (Exception e){
             e.printStackTrace();

         }

        res.put("successResult", successResult);
        return res;

    }

    /** 프로필 사진 조회 */
    @PostMapping(value = "/selectProfileImg")
    @ResponseBody
    public Map<String, Object> selectProfileImg(@RequestBody LoginMemberBean memberInfo) throws Exception {

        boolean successResult = false;
        String successMsg = "";

        LoginMemberVo memVo = new LoginMemberVo();
        memVo.setMemberBean(memberInfo);

        Map<String, Object> resMap = new HashMap<>();

        try {
            memVo.getMemberBean().setFileBean(loginService.selectProfileImg(memVo));
            resMap.put("memVo", memVo);
            successResult = true;

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;
    }



    /** 프로필 사진 등록/변경 */
    @PostMapping("/profileImgUpload")
    public Map<String, Object> profileImgUpload(@RequestParam("file") MultipartFile file, @RequestParam("memberInfo") String memberInfoString) {
        LoginMemberBean memberInfo = new Gson().fromJson(memberInfoString, LoginMemberBean.class);

        Map resMap = new HashMap<>();
        boolean succesResult = false;

        LoginMemberVo memVo = new LoginMemberVo();
        memVo.setMemberBean(memberInfo);

        try {

            MakeFileBean makeFileBean = new MakeFileBean();

            // 파일 업로드 및 파일 빈 값 할당
            FileBean fileBean = makeFileBean.makingFileBean("MEM",file);
            memVo.getMemberBean().setFileBean(fileBean);

            // 프로필 사진 파일빈 디비 인서트
            loginService.insertFileBean(memVo);

            // 멤버  <-> 프로필 사진 파일 매핑 인서트
            loginService.insertFileBeanMap(memVo);

            succesResult =true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        resMap.put("succesResult", succesResult);

        return resMap;
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
