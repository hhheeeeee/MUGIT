package com.ssafy.mugit.domain.message.dto;

import com.ssafy.mugit.domain.message.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationDto {
    private Long id;
    private Long notifiedId;
    private Long notifierId;
    private NotificationType type;
    private String message;
}
