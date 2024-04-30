package com.ssafy.mugit.service;

import com.ssafy.mugit.dto.RecordRequestDto;
import com.ssafy.mugit.global.CustomRecordException;
import com.ssafy.mugit.global.RecordError;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecordService {

    private final WebClient webClient;
    @Value("${upload-path}")
    private String uploadPath;

    public String fileUpload(HttpServletRequest request, Long flowId, String message, List<Long> sourceIds, List<MultipartFile> files) {

        // 1. JSESSIONID 획득
        Optional<String> jSessionId = getJSessionId(request);
        if (jSessionId.isEmpty()) {
            throw new CustomRecordException(RecordError.SESSIONID_NOT_EXISTED);
        }

        // 2. JSESSIONID로 flowId의 소유자인지 검사
        getUserId(jSessionId.get(), flowId);

        // 3. 추가된 파일 저장 처리
        Map<String, String> filePaths = saveFiles(files);

        // 4. 레코드 생성 요청
        RecordRequestDto recordRequestDto = new RecordRequestDto(message, sourceIds, filePaths);
        return createRecord(jSessionId.get(), flowId, recordRequestDto);
    }

    private Optional<String> getJSessionId(HttpServletRequest request) {
        if (request.getCookies() != null) {
            return Arrays.stream(request.getCookies())
                    .filter(cookie -> "JSESSIONID".equals(cookie.getName()))
                    .findFirst()
                    .map(Cookie::getValue);
        }
        return Optional.empty();
    }

    private void getUserId(String jSessionId, Long flowId) {
        String message = webClient.get()
                .uri("/records/validate/{flowId}", flowId)
                .cookie("JSESSIONID", jSessionId)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorMap(WebClientResponseException.class, e -> new CustomRecordException(RecordError.SESSIONID_ILLEGAL))
                .block();
        log.info("Response Message : {}", message);
    }

    private HashMap<String, String> saveFiles(List<MultipartFile> files) {
        try {
            HashMap<String, String> map = null;
            if(files != null && !files.isEmpty()) {
                map = new HashMap<>();
                for (MultipartFile file : files) {
                    String originName = file.getOriginalFilename();
                    String extension = originName != null ? getExtension(originName) : "";
                    String uuidName = UUID.randomUUID() + extension;
                    map.put(uuidName, originName);

                    Path path = Paths.get(uploadPath + uuidName);
                    Files.createDirectories(path.getParent());

                    file.transferTo(path);
                }
            }
            return map;
        } catch (IOException e) {
            throw new RuntimeException("Directory Create Error");
        }
    }

    private String getExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        return lastDotIndex != -1 ? filename.substring(lastDotIndex) : "";
    }

    private String createRecord(String jSessionId, Long flowId, RecordRequestDto recordRequestDto) {
        return webClient.post()
                .uri("/records/flows/{flowId}", flowId)
                .cookie("JSESSIONID", jSessionId)
                .bodyValue(recordRequestDto)
                .retrieve()
                .bodyToMono(String.class)
                .onErrorMap(WebClientResponseException.class, e -> new InternalError("record create error."))
                .block();
    }
}
