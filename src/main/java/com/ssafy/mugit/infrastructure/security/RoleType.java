package com.ssafy.mugit.infrastructure.security;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

import static com.ssafy.mugit.infrastructure.security.RoleAuthority.DEFAULT_ADMIN_AUTHORITY;
import static com.ssafy.mugit.infrastructure.security.RoleAuthority.DEFAULT_USER_AUTHORITY;
import static java.util.Arrays.asList;

public enum RoleType {
    ROLE_USER(asList(DEFAULT_USER_AUTHORITY)),
    ROLE_ADMIN(asList(DEFAULT_ADMIN_AUTHORITY));

    private final Collection<GrantedAuthority> authorities;

    RoleType(Collection<GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}

