package com.ssafy.mugit.global.auth;

import com.ssafy.mugit.global.api.GoogleApi;
import com.ssafy.mugit.global.auth.dto.UserInfoDto;
import com.ssafy.mugit.global.exception.UserApiException;
import com.ssafy.mugit.global.exception.error.UserApiError;
import com.ssafy.mugit.user.main.entity.type.SnsType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthService {

    private final GoogleApi googleApi;

    public UserInfoDto getUserInfoDto(SnsType snsType, String token) {
        if (snsType.equals(SnsType.GOOGLE)){
            return googleApi.getUserInfo(token).block();
        } else {
            throw new UserApiException(UserApiError.ILLEGAL_SNS_TYPE);
        }
    }
}
