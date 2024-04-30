package com.ssafy.mugit.global.web.controller;

import com.ssafy.mugit.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminHtmlController {

    private final UserRepository userRepository;

    @GetMapping
    String index() {
        return "/index";
    }

    @GetMapping("/login")
    String login() {
        return "/login";
    }

    @GetMapping("/sns-login")
    String snsLogin() {
        return "/sns-login";
    }

    @GetMapping("/sns-regist")
    String snsRegist() {
        return "/sns-regist";
    }

    @GetMapping("/manage-user")
    String manageUser() {
        return "/manage-user";
    }
}
