package com.example.movieCore.login.mapperInterface;

import com.example.movieCore.cmm.FileBean;
import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.vo.LoginMemberVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper
public interface LoginMapper {

    public boolean signUp(LoginMemberVo vo);

    public LoginMemberBean getMemInfo(LoginMemberBean loginMemberBean);

    public LoginMemberBean findByUsername(String username);

    public List<LoginMemberVo> getAllInfo();

    void updateMemberInfo(LoginMemberVo memberVo);

    FileBean selectProfileImg(LoginMemberVo memVo);

    void insertFileBean(LoginMemberVo memVo);

    void insertFileBeanMap(LoginMemberVo memVo);

    ArrayList<LoginMemberBean> selectMemberList(LoginMemberVo memVo);

    int updateMemberState(LoginMemberVo memVo);

    void updateMemberEmail(LoginMemberVo memVo);

    ArrayList<LoginMemberBean> selectMemberListByEmail(LoginMemberVo memVo);

    int checkLoginIdEmail(LoginMemberVo memVo);

    void updatePassword(LoginMemberVo memVo);
}
