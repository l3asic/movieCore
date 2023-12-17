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

@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final LoginMapper loginMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginMemberBean memberBean = loginMapper.findByUsername(username);
        if (memberBean == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        List<GrantedAuthority> grantedAuthorities = Collections.singletonList(new SimpleGrantedAuthority(memberBean.getMemRole()));

        return new User(
                username,
                memberBean.getLoginPassword(),
                grantedAuthorities
        );
    }
}
