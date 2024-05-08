package com.ssafy.mugit.infrastructure.dto;

import com.ssafy.mugit.domain.sse.service.SseEvent;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SseMessageDto<T> {
    private Long userId;
    private SseEvent event;
    private T message;
}
