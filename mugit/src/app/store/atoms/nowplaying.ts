"use client";

import { atom } from "jotai";

// 현재 bottomNavbar에서 play되고 있는 노래가 있는지
export const isplaying = atom(false);

export const SonginitialValue = {
  id: -1,
  user: {
    id: 0,
    nickName: "string",
    profileImagePath: "string",
  },
  title: "string",
  authority: "PUBLIC",
  musicPath: "string",
  coverPath: "string",
  createdAt: "string",
};

// 현재 bottomNavbar에서 play되고 있는 노래가 있을 때 그 노래에 대한 정보
export const nowPlaying = atom(SonginitialValue);

// 댓글에서 시간을 클릭했는지
export const playTime = atom(0);
