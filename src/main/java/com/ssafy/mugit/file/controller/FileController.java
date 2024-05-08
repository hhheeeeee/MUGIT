package com.ssafy.mugit.file.controller;

import com.ssafy.mugit.file.service.FileService;
import com.ssafy.mugit.global.dto.ListDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/files")
@Slf4j
public class FileController {

    private final FileService fileService;

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam(value = "image", required = false) MultipartFile image,
                                        @RequestParam(value = "source", required = false) List<MultipartFile> source) {
        return new ResponseEntity<>(new ListDto(fileService.uploadFile(image, source)), HttpStatus.OK);
    }
}
