package com.ssafy.mugit.domain.message.service;

import com.ssafy.mugit.domain.message.dto.SseMessageDto;
import com.ssafy.mugit.domain.sse.service.SseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Slf4j
@RequiredArgsConstructor
public class MessageService {

    private final SseService sseService;

    public SseEmitter send(SseMessageDto<?> sseMessageDto) {
        Long userId = sseMessageDto.getUserId();
        log.info("사용자 {}에게 알림을 전송합니다.", userId);
        return sseService.send(userId, sseMessageDto.getEvent(), sseMessageDto.getMessage());
    }
}
