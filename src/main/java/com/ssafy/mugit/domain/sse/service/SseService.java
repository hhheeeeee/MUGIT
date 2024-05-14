package com.ssafy.mugit.domain.sse.service;

import com.ssafy.mugit.domain.exception.SseException;
import com.ssafy.mugit.infrastructure.dto.ConnectionDto;
import com.ssafy.mugit.infrastructure.dto.SseMessageDto;
import com.ssafy.mugit.infrastructure.repository.SseQueueContainer;
import com.ssafy.mugit.infrastructure.repository.SseQueueContainerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

import static com.ssafy.mugit.domain.exception.error.SseError.*;
import static com.ssafy.mugit.domain.sse.service.SseEvent.CONNECT;

@Service
@Slf4j
public class SseService {

    private final Long EMITTER_TIMEOUT;
    private final SseQueueContainerRepository sseQueueContainerRepository;

    public SseService(@Value("${emitter.timeout}") Long emitterTimeout,
                      @Autowired SseQueueContainerRepository sseQueueContainerRepository) {
        EMITTER_TIMEOUT = emitterTimeout;
        this.sseQueueContainerRepository = sseQueueContainerRepository;
    }

    public SseEmitter subscribe(long userId) throws IOException {
        SseQueueContainer sseContainer = sseQueueContainerRepository.findById(userId);

        // SSE 연결이 만료 전이면 오류 전송
        if (sseContainer != null && sseContainer.getSseEmitter() != null && sseContainer.getSseEmitter().getTimeout() != null
                && System.currentTimeMillis() - sseContainer.getLastEmitterCreateTime() < sseContainer.getSseEmitter().getTimeout() * 1000)
            throw new SseException(ALREADY_EXIST_CONNECTION);

        // SseEmitter 찾지 못하거나 만료되었을 때 새로 생성
        else {
            SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT);
            SseQueueContainer sseQueueContainer = sseQueueContainerRepository.save(userId, emitter);
            return subscribeNewSse(userId, sseQueueContainer);
        }
    }

    public SseEmitter subscribeNewSse(long userId, SseQueueContainer sseContainer) throws IOException {
        // handler
        addHandler(userId, sseContainer.getSseEmitter());

        // connection 전송
        send(userId, sseContainer, new SseMessageDto<ConnectionDto>(userId, CONNECT, new ConnectionDto()));

        // polling 시도
        attemptPolling(userId, sseContainer);
        return sseContainer.getSseEmitter();
    }

    public void send(Long userId, SseQueueContainer sseQueueContainer, SseMessageDto<?> message) throws SseException {
        try {
            SseEmitter sseEmitter = sseQueueContainer.getSseEmitter();
            if (sseEmitter == null) throw new SseException(SSE_EMITTER_NOT_FOUND);
            sseEmitter.send(SseEmitter.event()
                    .id(String.valueOf(userId))
                    .name(message.getEvent().getEventName())
                    .data(message));
            log.info("message 전송완료 : {}", message);
        } catch (SseException e) {
            if (System.currentTimeMillis() - sseQueueContainer.getLastEmitterCreateTime() > EMITTER_TIMEOUT * 1000) {
                throw new SseException(EXCEED_SSE_EMITTER_TIMEOUT);
            }
            sseQueueContainer.getMessageQueue().offer(message);
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    public void send(Long userId, SseMessageDto<?> message) throws IOException {
        SseQueueContainer sseContainer = sseQueueContainerRepository.findById(userId);

        // 예외처리 1 : SSE를 찾지 못했을 때
        if (sseContainer == null || sseContainer.getSseEmitter() == null || sseContainer.getSseEmitter().getTimeout() == null)
            throw new SseException(SSE_EMITTER_NOT_FOUND);

        // 예외처리 2 : SSE를 찾았지만 Timeout * 2 이상일 때
        else if (System.currentTimeMillis() - sseContainer.getLastEmitterCreateTime() > EMITTER_TIMEOUT * 2)
           throw new SseException(EXCEED_SSE_EMITTER_TIMEOUT);

        // 예외처리 3 : SSE를 찾았고 Timeout 되었을 때
        else if (System.currentTimeMillis() - sseContainer.getLastEmitterCreateTime() > sseContainer.getSseEmitter().getTimeout())
            sseContainer.getMessageQueue().offer(message);

        // 전송
        else send(userId, sseContainer, message);
    }

    // Timeout 이전에 생성된 알림 polling 시도
    public void attemptPolling(long userId, SseQueueContainer sseContainer) throws IOException {
        if (sseContainer.getSseEmitter().getTimeout() != null && System.currentTimeMillis() - sseContainer.getLastEmitterCreateTime() < sseContainer.getSseEmitter().getTimeout()) {
            sseContainer.poll(userId);
        }
    }

    public SseEmitter complete(Long userId) {
        SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
        SseEmitter sseEmitter = sseQueueContainer.getSseEmitter();
        sseEmitter.complete();
        return sseEmitter;
    }

    private void addHandler(long userId, SseEmitter emitter) {
        emitter.onCompletion(() -> {
            log.info("user{}'s emitter complete, left : {}", userId, sseQueueContainerRepository.size());
            sseQueueContainerRepository.deleteEmitterById(userId);
        });
        emitter.onTimeout(() -> {
            log.info("user{}'s emitter timeout", userId);
            sseQueueContainerRepository.deleteEmitterById(userId);
        });
        emitter.onError((error) -> {
            log.error("user{}'s emitter have error : {}", userId, error.getMessage());
            sseQueueContainerRepository.deleteEmitterById(userId);
        });
    }
}
