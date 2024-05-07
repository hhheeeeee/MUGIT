package com.ssafy.mugit.global.exception;

import com.ssafy.mugit.global.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.util.Arrays;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handlerRecordException(CustomException e) {
        log.error("[Error] 커스텀 오류 발생 !!!");
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatusCode.valueOf(e.getCode()));
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> handlerIOException(IOException e) {
        log.error("[Error] IO 오류 발생 !!!");
        log.error(Arrays.toString(e.getStackTrace()));
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InternalError.class)
    public ResponseEntity<?> handlerInternalError(InternalError e) {
        log.error("[Error] 내부 서버 오류 발생 !!!");
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
