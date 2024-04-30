package com.ssafy.mugit.record.entity;

import com.ssafy.mugit.record.entity.Record;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity(name = "source")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Source {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "source_id")
    private Long id;

    @Column(name = "original_name")
    private String originName;

    @Column(name = "uuid_name")
    private String uuidName;
}
