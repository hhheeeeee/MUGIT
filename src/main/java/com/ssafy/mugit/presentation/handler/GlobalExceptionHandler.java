package com.ssafy.mugit.presentation.handler;

import com.ssafy.mugit.presentation.dto.BasicMessageDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {

    // [400]validate 오류
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<BasicMessageDto> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(new BasicMessageDto("잘못된 요청값입니다."), HttpStatus.BAD_REQUEST);
    }

    // [400]cookie 오류
    @ExceptionHandler(MissingRequestCookieException.class)
    protected ResponseEntity<BasicMessageDto> handleMissingRequestCookieException(MissingRequestCookieException e) {
        return new ResponseEntity<>(new BasicMessageDto("요청에 필요한 쿠키가 없습니다."), HttpStatus.BAD_REQUEST);
    }

    // UserApiException 처리

    // [500]서버 오류
    @ExceptionHandler(InternalError.class)
    protected ResponseEntity<BasicMessageDto> handleInternalServerException(InternalError e) {
        return new ResponseEntity<>(new BasicMessageDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
