package com.ssafy.mugit.user.dto.cookie;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginCookieDto {
    private Boolean isLogined;
    private String nickName;
    private String profileText;
    private String profileImage;
}
