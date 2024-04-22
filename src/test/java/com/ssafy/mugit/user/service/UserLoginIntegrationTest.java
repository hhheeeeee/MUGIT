package com.ssafy.mugit.user.service;

import com.ssafy.mugit.global.api.OAuthApi;
import com.ssafy.mugit.global.auth.CookieService;
import com.ssafy.mugit.global.auth.dto.UserInfoDto;
import com.ssafy.mugit.global.dto.MessageDto;
import com.ssafy.mugit.global.handler.GlobalExceptionHandler;
import com.ssafy.mugit.user.controller.UserLoginController;
import com.ssafy.mugit.user.entity.type.SnsType;
import com.ssafy.mugit.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.reactive.server.WebTestClient.ResponseSpec;

import static org.mockito.BDDMockito.given;

@SpringBootTest
public class UserLoginIntegrationTest {
    @MockBean
    OAuthApi oAuthApi;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CookieService cookieService;
    @Autowired
    UserLoginService userLoginService;
    @Autowired
    UserLoginController userLoginController;
    WebTestClient webClient;

    @BeforeEach
    void setup() {
        webClient = WebTestClient
                .bindToController(userLoginController)
                .controllerAdvice(new GlobalExceptionHandler())
                .configureClient()
                .baseUrl("/api/users/")
                .build();
    }

    @Test
    @DisplayName("정상 로그인 테스트")
    void testLoginSuccess() {
        // given
        String token = "qwerasdf1234";
        UserInfoDto userInfo = new UserInfoDto("asdf1234", "test@test.com");
        given(oAuthApi.getUserInfo(token, SnsType.GOOGLE)).willReturn(userInfo);

        // when
        ResponseSpec result = webClient.get().uri("/login")
                .accept(MediaType.ALL)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .exchange();

        // then
        result.expectStatus().isOk()
                .expectHeader().valueMatches(HttpHeaders.SET_COOKIE, cookieService.getUserInfoCookie("isLogined", "true").toString())
                .expectBody(MessageDto.class).isEqualTo(new MessageDto("로그인 완료"));
    }
}
