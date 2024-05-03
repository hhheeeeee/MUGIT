package com.ssafy.mugit.sse.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mugit.infrastructure.repository.SseRepository;
import com.ssafy.mugit.domain.sse.service.SseService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;


@Tag("notification")
@SpringBootTest
class SseServiceTest {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    SseRepository sseRepository;

    @Autowired
    SseService sut;

    @Test
    @DisplayName("[통합] Emitter 생성 및 저장, 조회")
    void TestCreateEmitter() {
        // given
        long userId = 1;

        // when
        sut.subscribe(userId);
        SseEmitter emitter = sseRepository.findById(userId);

        // then
        assertThat(emitter).isNotNull();
        assertThat(emitter.getTimeout()).isEqualTo(6000L);
    }
}