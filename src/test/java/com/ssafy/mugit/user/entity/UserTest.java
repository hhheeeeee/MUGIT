package com.ssafy.mugit.user.entity;

import com.ssafy.mugit.user.ProfileFixture;
import com.ssafy.mugit.user.UserFixture;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class UserTest {

    @Test
    @DisplayName("사용자 회원가입 테스트")
    void testUserRegist() {
        // given
        User tempUser = UserFixture.DEFAULT_LOGIN_USER.getUser();
        Profile profile = ProfileFixture.DEFAULT_PROFILE.getProfile();

        // when
        tempUser.regist(profile);

        // then
        assertThat(tempUser.getProfile().getNickName())
                .isEqualTo("leaf");
        assertThat(tempUser.getProfile().getProfileText())
                .isEqualTo("프로필");
        assertThat(tempUser.getProfile().getProfileImage())
                .isEqualTo("http://localhost:8080/profile/1");
    }

}