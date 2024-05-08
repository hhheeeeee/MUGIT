package com.ssafy.mugit.sse.service;

import com.ssafy.mugit.domain.exception.SseException;
import com.ssafy.mugit.domain.exception.error.SseError;
import com.ssafy.mugit.domain.message.dto.NotificationDto;
import com.ssafy.mugit.domain.sse.service.SseService;
import com.ssafy.mugit.infrastructure.dto.SseMessageDto;
import com.ssafy.mugit.infrastructure.repository.SseQueueContainerRepository;
import com.ssafy.mugit.infrastructure.repository.SseQueueContainer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

import static com.ssafy.mugit.domain.message.fixture.SseMessageDtoFixture.MESSAGE_DTO_01;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.willThrow;
import static org.mockito.Mockito.*;


@Tag("notification")
@ExtendWith(MockitoExtension.class)
class SseServiceTest {

    @Mock
    SseEmitter mockEmitter;

    @Mock
    SseEmitter mockEmitter2;

    SseQueueContainerRepository sseQueueContainerRepository;

    SseService sut;

    @BeforeEach
    void setUp() {
        sseQueueContainerRepository = new SseQueueContainerRepository();
        sut = new SseService(10000L, sseQueueContainerRepository);
    }

    @Test
    @DisplayName("[통합] Emitter 생성 및 저장, 조회")
    void TestCreateEmitter() throws IOException {
        // given
        long userId = 1;

        // when
        sut.subscribe(userId);
        SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
        SseEmitter emitter = sseQueueContainer.getSseEmitter();

        // then
        assertThat(emitter).isNotNull();
        assertThat(emitter.getTimeout()).isEqualTo(10000L);
    }

    @Test
    @DisplayName("[통합] MessageQueue 생성하고 전송 실패 시 현시간과 비교 후 10초 이상이면 오류")
    void testFailAndError() throws IOException {
        // given
        Long userId = 1L;
        sseQueueContainerRepository.save(userId, mockEmitter);
        SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
        sseQueueContainer.setLastEmitterCreateTime(0L);
        SseMessageDto<?> message = MESSAGE_DTO_01.getFixture();

        // when
        willThrow(new IOException()).given(mockEmitter).send((SseEmitter.SseEventBuilder) any());

        // then
        assertThatThrownBy(() -> sut.send(userId, message))
                .isInstanceOf(SseException.class).hasMessage(SseError.EXCEED_SSE_EMITTER_TIMEOUT.getMessage());
    }

    @Test
    @DisplayName("[통합] MessageQueue 생성하고 전송 실패 시 현시간과 비교 후 10초 이내이면 저장")
    void testFailAndOfferInQueue() throws IOException {
        // given
        Long userId = 1L;
        sseQueueContainerRepository.save(userId, mockEmitter);
        SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
        sseQueueContainer.setLastEmitterCreateTime(System.currentTimeMillis());
        SseMessageDto<NotificationDto> dto = MESSAGE_DTO_01.getFixture();

        // when
        willThrow(new IOException()).given(mockEmitter).send((SseEmitter.SseEventBuilder) any());
        sut.send(userId, dto);

        // then
        assertThat(sseQueueContainer.getMessageQueue().isEmpty()).isFalse();
        Object message2 = sseQueueContainer.getMessageQueue().poll();
        assertThat(message2).isEqualTo(dto);
    }

    @Test
    @DisplayName("[통합] 메시지 쌓여있을때 연결 시 해당 메시지 모두 전송")
    void testPollingFailMessage() throws IOException {
        // given
        Long userId = 1L;
        sseQueueContainerRepository.save(userId, mockEmitter);
        SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
        sseQueueContainer.setLastEmitterCreateTime(System.currentTimeMillis());
        SseMessageDto<NotificationDto> message = MESSAGE_DTO_01.getFixture();
        willThrow(new IOException()).given(mockEmitter).send((SseEmitter.SseEventBuilder) any());
        sut.send(userId, message);
        System.out.println("queue size = " + sseQueueContainer.getMessageQueue().size());

        // when
        sut.subscribe(userId, mockEmitter2);

        // then
        verify(mockEmitter2, times(2)).send((SseEmitter.SseEventBuilder) any());
    }
}