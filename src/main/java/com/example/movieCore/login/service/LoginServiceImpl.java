package com.example.movieCore.login.service;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.mapperInterface.LoginMapper;
import com.example.movieCore.login.vo.LoginMemberVo;
import com.example.movieCore.utils.MakeUUID;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoginServiceImpl {
    private final Logger logger = LoggerFactory.getLogger(LoginServiceImpl.class);
    private final PasswordEncoder passwordEncoder;
    private final LoginMapper loginMapper;

    public Map<String, Object> signUp(LoginMemberVo vo) {
        Map<String, Object> result = new HashMap<>();

        /* 제약조건 통한 중복체크  */
        try {
           /* password 인코딩*/
            vo.getMemberBean().setLoginPassword(passwordEncoder.encode(vo.getMemberBean().getLoginPassword()));

            if (loginMapper.signUp(vo)){
                result.put("memberVo", vo);
                result.put("succesResult", true);
            }else {
                result.put("err", "에러가 발생했습니다.");
                result.put("succesResult", false);
            }
        }catch (DuplicateKeyException e){
            logger.error("Dublicate Error: ", e);
            result.put("err", "중복된 아이디입니다.");
        }
        return result;
    }

    public LoginMemberBean getMemInfo(LoginMemberBean loginMemberBean){
        return loginMapper.getMemInfo(loginMemberBean);
    }

    public void updateMemberInfo(LoginMemberVo memberVo) {
        loginMapper.updateMemberInfo(memberVo);
    }

    public FileBean selectProfileImg(LoginMemberVo memVo) {
        return loginMapper.selectProfileImg(memVo);
    }

    public void insertFileBean(LoginMemberVo memVo) {
        loginMapper.insertFileBean(memVo);
    }

    public void insertFileBeanMap(LoginMemberVo memVo) {
        loginMapper.insertFileBeanMap(memVo);
    }

    public ArrayList<LoginMemberBean> selectMemberList(LoginMemberVo memVo) {
        return loginMapper.selectMemberList(memVo);
    }

    public int updateMemberState(LoginMemberVo memVo) {
        return loginMapper.updateMemberState(memVo);
    }
}
