package com.ssafy.mugit.domain.message.fixture;

import com.ssafy.mugit.domain.message.dto.NotificationDto;
import com.ssafy.mugit.domain.message.dto.MessageDto;
import com.ssafy.mugit.domain.sse.service.SseEvent;
import lombok.AllArgsConstructor;

import static com.ssafy.mugit.domain.message.NotificationType.FOLLOW;

@AllArgsConstructor
public enum MessageDtoFixture {
    MESSAGE_DTO_01(1L, SseEvent.FOLLOW, new NotificationDto(1L, 1L, 2L, FOLLOW, FOLLOW.getMessage()));

    private Long userId;
    private SseEvent event;
    private Object message;

    public MessageDto<NotificationDto> getFixture() {
        return new MessageDto<NotificationDto>(userId, event, (NotificationDto)message);
    }
}
