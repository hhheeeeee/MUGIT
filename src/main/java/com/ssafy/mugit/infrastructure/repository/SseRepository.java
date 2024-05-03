package com.ssafy.mugit.infrastructure.repository;

import com.ssafy.mugit.domain.exception.SseException;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import static com.ssafy.mugit.domain.exception.error.SseError.SSE_EMITTER_NOT_FOUND;

@Repository
public class SseRepository {

    private final Map<Long, SseEmitter> sseRepository = new ConcurrentHashMap<>();

    public void save(Long id, SseEmitter emitter) {

        // Emitter 저장
        sseRepository.put(id, emitter);
    }

    public SseEmitter findById(Long id) {

        // Emitter 없을 때 오류
        if (!sseRepository.containsKey(id)) throw new SseException(SSE_EMITTER_NOT_FOUND);

        return sseRepository.get(id);
    }

    public void deleteById(long userId) {
        sseRepository.remove(userId);
    }

    public int size() {
        return sseRepository.size();
    }
}
