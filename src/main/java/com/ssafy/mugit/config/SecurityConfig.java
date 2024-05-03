package com.ssafy.mugit.config;

import com.ssafy.mugit.infrastructure.security.CustomAuthorizeHttpRequestsFilter;
import com.ssafy.mugit.infrastructure.security.CustomOncePerRequestFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomAuthorizeHttpRequestsFilter customAuthorizeHttpRequestsFilter;
    private final CustomOncePerRequestFilter customOncePerRequestFilter;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                // Authorize Filter
                .authorizeHttpRequests(customAuthorizeHttpRequestsFilter.regist())

                // Make Authentication Object by Redis Session
                .addFilterBefore(customOncePerRequestFilter, UsernamePasswordAuthenticationFilter.class)

                // disable form login
                .formLogin((AbstractHttpConfigurer::disable))

                .csrf(AbstractHttpConfigurer::disable)

                .build();
    }

}
