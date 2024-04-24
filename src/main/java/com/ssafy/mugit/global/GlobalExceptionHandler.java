package com.ssafy.mugit.global;

import com.ssafy.mugit.dto.MessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(CustomRecordException.class)
    public ResponseEntity<?> handlerRecordException(CustomRecordException e) {
        log.error("[Error] 커스텀 오류 발생 !!!");
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatusCode.valueOf(e.getCode()));
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> handlerIOException(IOException e) {
        log.error("[Error] IO 오류 발생 !!!");
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(InternalError.class)
    public ResponseEntity<?> handlerInternalError(InternalError e) {
        log.error("[Error] 내부 서버 오류 발생 !!!");
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
