package com.ssafy.mugit.musitory.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class MusitoryEntityTest {
    @Test
    @DisplayName("뮤지토리 생성 시 사용자 pk와 레코드 pk를 받아서 저장")
    void testCreateMusitoryEntity() {
        // given
        long userId = 1;
        long recordId = 1;
        LocalDate today = LocalDate.now();

        // when
        Musitory musitory = new Musitory(userId, recordId);

        // then
        assertThat(musitory.getCount()).isEqualTo(1);
        assertThat(musitory.getUserDate().getDate()).isEqualTo(today);
    }
}