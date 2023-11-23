package com.example.movieCore.login.service;

import com.example.movieCore.login.mapperInterface.LoginMapper;
import com.example.movieCore.login.vo.LoginMemberVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl {

    @Autowired
    LoginMapper loginMapper;

    public boolean signUp(LoginMemberVo vo) {

        return loginMapper.signUp(vo);
    }
}
