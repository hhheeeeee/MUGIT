package com.ssafy.mugit.global.util;

import com.ssafy.mugit.global.exception.CustomException;
import com.ssafy.mugit.global.exception.FileError;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Arrays;

public class CookieUtil {

    public String getSessionId(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            throw new CustomException(FileError.SESSIONID_NOT_EXISTED);
        }

        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals("JSESSIONID")).
                findFirst().
                map(Cookie::getValue)
                .orElseThrow(() -> new CustomException(FileError.SESSIONID_NOT_EXISTED));
    }
}
