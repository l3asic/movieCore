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

    /** 효인) 스프링 시큐리티 필터체인 */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                //token 사용이기 때문에 csrf 사용안함
                .csrf().disable()
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler) // 효인) 비인가 시 사용안함 처리

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
                .requestMatchers("/authenticate").permitAll() // 효인) 아무나 다 들어오는 설정   (3줄)
                .requestMatchers("/").permitAll() // 효인) 메인은 아무나 들어오게 추가하는 코드

                .requestMatchers("/selectMovieList").permitAll() // 효인)  영화 리스트 조회 호출 url 임시 허용


                .requestMatchers("/allInfo").permitAll()
                .requestMatchers("/signUp").permitAll()
                
                // 효인) 권한으로 페이지 허용 예시
//                .requestMatchers("/admin").hasRole("ADMIN") // 관리자만 관리자 페이지접근 허용
//                .requestMatchers("/user").hasRole("USER")   // 유저만 유저페이지 접근허용
//                .requestMatchers("/user").hasAnyRole()  // 아무나 접근허용
                
                
                .anyRequest().authenticated() // 그 외 인증 없이 접근X
                

                .and()
                .addFilter(corsConfig.corsFilter())
                .apply(new JwtSecurityConfig(tokenProvider)); // 효인) 토큰 호출

        return httpSecurity.build();
    }
}
