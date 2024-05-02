package com.ssafy.mugit.file.service;

import com.ssafy.mugit.file.dto.FilePathDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class FileService {

    @Value("${upload-path}")
    private String uploadPath;

    public List<FilePathDto> uploadImage(List<MultipartFile> files) {
        try {
            List<FilePathDto> paths = null;
//            List<MultipartFile> files = fileRequestDto.getFiles();

            if (files != null && !files.isEmpty()) {
                paths = new ArrayList<>();

                for (MultipartFile file : files) {
                    String originName = file.getOriginalFilename();
                    String extension = originName != null ? getExtension(originName) : "";
                    String uuidName = UUID.randomUUID() + extension;

                    Path path = Paths.get(uploadPath + uuidName);
                    log.info("[파일] 업로드 경로 : {}", uploadPath);
                    log.info("[파일] 풀 경로 : {}", uploadPath + uuidName);
                    Files.createDirectories(path.getParent());
                    file.transferTo(path);

                    String url = "https://mugit.site/files/";
                    paths.add(new FilePathDto(originName, url + uuidName));
                }
            }

            return paths;
        } catch (IOException e) {
            throw new RuntimeException("Directory Create Error");
        }
    }

    private String getExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        return lastDotIndex != -1 ? filename.substring(lastDotIndex) : "";
    }
}
