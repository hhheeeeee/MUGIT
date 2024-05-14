package com.ssafy.mugit.domain.message.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.mugit.domain.sse.service.SseService;
import com.ssafy.mugit.infrastructure.dto.SseMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Objects;

@Service("RedisMessageService")
@Slf4j
@RequiredArgsConstructor
public class RedisMessageService implements MessageService, MessageListener {

    private final SseService sseService;
    private final ObjectMapper objectMapper;

    @Override
    public void send(SseMessageDto<?> sseMessageDto) {
        try {
            Long userId = sseMessageDto.getUserId();
            log.info("사용자 {}에게 알림을 전송합니다.", userId);
            sseService.send(userId, sseMessageDto);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @SneakyThrows
    @Override
    public void onMessage(Message message, byte[] pattern) {
        String channel = new String(message.getChannel());
        SseMessageDto<?> sseMessageDto = objectMapper.readValue(message.getBody(), SseMessageDto.class);
        log.info("채널 {}로부터 수신한 메시지 : {}", channel, sseMessageDto);
        send(sseMessageDto);
    }
}
