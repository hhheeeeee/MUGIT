package com.ssafy.mugit.infrastructure.redis;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class PublisherTest {

    @Autowired
    Publisher publisher;

    @Test
    @DisplayName("pub/sub 테스트")
    void testPublishAndSubscribe() {
        publisher.publish("hello");
        publisher.publish("world");
    }
}