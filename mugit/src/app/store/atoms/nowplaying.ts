"use client";

import { atom } from "jotai";

export const isplaying = atom(false);

const initialValue = {
  id: 0,
  title: "Flow Name1",
  name: "flow maker1",
  soundurl: "musics/example.mp3",
  imgurl:
    "https://plus.unsplash.com/premium_photo-1689247409711-f70c5cfa9254?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};
export const nowPlaying = atom(initialValue);

export const playingButton = atom(false);

export const nowPlayintTime = atom(0);

export const nowPlayingDuration = atom("0:00");

// export const orderer_mobile_tel_atom = atom("");
// export const orderer_name_atom = atom("");
