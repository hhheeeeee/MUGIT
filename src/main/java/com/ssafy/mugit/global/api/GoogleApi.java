package com.ssafy.mugit.global.api;

import com.ssafy.mugit.global.auth.dto.UserInfoDto;
import com.ssafy.mugit.global.exception.UserApiException;
import com.ssafy.mugit.global.exception.error.UserApiError;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

import java.net.URI;

@Component
@Slf4j
@RequiredArgsConstructor
public class GoogleApi {
    private final WebClientFactory webClientFactory;

    public Mono<UserInfoDto> getUserInfo(String token) {
        URI uri = UriComponentsBuilder
                .fromUriString("https://www.googleapis.com/oauth2/v2/userinfo")
                .queryParam("access_token", token)
                .build()
                .toUri();

        return webClientFactory.getGoogleTokenWebClient()
                .get()
                .uri(uri)
                .retrieve()
                .bodyToMono(UserInfoDto.class)
                .doOnError(error -> {
                    log.error("Oauth 인증 실패, {}", error.getMessage());
                    throw new UserApiException(UserApiError.UNAUTHORIZED_BY_OAUTH);
                });
    }
}
