package com.ssafy.mugit.domain.message.service;

import com.ssafy.mugit.domain.message.dto.SseMessageDto;
import com.ssafy.mugit.domain.message.dto.NotificationDto;
import com.ssafy.mugit.domain.sse.service.SseService;
import com.ssafy.mugit.infrastructure.repository.SseRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import static com.ssafy.mugit.domain.message.fixture.MessageDtoFixture.MESSAGE_DTO_01;
import static org.assertj.core.api.Assertions.assertThat;

class MessageServiceTest {

    SseRepository sseRepository = new SseRepository();

    SseService sseService = new SseService(10_000L, sseRepository);

    MessageService sut = new MessageService(sseService);

    @Test
    @DisplayName("메시지를 입력받아서 전송")
    void testSendMessage() {
        // given
        long userId = 1L;
        SseMessageDto<NotificationDto> sseMessageDto = MESSAGE_DTO_01.getFixture();

        // when
        sseService.subscribe(userId);
        SseEmitter sendEmitter = sut.send(sseMessageDto);

        // then
        assertThat(sendEmitter).isNotNull();
        assertThat(sendEmitter.getTimeout()).isEqualTo(10_000L);
        assertThat(sendEmitter).isEqualTo(sseRepository.findById(userId));
    }
}