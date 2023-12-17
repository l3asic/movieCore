package com.example.movieCore.login.vo;

import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.bean.TokenBean;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class LoginMemberVo implements Serializable {

    LoginMemberBean memberBean;

    TokenBean tokenBean;
}
