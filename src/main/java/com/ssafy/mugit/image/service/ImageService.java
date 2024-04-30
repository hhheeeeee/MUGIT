package com.ssafy.mugit.image.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${upload-path}")
    private String uploadPath;

    public String[] uploadImage(MultipartFile file) {
        try {
            String[] filePath = new String[2];

            String originName = file.getOriginalFilename();
            String extension = originName != null ? getExtension(originName) : "";
            String uuidName = UUID.randomUUID() + extension;

            Path path = Paths.get(uploadPath + uuidName);
            Files.createDirectories(path.getParent());
            file.transferTo(path);

            filePath[0] = originName;
            filePath[1] = uuidName;
            return filePath;
        } catch(IOException e) {
            throw new RuntimeException("Directory Create Error");
        }
    }

    private String getExtension(String filename) {
        int lastDotIndex = filename.lastIndexOf(".");
        return lastDotIndex != -1 ? filename.substring(lastDotIndex) : "";
    }
}
