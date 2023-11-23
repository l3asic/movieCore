package com.example.movieCore.login.mapperInterface;

import com.example.movieCore.login.vo.LoginMemberVo;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LoginMapper {

    public boolean signUp(LoginMemberVo vo);


}
