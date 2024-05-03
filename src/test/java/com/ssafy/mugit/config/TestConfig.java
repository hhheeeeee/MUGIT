package com.ssafy.mugit.config;

import com.ssafy.mugit.infrastructure.repository.SseRepository;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

@TestConfiguration
public class TestConfig {

    @Bean
    SseRepository sseRepository() {
        return new SseRepository();
    }
}
