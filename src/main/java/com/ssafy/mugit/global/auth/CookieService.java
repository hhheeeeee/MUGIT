package com.ssafy.mugit.global.auth;

import com.ssafy.mugit.user.entity.Profile;
import com.ssafy.mugit.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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

    public HttpHeaders getLoginCookieHeader(User user) {
        HttpHeaders cookieHeaders = new HttpHeaders();
        Profile profile = user.getProfile();

        cookieHeaders.add(HttpHeaders.SET_COOKIE, getUserInfoCookie("isLogined", "true").toString());
        cookieHeaders.add(HttpHeaders.SET_COOKIE, getUserInfoCookie("nickName", profile.getNickName()).toString());
        cookieHeaders.add(HttpHeaders.SET_COOKIE, getUserInfoCookie("profileText", profile.getProfileText()).toString());
        cookieHeaders.add(HttpHeaders.SET_COOKIE, getUserInfoCookie("profileImage", profile.getProfileImage()).toString());

        return cookieHeaders;
    }

    public ResponseCookie getUserInfoCookie(String key, String value) {
        return ResponseCookie.from(key, URLEncoder.encode(value, StandardCharsets.UTF_8))
                .path("/")
                .domain(domainUrl)
                .sameSite("None")
                .secure(true)
                .maxAge(periodAccessTokenCookie)
                .build();
    }

    public HttpHeaders getTokenCookie(User user) {
        HttpHeaders cookieHeaders = new HttpHeaders();

        List<String> cookies = new ArrayList<>();
        cookies.add(getAccessTokenCookie(user.getId()).toString());
        cookies.add(getRefreshTokenCookie(user.getId()).toString());

        cookies.forEach(cookie -> cookieHeaders.add(HttpHeaders.SET_COOKIE, cookie));

        return cookieHeaders;
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
