package com.example.movieCore.login.service;

import com.example.movieCore.login.bean.LoginMemberBean;
import com.example.movieCore.login.mapperInterface.LoginMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

/** 효인)
 * 스프링시큐리티 사용시 필수 (규격)
 * UserDetailsService 상속 필수
 * db 연동 부분 (로그인시 등에 호출하여 사용)
 *
 * */
@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final LoginMapper loginMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginMemberBean memberBean = loginMapper.findByUsername(username); // 효인) username 은 현재 우리쪽 로그인 id 이다
        if (memberBean == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        /** 효인) 사용자 권한에 관한 부분 (리스트구조) */
        List<GrantedAuthority> grantedAuthorities = Collections.singletonList(new SimpleGrantedAuthority(memberBean.getMemRole()));

        return new User(  // 효인) User 는  스프링 자체 유저 vo 이다 ,  규격을 맞게 해야한다 (아닐시 커스텀)
                username,
                memberBean.getLoginPassword(),
                grantedAuthorities
        );
    }
}
