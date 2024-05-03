package com.ssafy.mugit.domain.message.service;

import com.ssafy.mugit.domain.message.dto.MessageDto;
import com.ssafy.mugit.domain.sse.service.SseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final SseService sseService;

    public SseEmitter send(MessageDto<?> messageDto) {
        Long userId = messageDto.getUserId();
        return sseService.send(userId, messageDto.getEvent(), messageDto.getMessage());
    }
}
