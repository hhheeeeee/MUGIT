"use client";

import IconPlay from "@/app/assets/icon/IconPlay";

type item = {
  id: number;
  title: string;
  name: string;
  soundurl: string;
  imgurl: string;
};

type PlayHoverPropsType = {
  item: item;
  css?: string;
};

import { useEffect, useState } from "react";
import { isplaying, nowPlaying } from "@/app/store/atoms";
import { useSetAtom, useAtom } from "jotai";

export default function PlayHover({ item, css }: PlayHoverPropsType) {
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
        tailwindCSS={
          css
            ? css
            : "absolute top-[30%] left-[35%] hidden group-hover:block z-10 cursor-pointer"
        }
      />
    </div>
  );
}
