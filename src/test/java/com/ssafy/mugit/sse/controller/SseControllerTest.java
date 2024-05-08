package com.ssafy.mugit.sse.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mugit.infrastructure.repository.SseQueueContainerRepository;
import com.ssafy.mugit.domain.sse.service.SseService;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import static com.ssafy.mugit.sse.fixture.UserSessionDtoFixture.USER_SESSION_DTO_01;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.head;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class SseControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    SseQueueContainerRepository sseQueueContainerRepository;

    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    private SseService sseService;

    @Test
    @DisplayName("SSE 연결 테스트")
    void sseConnectionTest() throws Exception {
        // given
        Cookie[] loginCookies = mockMvc.perform(get("/mock/login")).andReturn().getResponse().getCookies();

        // when
        ResultActions perform = mockMvc.perform(get("/sse/subscribe").cookie(loginCookies));
        SseEmitter emitter = sseQueueContainerRepository.findById(USER_SESSION_DTO_01.getFixture().getId()).getSseEmitter();

        // then
        perform.andExpect(status().isOk())
                .andExpect(header().stringValues(CONTENT_TYPE, "text/event-stream; charset=UTF-8"));
        assertThat(emitter).isNotNull();
    }
}