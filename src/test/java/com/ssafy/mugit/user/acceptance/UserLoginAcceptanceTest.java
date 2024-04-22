package com.ssafy.mugit.user.acceptance;

import com.ssafy.mugit.global.web.GlobalExceptionHandler;
import com.ssafy.mugit.global.web.api.OAuthApi;
import com.ssafy.mugit.global.web.dto.MessageDto;
import com.ssafy.mugit.user.controller.UserLoginController;
import com.ssafy.mugit.user.fixture.ProfileFixture;
import com.ssafy.mugit.user.fixture.UserFixture;
import com.ssafy.mugit.user.repository.ProfileRepository;
import com.ssafy.mugit.user.repository.UserRepository;
import com.ssafy.mugit.user.service.UserLoginService;
import com.ssafy.mugit.user.util.CookieUtil;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.test.web.reactive.server.WebTestClient.ResponseSpec;

@SpringBootTest(webEnvironment = WebEnvironment.DEFINED_PORT)
public class UserLoginAcceptanceTest {
    @Autowired
    @Qualifier("OAuthRestTemplateApi")
    OAuthApi oAuthApi;
    @Autowired
    UserRepository userRepository;
    @Autowired
    CookieUtil cookieUtil;
    @Autowired
    UserLoginService userLoginService;
    @Autowired
    UserLoginController userLoginController;

    WebTestClient webClient;
    @Autowired
    private ProfileRepository profileRepository;

    @BeforeEach
    void setup() {
        userLoginService = new UserLoginService(oAuthApi, userRepository, cookieUtil);
        userLoginController = new UserLoginController(userLoginService);
        webClient = WebTestClient
                .bindToController(userLoginController)
                .controllerAdvice(new GlobalExceptionHandler())
                .configureClient()
                .baseUrl("/api/users/")
                .build();
    }

    @BeforeEach
    void initValue(){
        userRepository.save(UserFixture.DEFAULT_LOGIN_USER.getUser(ProfileFixture.DEFAULT_PROFILE.getProfile()));
        profileRepository.save(ProfileFixture.DEFAULT_PROFILE.getProfile(UserFixture.DEFAULT_LOGIN_USER.getUser()));
    }

    @Test
    @DisplayName("정상 로그인 테스트")
    void testLoginSuccess() {
        // given
        String token = "qwerasdf1234";

        // when
        ResponseSpec result = webClient.get().uri("/login")
                .accept(MediaType.ALL)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .exchange();

        // then
        result.expectStatus().isOk()
                .expectHeader().valueMatches(HttpHeaders.SET_COOKIE, cookieUtil.getUserInfoCookie("isLogined", "true").toString())
                .expectBody(MessageDto.class).isEqualTo(new MessageDto("로그인 완료"));
    }

//    @AfterEach
//    void tearDown(){
//        userRepository.deleteAll();
//        profileRepository.deleteAll();
//    }

}
