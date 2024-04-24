"use client";

import IconPlay from "@/app/assets/icon/IconPlay";
import { formatTime } from "@/app/utils/formatTime";

type item = {
  id: number;
  title: string;
  name: string;
  soundurl: string;
  imgurl: string;
};

type PlayHoverPropsType = {
  item: item;
};

import { useEffect, useState } from "react";
import { isplaying, nowPlaying } from "@/app/store/atoms";
import { useSetAtom, useAtom } from "jotai";

export default function PlayHover({ item }: PlayHoverPropsType) {
  const [play, setPlay] = useAtom(isplaying);
  const setSong = useSetAtom(nowPlaying);
  const [duration, setDuration] = useState(0);

  const setLocalStorage = () => {
    setPlay(false);
    setPlay(true);
    setSong(item);
  };

  return (
    <div className="group absolute top-0 h-full w-full rounded-lg hover:bg-gray-600 hover:bg-opacity-75">
      <IconPlay
        onClick={setLocalStorage}
        tailwindCSS="absolute top-[32%] left-[35%] hidden group-hover:block z-10 cursor-pointer"
      />
    </div>
  );
}
