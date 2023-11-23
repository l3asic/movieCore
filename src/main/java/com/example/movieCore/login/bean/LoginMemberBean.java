package com.example.movieCore.login.bean;

import java.io.Serializable;
import java.util.Date;

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




    public String getMemId() {
        return memId;
    }

    public void setMemId(String memId) {
        this.memId = memId;
    }

    public String getLoginId() {
        return loginId;
    }

    public void setLoginId(String loginId) {
        this.loginId = loginId;
    }

    public String getLoginPassword() {
        return loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }

    public String getMemName() {
        return memName;
    }

    public void setMemName(String memName) {
        this.memName = memName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressInfo() {
        return addressInfo;
    }

    public void setAddressInfo(String addressInfo) {
        this.addressInfo = addressInfo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getMemCreateDate() {
        return memCreateDate;
    }

    public void setMemCreateDate(Date memCreateDate) {
        this.memCreateDate = memCreateDate;
    }


}
