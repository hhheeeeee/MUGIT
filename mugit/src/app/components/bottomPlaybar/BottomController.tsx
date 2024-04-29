"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { formatTime } from "@/app/utils/formatTime";
import { useAtomValue } from "jotai";
import { nowPlaying, isplaying } from "@/app/store/atoms";
import IconPlay from "@/app/assets/icon/IconPlay";
import IconPause from "@/app/assets/icon/IconPause";

export default function BottomController() {
  const containerRef = useRef(null);
  const song = useAtomValue(nowPlaying);
  const [duration, setDuration] = useState("");

  const { wavesurfer, isPlaying, currentTime, isReady } = useWavesurfer({
    container: containerRef,
    height: 10,
    width: 389,
    normalize: false,
    waveColor: "#a99289",
    progressColor: "#dd5e98",
    cursorColor: "#ddd5e9",
    cursorWidth: 10,
    barWidth: 30,
    barGap: 1,
    barHeight: 0.5,
    minPxPerSec: 1,
    fillParent: true,
    url: song.soundurl,
    mediaControls: false,
    // autoplay: true,
    interact: true,
    dragToSeek: false,
    hideScrollbar: true,
    audioRate: 1,
    autoScroll: true,
    autoCenter: true,
    sampleRate: 8000,
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  useEffect(() => {
    const _duration = wavesurfer?.getDuration();
    if (_duration && _duration > 0) {
      setDuration(formatTime(_duration));
      onPlayPause();
    }
  }, [isReady]);

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div
          onClick={onPlayPause}
          style={{ minWidth: "5em" }}
          className="flex w-[10%] items-center justify-center "
        >
          {/* <div className="text-pointyellow">{String(isPlaying)}</div> */}
          {isPlaying ? (
            <IconPause tailwindCSS="" color="#f1f609" size="50px" />
          ) : (
            <IconPlay tailwindCSS="" color="#f1f609" size="50px" />
          )}
        </div>
        <div className="mx-2 text-pointyellow">{formatTime(currentTime)}</div>
        <div ref={containerRef} className="" />
        <div className="text-pointyellow">{duration}</div>
      </div>
    </>
  );
}
