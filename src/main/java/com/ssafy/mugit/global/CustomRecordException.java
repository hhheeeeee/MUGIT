package com.ssafy.mugit.global;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
public class CustomRecordException extends RuntimeException {

    private final RecordError recordError;
    private final int code;
    private final String message;

    public CustomRecordException(RecordError recordError) {
        this.recordError = recordError;
        this.code = recordError.getCode();
        this.message = recordError.getMessage();
    }

}
