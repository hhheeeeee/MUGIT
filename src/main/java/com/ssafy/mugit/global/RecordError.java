package com.ssafy.mugit.global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum RecordError {

    SESSIONID_NOT_EXISTED(401, "SessionId is not existed."),
    SESSIONID_ILLEGAL(403, "SessionId is illegal.");

    private final int code;
    private final String message;
}
