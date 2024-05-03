package com.ssafy.mugit.domain.message.dto;

import com.ssafy.mugit.domain.sse.service.SseEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SseMessageDto<T> {
    private Long userId;
    private SseEvent event;
    private T message;
}
