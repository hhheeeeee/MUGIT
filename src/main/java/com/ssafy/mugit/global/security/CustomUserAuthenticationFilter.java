package com.ssafy.mugit.global.security;


import com.ssafy.mugit.auth.SessionKeys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static java.util.Objects.isNull;

@Component
@Slf4j
public class CustomUserAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Long userId = (Long) request.getSession().getAttribute(SessionKeys.LOGIN_USER_SESSION_ID.getKey());
        log.info("session user id : {}", userId);
        if (!isNull(userId)) {
            // 현재 별도 권한 없음
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(userId, userId, null));
        }

        filterChain.doFilter(request, response);
    }
}
