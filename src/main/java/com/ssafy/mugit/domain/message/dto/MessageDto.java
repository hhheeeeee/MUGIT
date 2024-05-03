package com.ssafy.mugit.domain.message.dto;

import com.ssafy.mugit.domain.sse.service.SseEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MessageDto<T> {
    private Long userId;
    private SseEvent event;
    private T message;
}
