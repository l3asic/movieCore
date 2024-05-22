package com.example.movieCore.login.bean;

import com.example.movieCore.cmm.FileBean;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class LoginMemberBean implements Serializable {

    private String memId;

    private String loginId;

    private String loginPassword;

    private String memName;

    private String gender;

    private String state;

    private String auth;

    private String kakaoId;

    private String naverId;


    private String address;

    private String addressInfo;

    private String email;

    private Date memCreateDate;

    private String memRole;
    
    // 비밀번호 변경 시 구분 값
    private String changePassword;


    // 파일 빈
    private FileBean fileBean;
    
    

}
