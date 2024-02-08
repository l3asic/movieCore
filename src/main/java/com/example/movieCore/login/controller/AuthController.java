package com.example.movieCore.login.controller;

import com.example.movieCore.config.jwt.JwtFilter;
import com.example.movieCore.config.jwt.TokenProvider;
import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.bean.TokenBean;
import com.example.movieCore.login.service.LoginServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
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


    @PostMapping("/authenticate")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> authorize(LoginMemberBean memberBean) {
        Map<String, Object> result = new HashMap<>();

        try {
            // 인증 시도
            Authentication authentication = authenticationManagerBuilder
                    .getObject()
                    .authenticate(new UsernamePasswordAuthenticationToken(memberBean.getLoginId(), memberBean.getLoginPassword()));

            // 인증 성공 시
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = tokenProvider.createToken(authentication);

            // 응답 생성
            TokenBean tokenBean = new TokenBean();
            tokenBean.setToken(jwt);
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);
            
            
            // 사용자 정보 조회
            LoginMemberBean returnMemberBean = loginService.getMemInfo(memberBean);
            

            result.put("jwt", tokenBean);
            result.put("httpHeaders", httpHeaders);
            result.put("userId", memberBean.getLoginId());
            result.put("memberBean", returnMemberBean);
            result.put("loginStatus", "success");
            
                        return ResponseEntity.ok(result);
        } catch (BadCredentialsException e) {
            // 인증 실패 시
            result.put("error", "Bad credentials");
            result.put("loginStatus", "fail");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }






}
