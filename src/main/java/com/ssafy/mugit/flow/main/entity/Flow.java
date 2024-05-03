package com.ssafy.mugit.flow.main.entity;

import com.ssafy.mugit.global.entity.BaseTimeEntity;
import com.ssafy.mugit.user.entity.User;
import com.ssafy.mugit.record.entity.Record;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "flow")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Flow extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "flow_id")
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "title")
    private String title;
    @Column(name = "is_released")
    private boolean isReleased;
    @Column(name = "message")
    private String message;
    @Column(name = "authority")
    @Enumerated(value = EnumType.STRING)
    private Authority authority;
    @Column(name = "music_path")
    private String musicPath;
    @Column(name = "cover_path")
    private String coverPath;
    @Column(name = "views")
    private Integer views;

    @OneToMany(mappedBy = "flow", fetch = FetchType.LAZY)
    private List<Record> records = new ArrayList<>();

    @OneToMany(mappedBy = "childFlow", fetch = FetchType.LAZY)
    private List<FlowClosure> relationship = new ArrayList<>();

    @OneToMany(mappedBy = "flow", fetch = FetchType.LAZY)
    private List<FlowHashtag> hashtags = new ArrayList<>();

    public Flow(User user, String title, String musicPath) {
        this.user = user;
        this.title = title;
        this.isReleased = false;
        this.musicPath = musicPath;
        this.views = 0;
    }

    public Flow(User user, String title, String message, Authority authority, String musicPath, String coverPath) {
        this.user = user;
        this.title = title;
        this.message = message;
        this.authority = authority;
        this.isReleased = false;
        this.musicPath = musicPath;
        this.coverPath = coverPath;
        this.views = 0;
    }
}
