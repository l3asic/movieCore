package com.example.movieCore.login.bean;

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

    private String address;

    private String addressInfo;

    private String email;

    private Date memCreateDate;

    private String memRole;

}
