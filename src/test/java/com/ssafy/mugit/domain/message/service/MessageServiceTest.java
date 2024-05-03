package com.ssafy.mugit.domain.message.service;

import com.ssafy.mugit.domain.message.dto.MessageDto;
import com.ssafy.mugit.domain.message.dto.NotificationDto;
import com.ssafy.mugit.domain.message.fixture.MessageDtoFixture;
import com.ssafy.mugit.domain.sse.service.SseEvent;
import com.ssafy.mugit.domain.sse.service.SseService;
import com.ssafy.mugit.infrastructure.repository.SseRepository;
import com.ssafy.mugit.presentation.dto.BasicMessageDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;
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
        MessageDto<NotificationDto> messageDto = MESSAGE_DTO_01.getFixture();

        // when
        sseService.subscribe(userId);
        SseEmitter sendEmitter = sut.send(messageDto);

        // then
        assertThat(sendEmitter).isNotNull();
        assertThat(sendEmitter.getTimeout()).isEqualTo(10_000L);
        assertThat(sendEmitter).isEqualTo(sseRepository.findById(userId));
    }
}