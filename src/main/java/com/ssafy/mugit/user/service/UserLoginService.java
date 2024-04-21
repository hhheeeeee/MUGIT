package com.ssafy.mugit.user.service;

import com.ssafy.mugit.global.api.OAuthApi;
import com.ssafy.mugit.global.auth.CookieService;
import com.ssafy.mugit.global.auth.dto.UserInfoDto;
import com.ssafy.mugit.user.entity.User;
import com.ssafy.mugit.user.entity.type.SnsType;
import com.ssafy.mugit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLoginService {

    private final UserRepository userRepository;

    private final OAuthApi OAuthApi;

    private final CookieService cookieService;
    public HttpHeaders getLoginCookie(String token, SnsType snsType) {

        System.out.println("token = " + token);
        System.out.println("snsType = " + snsType);
        UserInfoDto userInfo = OAuthApi.getUserInfo(token, snsType);
        System.out.println("userInfo = " + userInfo);
        User user = userRepository.findBySnsIdAndSnsType(userInfo.getSnsId(), snsType);
        return cookieService.getLoginCookieHeader(user);
    }
}
