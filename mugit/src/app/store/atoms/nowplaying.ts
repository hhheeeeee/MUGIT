"use client";

import { atom } from "jotai";

// 현재 bottomNavbar에서 play되고 있는 노래가 있는지
export const isplaying = atom(false);

export const SonginitialValue = {
  id: -1,
  title: "no title",
  name: "no name",
  soundurl: "",
  imgurl:
    "https://plus.unsplash.com/premium_photo-1689247409711-f70c5cfa9254?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

// 현재 bottomNavbar에서 play되고 있는 노래가 있을 때 그 노래에 대한 정보
export const nowPlaying = atom(SonginitialValue);

// 댓글에서 시간을 클릭했는지
export const playTime = atom(0);
