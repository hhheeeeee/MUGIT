package com.ssafy.mugit.user.controller;

import com.ssafy.mugit.global.web.dto.MessageDto;
import com.ssafy.mugit.user.entity.type.SnsType;
import com.ssafy.mugit.user.service.UserLoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserLoginController {
    private final UserLoginService userLoginService;

    @GetMapping("/login")
    public ResponseEntity<MessageDto> login(
            @RequestParam(defaultValue = "GOOGLE") SnsType snsType,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String token){
        HttpHeaders cookieHeaders = userLoginService.loginAndGetCookieHeader(token, snsType);
        return ResponseEntity.status(200)
                .headers(cookieHeaders)
                .body(new MessageDto("로그인 완료"));
    }
}
