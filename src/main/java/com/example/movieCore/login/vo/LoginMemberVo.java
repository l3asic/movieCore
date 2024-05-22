package com.example.movieCore.login.vo;

import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.bean.TokenBean;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.ArrayList;

@Getter
@Setter
public class LoginMemberVo implements Serializable {

    LoginMemberBean memberBean;

    ArrayList<LoginMemberBean> memberBeanList;

    TokenBean tokenBean;
}
