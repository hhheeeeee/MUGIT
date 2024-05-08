package com.ssafy.mugit.domain.sse.service;

import com.ssafy.mugit.domain.exception.SseException;
import com.ssafy.mugit.infrastructure.dto.SseMessageDto;
import com.ssafy.mugit.infrastructure.dto.ConnectionDto;
import com.ssafy.mugit.infrastructure.repository.SseQueueContainer;
import com.ssafy.mugit.infrastructure.repository.SseQueueContainerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

import static com.ssafy.mugit.domain.exception.error.SseError.EXCEED_SSE_EMITTER_TIMEOUT;
import static com.ssafy.mugit.domain.exception.error.SseError.SSE_EMITTER_NOT_FOUND;
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
        SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT);
        return subscribe(userId, emitter);
    }

    public SseEmitter subscribe(long userId, SseEmitter sseEmitter) throws IOException {
        addHandlerAndSave(sseEmitter, userId);
        send(userId, new SseMessageDto<ConnectionDto>(userId, CONNECT, new ConnectionDto()));

        // MessageQueue가 존재한다면 polling 시도
        if (sseQueueContainerRepository.existsById(userId)) {
            SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
            sseQueueContainer.poll(userId);
        }

        return sseEmitter;
    }

    public SseEmitter send(long userId, SseMessageDto<?> sseMessageDto) {
        SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
        SseEmitter sseEmitter = sseQueueContainer.getSseEmitter();
        send(sseQueueContainer.getSseEmitter(), sseQueueContainer, userId, sseMessageDto.getEvent(), sseMessageDto);
        return sseEmitter;
    }

    public void send(SseEmitter emitter, SseQueueContainer sseQueueContainer, long userId, SseEvent event, SseMessageDto<?> message) throws SseException {
        try {
            if (emitter == null) throw new SseException(SSE_EMITTER_NOT_FOUND);
            emitter.send(SseEmitter.event()
                    .id(String.valueOf(userId))
                    .name(event.getEventName())
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

    public SseEmitter complete(Long userId) {
        SseQueueContainer sseQueueContainer = sseQueueContainerRepository.findById(userId);
        SseEmitter sseEmitter = sseQueueContainer.getSseEmitter();
        sseEmitter.complete();
        return sseEmitter;
    }

    private void addHandlerAndSave(SseEmitter emitter, long userId) {
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
        sseQueueContainerRepository.save(userId, emitter);
    }
}
