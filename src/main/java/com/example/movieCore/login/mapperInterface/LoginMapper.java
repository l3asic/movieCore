package com.example.movieCore.login.mapperInterface;

import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.vo.LoginMemberVo;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface LoginMapper {

    public boolean signUp(LoginMemberVo vo);

    public LoginMemberBean getMemInfo(LoginMemberBean loginMemberBean);

    public LoginMemberBean findByUsername(String username);

    public List<LoginMemberVo> getAllInfo();
}
