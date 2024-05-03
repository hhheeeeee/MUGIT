package com.ssafy.mugit.domain.sse.service;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SseEvent {
    CONNECT("connect"), FOLLOW("follow");

    private final String event;
}
