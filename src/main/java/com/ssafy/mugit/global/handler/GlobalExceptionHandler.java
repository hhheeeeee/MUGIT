package com.ssafy.mugit.global.handler;

import com.ssafy.mugit.global.dto.MessageDto;
import com.ssafy.mugit.global.exception.UserApiException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.OAuth2AuthorizationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@ResponseBody
@Slf4j
public class GlobalExceptionHandler {

    // [400]validate 오류
    @ExceptionHandler(MethodArgumentNotValidException.class)
    protected ResponseEntity<MessageDto> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    // UserApiException 처리
    @ExceptionHandler(UserApiException.class)
    protected ResponseEntity<MessageDto> handleUserApiException(UserApiException e) {
        switch (e.getUserApiError()) {
            case ILLEGAL_SNS_TYPE -> {
                log.error(e.getMessage());
                return new ResponseEntity<>(new MessageDto("잘못된 Sns Type 입력"), HttpStatus.BAD_REQUEST);
            }
            case UNAUTHORIZED_BY_OAUTH -> {
                log.error(e.getMessage());
                return new ResponseEntity<>(new MessageDto("OAuth 인증 실패"), HttpStatus.UNAUTHORIZED);
            }
            case DUPLICATE_NICK_NAME -> {
                log.error(e.getMessage());
                return new ResponseEntity<>(new MessageDto("중복 닉네임"), HttpStatus.CONFLICT);
            }
            default -> {
                return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
    }

    // [500]서버 오류
    @ExceptionHandler(InternalError.class)
    protected ResponseEntity<MessageDto> handleInternalServerException(InternalError e) {
        return new ResponseEntity<>(new MessageDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
