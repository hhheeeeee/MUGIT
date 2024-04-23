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
import { isplaying, nowPlaying, nowPlayingDuration } from "@/app/store/atoms";
import { useSetAtom, useAtom } from "jotai";

export default function PlayHover({ item }: PlayHoverPropsType) {
  const setIsPlaying = useSetAtom(isplaying);
  const setnowPlayingDuration = useSetAtom(nowPlayingDuration);
  const setSong = useSetAtom(nowPlaying);
  const setPlay = (bool: boolean) => setIsPlaying(bool);

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const _audio = new Audio(item.soundurl);
    _audio.controls = true;
    _audio.volume = 0.1;

    const updateDuration = () => {
      setDuration(_audio.duration);
    };

    _audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      _audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [item.soundurl]);

  const setLocalStorage = () => {
    localStorage.clear();
    setPlay(true);
    setSong(item);
    const _duration = formatTime(Number(duration));
    setnowPlayingDuration(_duration);
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
