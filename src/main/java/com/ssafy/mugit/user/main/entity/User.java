package com.ssafy.mugit.user.main.entity;

import com.ssafy.mugit.user.main.entity.type.SnsType;
import com.ssafy.mugit.user.notification.entity.Notification;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "sns_id")
    private String snsId;

    @Column(name = "sns_type")
    @Enumerated(value = EnumType.STRING)
    private SnsType snsType;

    @Column(name = "email")
    private String email;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
    private Profile profile;

    @OneToMany(mappedBy = "user", orphanRemoval = true, cascade = CascadeType.ALL)
    private final List<Notification> notifications = new ArrayList<>();

    // 회원가입 시 fake user 생성자
    public User(String snsId, String email) {
        this.snsId = snsId;
        this.email = email;
    }

    public void regist(String nickName, String profileText, String profileImage) {
        this.profile = new Profile(nickName, profileText, profileImage);
    }
}