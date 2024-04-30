package com.ssafy.mugit.record.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@Slf4j
public class WebClientConfig {

    @Value("${user-server}")
    private String USER_SERVER_URL;

    @Bean
    public WebClient webClient() {
        log.info("Webconfig Host : {}", USER_SERVER_URL);
        return WebClient.builder()
                .baseUrl("http://"+USER_SERVER_URL+"/api")
                .build();
    }

}
