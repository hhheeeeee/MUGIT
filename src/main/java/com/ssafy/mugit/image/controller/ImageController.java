package com.ssafy.mugit.image.controller;

import com.ssafy.mugit.image.dto.ImagePathResponseDto;
import com.ssafy.mugit.image.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file/images")
@Slf4j
public class ImageController {

    private final ImageService imageService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {

        String[] path = imageService.uploadImage(file);

        return new ResponseEntity<>(new ImagePathResponseDto(path[0], path[1]), HttpStatus.OK);
    }
}
