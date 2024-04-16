package com.ssafy.mugit.user.main.controller;

import com.ssafy.mugit.global.auth.AuthService;
import com.ssafy.mugit.global.auth.CookieService;
import com.ssafy.mugit.global.auth.JwtTokenUtil;
import com.ssafy.mugit.global.auth.dto.UserInfoDto;
import com.ssafy.mugit.global.dto.MessageDto;
import com.ssafy.mugit.user.main.dto.request.RegistProfileDto;
import com.ssafy.mugit.user.main.entity.User;
import com.ssafy.mugit.user.main.entity.type.SnsType;
import com.ssafy.mugit.user.main.service.UserAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserAuthController {

    private final UserAuthService userAuthService;
    private final AuthService authService;
    private final CookieService cookieService;
    private final JwtTokenUtil jwtTokenUtil;

    @GetMapping("/login")
    public ResponseEntity<MessageDto> login(
            HttpRequest request,
            @RequestParam(defaultValue = "GOOGLE") SnsType snsType){
        List<String> authorizations = request.getHeaders().get(HttpHeaders.AUTHORIZATION);

        if (authorizations == null) {
            return ResponseEntity.status(401).body(new MessageDto("토큰인증 실패"));
        }

        // authorization token 유효하지 않을 때 : global exception handler 통해 401 응답
        UserInfoDto userInfo = authService.getUserInfoDto(snsType, authorizations.get(0));
        User userInDB = userAuthService.getUser(userInfo);

        if (userInDB != null) {
            return ResponseEntity.status(200)
                    .headers(cookieService.getLoginCookie(userInDB))
                    .body(new MessageDto("로그인 완료"));

        // 임시 유저 DB에 저장
        } else {
            User tempUser = userAuthService.getTempUser(userInfo);
            return ResponseEntity.status(302)
                    .headers(cookieService.getTokenCookie(tempUser))
                    .body(new MessageDto("회원가입 필요"));
        }
    }

    @PostMapping("/profiles")
    public ResponseEntity<MessageDto> regist(
            @CookieValue(value = "accessToken") String accessToken,
            @RequestBody RegistProfileDto registProfileDto) {
        // TODO : Authorization filter 구현
        Long idFromToken = jwtTokenUtil.getIdFromToken(accessToken);

        if (userAuthService.isDuplicate(registProfileDto)) {
            return ResponseEntity.status(409).body(new MessageDto("중복 닉네임"));
        }

        userAuthService.regist(idFromToken, registProfileDto);

        return ResponseEntity.status(200).body(new MessageDto("회원가입 완료"));
    }
}
