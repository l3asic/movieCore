package com.example.movieCore.login.controller;

import com.example.movieCore.config.jwt.JwtFilter;
import com.example.movieCore.config.jwt.TokenProvider;
import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.bean.TokenBean;
import com.example.movieCore.login.service.LoginServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final LoginServiceImpl loginService;

    // 효인) 로그인
    @PostMapping("/authenticate")
    @ResponseBody
    public Map<String, Object> authorize(LoginMemberBean memberBean){
        TokenBean tokenBean = new TokenBean();
        HttpHeaders httpHeaders = new HttpHeaders();
        Map<String, Object> result = new HashMap<>();

        /* 추후 패스워드 확인 로직 추가 */

        /* 유저정보 token 만들기 전 객체에 할당 */

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(memberBean.getLoginId(), memberBean.getLoginPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        /* securityContextHolder에 저장 */
        SecurityContextHolder.getContext().setAuthentication(authentication);
        /* authentication사용해 jwt token 생성 */
        String jwt = tokenProvider.createToken(authentication);

        /* http header 토큰 추가 */
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        tokenBean.setToken(jwt);
        result.put("jwt", tokenBean);
        result.put("httpHeaders", httpHeaders);

        return result;
    }
}
