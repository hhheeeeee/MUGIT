package com.ssafy.mugit.domain.message.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mugit.domain.message.fixture.MessageDtoFixture;
import jakarta.servlet.http.Cookie;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.mugit.domain.message.fixture.MessageDtoFixture.MESSAGE_DTO_01;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class MessageApiControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    @DisplayName("api 전송 테스트 : 로그인 안되어있을때(404)")
    @Order(1)
    void testApi404() throws Exception {
        // given
        long userId = 1L;
        String content = objectMapper.writeValueAsString(MESSAGE_DTO_01.getFixture());

        // when
        ResultActions perform = mvc.perform(post("/message")
                .contentType(APPLICATION_JSON)
                .content(content));

        // then
        perform
                .andExpect(content().json("{\"message\":\"연결을 찾을 수 없습니다.\"}"))
                .andExpect(status().is(404));
    }

    @Test
    @DisplayName("api 전송 테스트")
    @Order(2)
    void testApi200() throws Exception {
        // given
        Cookie[] cookies = mvc.perform(get("/mock/login")).andReturn().getResponse().getCookies();
        mvc.perform(get("/sse/subscribe").cookie(cookies));
        String content = objectMapper.writeValueAsString(MESSAGE_DTO_01.getFixture());

        // when
        ResultActions perform = mvc.perform(post("/message")
                .contentType("application/json")
                .content(content));

        // then
        perform.andExpect(status().is(200))
                .andExpect(content().json("{\"message\":\"알림 전송완료\"}"));
    }

}