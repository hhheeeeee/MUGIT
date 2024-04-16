package com.ssafy.mugit.user.main.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "profile")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Profile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "profile_id")
    private Long id;

    @Column(name = "nick_name")
    private String nickName;

    @Column(name = "profile_text")
    private String profileText;

    @Column(name = "profile_image")
    private String profileImage;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    // 회원가입 시 프로필 생성자
    public Profile(String nickName, String profileText, String profileImage) {
        this.nickName = nickName;
        this.profileText = profileText;
        this.profileImage = profileImage;
    }
}
