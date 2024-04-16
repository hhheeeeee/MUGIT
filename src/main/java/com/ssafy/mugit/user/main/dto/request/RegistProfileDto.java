package com.ssafy.mugit.user.main.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistProfileDto {
    private String nickName;
    private String profileText;
    private String profileImage;
}
