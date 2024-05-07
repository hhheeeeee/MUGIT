package com.ssafy.mugit.domain.sse.service;

import com.ssafy.mugit.infrastructure.repository.SseRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

import static com.ssafy.mugit.domain.sse.service.SseEvent.CONNECT;

@Service
@Slf4j
public class SseService {

    private final Long EMITTER_TIMEOUT;
    private final SseRepository sseRepository;

    public SseService(@Value("${emitter.timeout}") Long emitterTimeout,
                      @Autowired SseRepository sseRepository) {
        EMITTER_TIMEOUT = emitterTimeout;
        this.sseRepository = sseRepository;
    }

    public SseEmitter subscribe(long userId) {
        SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT);

        addHandler(emitter, userId);
        send(emitter, userId, CONNECT, "connected!");

        return emitter;
    }

    public SseEmitter send(long userId, SseEvent event, Object message) {
        SseEmitter emitter = sseRepository.findById(userId);
        send(emitter, userId, event, message);
        return emitter;
    }

    public void send(SseEmitter emitter, long userId, SseEvent event, Object message) {
        log.info("message 전송완료 : {}", message);
        try {
            emitter.send(SseEmitter.event()
                    .id(String.valueOf(userId))
                    .name(event.getEvent())
                    .data(message));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public SseEmitter complete(Long userId) {
        SseEmitter emitter = sseRepository.findById(userId);
        emitter.complete();
        return emitter;
    }

    private void addHandler(SseEmitter emitter, long userId) {
        emitter.onCompletion(() -> {
            log.info("user{}'s emitter complete, left : {}", userId, sseRepository.size());
            sseRepository.deleteById(userId);
        });
        emitter.onTimeout(() -> {
            log.info("user{}'s emitter timeout", userId);
            sseRepository.deleteById(userId);
        });
        emitter.onError((error) -> {
            log.error("user{}'s emitter have error : {}", userId, error.getMessage());
            sseRepository.deleteById(userId);
        });
        sseRepository.save(userId, emitter);
    }
}
