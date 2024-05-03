package com.ssafy.mugit.infrastructure.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.ssafy.mugit.infrastructure.security.RoleType;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@JsonSerialize
@JsonIgnoreProperties(ignoreUnknown = true)
public class UserSessionDto implements Serializable {
    private Long id;
    private String email;
    private RoleType role;

    public UserSessionDto(Long id, String email, RoleType role) {
        this.id = id;
        this.email = email;
        this.role = role;
    }
}
