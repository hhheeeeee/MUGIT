package com.ssafy.mugit.infrastructure.redis;

import com.ssafy.mugit.domain.message.service.MessageService;
import com.ssafy.mugit.domain.message.service.RedisMessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.concurrent.atomic.AtomicInteger;

@Slf4j
public class Receiver {

    private AtomicInteger counter = new AtomicInteger();

    public void receiveMessage(String message) {
        log.info("Received message : {}", message);
    }

    public int getCount() {
        return counter.get();
    }
}
