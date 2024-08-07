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

import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class LoginController {


    private final LoginServiceImpl loginService;

    private final PasswordEncoder passwordEncoder;

    MakeUUID makeUUID = new MakeUUID();

    /** 회원 가입시 */
    @PostMapping(value = "/signUp")
    @ResponseBody
    public Map<String, Object> signUp( LoginMemberBean memberBean) throws Exception{

        Map<String, Object> result = new HashMap<>();
        // 가입일 생성
        Date date = new Date();
        java.sql.Timestamp memCreateDate = new Timestamp(date.getTime());
        // 고유 id 생성 (memId)
        String memId = makeUUID.makeShortUUID("MEM");

        memberBean.setMemId(memId);
        memberBean.setMemCreateDate(memCreateDate);
        // 권한 기본값 (사용자)
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

            // 생성 날짜
            Date date = new Date();
            Timestamp nowTime = new Timestamp(date.getTime());
            memVo.getMemberBean().getFileBean().setCreateDt(nowTime);

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



    /**  유저 정보 리스트 조회 */
    @PostMapping(value = "/selectMemberList")
    @ResponseBody
    public Map<String, Object> selectMemberList(@RequestBody LoginMemberVo memVo) throws Exception {

        Map<String, Object> resMap = new HashMap<>();



        try {
            memVo.setMemberBeanList(loginService.selectMemberList(memVo));

            resMap.put("memVo", memVo);
            resMap.put("success", "success");
        }catch (Exception e){
            resMap.put("success", "fail");
        }


        return resMap;

    }

    /** 관리자 모듈 - 영화 상태값 정상/삭제로 변경 */
    @PostMapping(value = "/updateMemberState")
    @ResponseBody
    public Map<String, Object> updateMemberState(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        String successMsg = "";
        Map<String, Object> resMap = new HashMap<>();

        try {

            if(memVo.getMode().equals("restore")){
                memVo.setMode("B");
            }else if(memVo.getMode().equals("delete")){
                memVo.setMode("D");
            }

            int sucCnt = 0;
            sucCnt = loginService.updateMemberState(memVo);

            if(memVo.getMemberBeanList().size() == sucCnt){
                successResult =true;
                successMsg = sucCnt + " 개의 영화 상태가 변경되었습니다.";
            }else{
                successResult =false;
                int failCnt = memVo.getMemberBeanList().size() - sucCnt;
                successMsg = failCnt + " 개의 영화 상태 변경이 실패 하였습니다.";
            }

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);
        resMap.put("successMsg", successMsg);

        return resMap;
    }




    /**
     * 사용자 정보 업데이트
     */
    @PostMapping("/updateMember")
    @ResponseBody
    public Map<String, Object> updateMember(
            @RequestParam(value = "profileImage", required = false) MultipartFile profileImage,
            @RequestParam("memberBean") String memberBeanString) {

        // memberBean 문자열을 객체로 변환
        LoginMemberBean memberBean = new Gson().fromJson(memberBeanString, LoginMemberBean.class);

        Map<String, Object> resMap = new HashMap<>();
        boolean successResult = false;

        LoginMemberVo memVo = new LoginMemberVo();
        memVo.setMemberBean(memberBean);

        try {
            // 비밀번호 변경 로직 추가
            if (memberBean.getChangePassword() != null && memberBean.getChangePassword().equals("true") && memberBean.getLoginPassword() != null) {
                memberBean.setLoginPassword(passwordEncoder.encode(memberBean.getLoginPassword()));
            }

            // 사용자 정보 업데이트
            loginService.updateMemberInfo(memVo);

            // 프로필 이미지 처리
            if (profileImage != null && !profileImage.isEmpty()) {
                MakeFileBean makeFileBean = new MakeFileBean();
                FileBean fileBean = makeFileBean.makingFileBean("MEM", profileImage);
                memVo.getMemberBean().setFileBean(fileBean);


                // 생성 날짜
                Date date = new Date();
                Timestamp nowTime = new Timestamp(date.getTime());
                memVo.getMemberBean().getFileBean().setCreateDt(nowTime);

                loginService.insertFileBean(memVo);

                loginService.insertFileBeanMap(memVo);
            }

            successResult = true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        resMap.put("successResult", successResult);
        return resMap;
    }




    /** 이메일 인증 코드 전송 */
    @PostMapping(value = "/sendVerificationEmail")
    @ResponseBody
    public Map<String, Object> sendVerificationEmail(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        try {

            // 인증 코드 생성
            String verificationCode = makeUUID.makeShortUUID("");
            String codeText = "Movie Core 에서 보낸 이메일 인증 코드 입니다. \n\n" +
                    "인증 코드 : " + verificationCode +
                    "\n\n 코드를 인증 입력칸에 작성하고 확인을 눌러주세요";

            // 인증코드 메일 전송
            loginService.sendEmail(memVo.getMemberBean().getEmail(), "MovieCore 계정 이메일 인증 코드", codeText);

            resMap.put("verificationCode", verificationCode);
            successResult =true;

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;
    }



    /** 이메일 인증 정보 업데이트 */
    @PostMapping(value = "/updateMemberEmail")
    @ResponseBody
    public Map<String, Object> updateMemberEmail(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        try {

            loginService.updateMemberEmail(memVo);

            successResult =true;

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;
    }


    /** email로 사용자 정보들 조회 */
    @PostMapping(value = "/selectMemberListByEmail")
    @ResponseBody
    public Map<String, Object> selectMemberListByEmail(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        try {

            memVo.setMemberBeanList(loginService.selectMemberListByEmail(memVo));
            resMap.put("memVo", memVo);

            successResult =true;

        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;
    }



    /** 사용자 비밀번호 초기화  */
    @PostMapping(value = "/resetPassword")
    @ResponseBody
    public Map<String, Object> resetPassword(@RequestBody LoginMemberVo memVo) throws Exception {

        boolean successResult = false;
        Map<String, Object> resMap = new HashMap<>();

        try {

            // loginId 와 email이 올바르게 일치하는지 확인
            int sucCnt = 0;
            sucCnt = loginService.checkLoginIdEmail(memVo);


            if(sucCnt > 0){

                // 새로운 비밀번호 생성
                String newPw = makeUUID.makeShortUUID("pw");
                memVo.getMemberBean().setLoginPassword(newPw);

                /* password 인코딩*/
                memVo.getMemberBean().setLoginPassword(passwordEncoder.encode(memVo.getMemberBean().getLoginPassword()));


                // 비밀번호 디비 업데이트
                loginService.updatePassword(memVo);


                // 암호화 안 된 비밀번호 전달
                memVo.getMemberBean().setLoginPassword(newPw);

                resMap.put("memVo", memVo);





                successResult =true;


            }else{

            }





        }catch (Exception e){

        }

        resMap.put("successResult", successResult);

        return resMap;
    }







}
