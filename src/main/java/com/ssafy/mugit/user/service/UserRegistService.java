package com.ssafy.mugit.user.service;

import com.ssafy.mugit.global.auth.CookieService;
import com.ssafy.mugit.global.exception.UserApiException;
import com.ssafy.mugit.global.exception.error.UserApiError;
import com.ssafy.mugit.user.dto.request.RegistProfileDto;
import com.ssafy.mugit.user.entity.Profile;
import com.ssafy.mugit.user.entity.User;
import com.ssafy.mugit.user.entity.type.SnsType;
import com.ssafy.mugit.user.repository.ProfileRepository;
import com.ssafy.mugit.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

@Service
public class UserRegistService {

    private final String defaultTextUrl;
    private final String defaultImageUrl;
    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final CookieService cookieService;

    public UserRegistService(@Value("${default.profile.text}") String defaultTextUrl,
                             @Value("${default.profile.image}") String defaultImageUrl,
                             @Autowired UserRepository userRepository,
                             @Autowired ProfileRepository profileRepository,
                             @Autowired CookieService cookieService) {
        this.defaultTextUrl = defaultTextUrl;
        this.defaultImageUrl = defaultImageUrl;
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.cookieService = cookieService;
    }

    public HttpHeaders registAndGetLoginCookieHeader(String snsId, SnsType snsType, RegistProfileDto registProfileDto) {
        if (profileRepository.existsByNickName(registProfileDto.getNickName()))
            throw new UserApiException(UserApiError.DUPLICATE_NICK_NAME);

        User user = userRepository.findBySnsIdAndSnsType(snsId, snsType);
        user.regist(new Profile(registProfileDto.getNickName(), registProfileDto.getProfileText(), registProfileDto.getProfileImage()));
        return cookieService.getLoginCookieHeader(user);
    }

    private Profile getProfileByDto(RegistProfileDto profileDto) {
        // 기본값 세팅
        if(profileDto.getProfileText().isEmpty()) profileDto.setProfileText(defaultTextUrl);
        if(profileDto.getProfileImage().isEmpty()) profileDto.setProfileImage(defaultImageUrl);
        return new Profile(profileDto.getNickName(), profileDto.getProfileText(), profileDto.getProfileImage());
    }

}
