package com.ssafy.mugit.image.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class ImagePathResponseDto {
    private String originName;
    private String uuidName;
}
