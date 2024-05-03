package com.ssafy.mugit.sse.repository;

import com.ssafy.mugit.domain.exception.SseException;
import com.ssafy.mugit.infrastructure.repository.SseRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import static com.ssafy.mugit.domain.exception.error.SseError.SSE_EMITTER_NOT_FOUND;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class SseRepositoryTest {

    SseRepository sut;

    @BeforeEach
    void setUp() {
        sut = new SseRepository();
    }

    @Test
    @DisplayName("Emitter 없을때 조회 시 오류")
    void testNotFoundEmitter() {
        // given
        long userId = 1;

        // when
        assertThatThrownBy(() -> sut.findById(userId))

                // then
                .isInstanceOf(SseException.class)
                .hasMessageContaining(SSE_EMITTER_NOT_FOUND.getMessage());

    }

    @Test
    @DisplayName("Emitter 조회")
    void testFindEmitter() {
        // given
        long userId = 1;

        // when
        sut.save(userId, new SseEmitter(10000L));
        SseEmitter emitterInCache = sut.findById(userId);

        // then
        assertThat(emitterInCache).isNotNull();
        assertThat(emitterInCache.getTimeout()).isEqualTo(10000L);
    }

    @Test
    @DisplayName("Emitter 삭제")
    void testDeleteEmitter() {
        // given
        long userId = 1;

        // when
        sut.deleteById(userId);

        // then
        assertThatThrownBy(() -> sut.findById(userId))
                .isInstanceOf(SseException.class)
                .hasMessageContaining(SSE_EMITTER_NOT_FOUND.getMessage());
    }

}