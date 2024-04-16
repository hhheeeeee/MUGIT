package com.ssafy.mugit.user.main.service;

import com.ssafy.mugit.global.auth.dto.UserInfoDto;
import com.ssafy.mugit.user.main.dto.request.RegistProfileDto;
import com.ssafy.mugit.user.main.entity.Profile;
import com.ssafy.mugit.user.main.entity.User;
import com.ssafy.mugit.user.main.repository.UserRepository;
import com.ssafy.mugit.user.main.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserAuthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    public User getUser(UserInfoDto userInfo) {
        return userRepository.findBySnsId(userInfo.getSnsId());
    }

    // 회원가입을 위한 임시 유저
    // TODO : 차후 Spring Batch 도입해서 24시간마다 임시유저 삭제
    public User getTempUser(UserInfoDto userInfo) {
        User tempUser = new User(userInfo.getSnsId(), userInfo.getEmail());
        userRepository.save(tempUser);
        return tempUser;
    }

    public void regist(Long idFromToken, RegistProfileDto registProfileDto) {
        User userInDB = userRepository.getReferenceById(idFromToken);
        userInDB.regist(registProfileDto.getNickName(), registProfileDto.getProfileText(), registProfileDto.getProfileImage());
    }

    public boolean isDuplicate(RegistProfileDto registProfileDto) {
        Profile profileInDB = profileRepository.findByNickName(registProfileDto.getNickName());
        return profileInDB != null;
    }
}
