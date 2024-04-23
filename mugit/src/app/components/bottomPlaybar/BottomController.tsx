"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { formatTime } from "@/app/utils/formatTime";
import { useAtomValue } from "jotai";
import { nowPlaying, nowPlayingDuration } from "@/app/store/atoms";

const audioUrls = [
  "/musics/example.mp3",
  // "https://file-examples.com/storage/fe61ecc6566626110a55ee3/2017/11/file_example_MP3_700KB.mp3",
];

export default function BottomController() {
  const containerRef = useRef(null);
  const song = useAtomValue(nowPlaying);
  const duration = useAtomValue(nowPlayingDuration);
  // const [urlIndex, setUrlIndex] = useState(0);
  // console.log(audio?.currentTime);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
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
    autoplay: true,
    interact: true,
    dragToSeek: false,
    hideScrollbar: true,
    audioRate: 1,
    autoScroll: true,
    autoCenter: true,
    sampleRate: 8000,
  });

  // const onUrlChange = useCallback(() => {
  //   setUrlIndex((index) => (index + 1) % audioUrls.length);
  // }, []);

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const [width, setWidth] = useState(0);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // 현재 마우스 위치
    setWidth(x);
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <div
          onClick={onPlayPause}
          style={{ minWidth: "5em" }}
          className="flex w-[10%] items-center justify-center "
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pointyellow">
            {isPlaying ? "||" : ">"}
          </span>
        </div>
        <div className="mx-2 text-pointyellow">{formatTime(currentTime)}</div>
        <div
          className="relative w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setWidth(0)}
        >
          <div ref={containerRef} className="" />
        </div>
        <div className="text-pointyellow">{duration}</div>
      </div>
    </>
  );
}
