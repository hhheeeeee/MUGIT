package com.ssafy.mugit.domain.message.api;

import com.ssafy.mugit.domain.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SseApiController {

    private final MessageService messageService;
}
