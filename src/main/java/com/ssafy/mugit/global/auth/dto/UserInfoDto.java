package com.ssafy.mugit.global.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoDto {
    private String snsId;
    private String email;
}
