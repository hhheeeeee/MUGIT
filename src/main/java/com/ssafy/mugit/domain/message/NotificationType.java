package com.ssafy.mugit.domain.message;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum NotificationType {
    FOLLOW("팔로우 메시지가 전송되었습니다."),
    LIKE("좋아요를 눌렀습니다."),
    FLOW_RELEASE("플로우가 릴리즈되었습니다.");
    private final String message;
}
