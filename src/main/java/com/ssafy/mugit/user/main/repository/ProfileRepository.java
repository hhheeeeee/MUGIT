package com.ssafy.mugit.user.main.repository;

import com.ssafy.mugit.user.main.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByNickName(String nickName);
}
