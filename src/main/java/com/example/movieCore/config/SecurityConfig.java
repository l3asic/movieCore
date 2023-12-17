package com.example.movieCore.config;

import com.example.movieCore.config.jwt.JwtAccessDeniedHandler;
import com.example.movieCore.config.jwt.JwtAuthenticationEntryPoint;
import com.example.movieCore.config.jwt.JwtSecurityConfig;
import com.example.movieCore.config.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint  jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CorsConfig corsConfig;

    @Bean
    public PasswordEncoder passwordEncoder(){
        // BCryptPasswordEncoder 사용(pw)
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                //token 사용이기 때문에 csrf 사용안함
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                // session 사용 안함
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                // HttpServletRequest 사용접속 요청 설정
                .authorizeHttpRequests()
                .requestMatchers("/authenticate").permitAll()
                .requestMatchers("/allInfo").permitAll()
                .requestMatchers("/signUp").permitAll()
                .anyRequest().authenticated() // 그 외 인증 없이 접근X

                .and()
                .addFilter(corsConfig.corsFilter())
                .apply(new JwtSecurityConfig(tokenProvider));

        return httpSecurity.build();
    }
}
