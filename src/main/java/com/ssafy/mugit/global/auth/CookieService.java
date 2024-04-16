package com.ssafy.mugit.global.auth;

import com.ssafy.mugit.global.exception.GlobalApiException;
import com.ssafy.mugit.global.exception.UserApiException;
import com.ssafy.mugit.global.exception.error.GlobalApiError;
import com.ssafy.mugit.global.exception.error.UserApiError;
import com.ssafy.mugit.user.main.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class CookieService {

    private final JwtTokenUtil tokenService;

    @Value("${cookie.domain}")
    private String domainUrl;

    @Value("${cookie.period.access-token}")
    private long periodAccessTokenCookie;

    @Value("${cookie.period.refresh-token}")
    private long periodRefreshTokenCookie;

    public HttpHeaders getLoginCookie(User user) {
        HttpHeaders cookieHeaders = new HttpHeaders();

        List<String> cookies = new ArrayList<>();
        cookies.add(getAccessTokenCookie(user.getId()).toString());
        cookies.add(getRefreshTokenCookie(user.getId()).toString());
        cookies.add(getUserInfoCookie("isLogined", "true").toString());
        cookies.add(getUserInfoCookie("nickName", user.getProfile().getNickName()).toString());
        cookies.add(getUserInfoCookie("profileText", user.getProfile().getProfileText()).toString());
        cookies.add(getUserInfoCookie("profileImage", user.getProfile().getProfileImage()).toString());
        cookies.add(getUserInfoCookie("notificationCount", Integer.toString(user.getNotifications().size())).toString());

        cookies.forEach(cookie -> cookieHeaders.add(HttpHeaders.SET_COOKIE, cookie));

        return cookieHeaders;
    }

    public HttpHeaders getTokenCookie(User user) {
        HttpHeaders cookieHeaders = new HttpHeaders();

        List<String> cookies = new ArrayList<>();
        cookies.add(getAccessTokenCookie(user.getId()).toString());
        cookies.add(getRefreshTokenCookie(user.getId()).toString());

        cookies.forEach(cookie -> cookieHeaders.add(HttpHeaders.SET_COOKIE, cookie));

        return cookieHeaders;
    }

    private ResponseCookie getUserInfoCookie(String key, String value) {
        return ResponseCookie.from(key, value)
                .path("/")
                .domain(domainUrl)
                .sameSite("None")
                .secure(true)
                .maxAge(periodAccessTokenCookie)
                .build();
    }

    private ResponseCookie getAccessTokenCookie(Long id) {
        String accessToken = tokenService.generateAccessToken(id);
        return ResponseCookie.from("accessToken", accessToken)
                .path("/")
                .domain(domainUrl)
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .maxAge(periodAccessTokenCookie)
                .build();
    }

    private ResponseCookie getRefreshTokenCookie(Long id) {
        String refreshToken = tokenService.generateRefreshToken(id);
        return ResponseCookie.from("refreshToken", refreshToken)
                .path("/")
                .domain(domainUrl)
                .sameSite("None")
                .httpOnly(true)
                .secure(true)
                .maxAge(periodRefreshTokenCookie)
                .build();
    }
}
