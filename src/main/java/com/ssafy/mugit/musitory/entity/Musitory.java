//package com.ssafy.mugit.musitory.entity;
//
//import com.ssafy.mugit.musitory.entity.embedded.UserDate;
//import jakarta.persistence.*;
//import lombok.AccessLevel;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Getter
//@Entity
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Musitory {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE)
//    @Column(name = "musitory_id")
//    private Long id;
//
//    @Column(nullable = false)
//    private Integer count;
//
//    @Column(nullable = false)
//    @Embedded
//    private UserDate userDate;
//
//    @Column(nullable = false)
//    @OneToMany(mappedBy = "musitory", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<MusitoryRecord> musitoryRecord;
//
//    public Musitory(long userId, long recordId) {
//        this.userDate = new UserDate(userId);
//        this.count = 1;
//        this.musitoryRecord = new ArrayList<>();
//    }
//}
