package com.example.movieCore.login.vo;

import com.example.movieCore.login.bean.LoginMemberBean;

import java.io.Serializable;

public class LoginMemberVo implements Serializable {


    LoginMemberBean memberBean;

    public LoginMemberBean getMemberBean() {
        return memberBean;
    }

    public void setMemberBean(LoginMemberBean memberBean) {
        this.memberBean = memberBean;
    }
}
