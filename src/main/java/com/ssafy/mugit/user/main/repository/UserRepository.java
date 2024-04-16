package com.ssafy.mugit.user.main.repository;

import com.ssafy.mugit.user.main.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findBySnsId(String snsId);
}
