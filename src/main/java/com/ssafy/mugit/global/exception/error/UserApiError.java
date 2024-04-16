package com.ssafy.mugit.global.exception.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserApiError {
    ILLEGAL_SNS_TYPE("등록되지 않은 sns 타입입니다."),
    UNAUTHORIZED_BY_OAUTH("OAUTH 인증에 실패했습니다.");

    private final String message;
}
