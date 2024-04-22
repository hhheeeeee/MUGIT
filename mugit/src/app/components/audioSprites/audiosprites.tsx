"use client";
import { useMemo, useState, useCallback, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import "./audiosprites.module.css";

const audioUrls = [
  "/example.mp3",
  // "https://file-examples.com/storage/fe61ecc6566626110a55ee3/2017/11/file_example_MP3_700KB.mp3",
];

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

export default function AudioSprites() {
  const containerRef = useRef(null);
  // const [urlIndex, setUrlIndex] = useState(0);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 80,
    url: audioUrls[0],
    plugins: useMemo(() => [Timeline.create()], []),
    waveColor: "#494950",
    progressColor: "#0011ff",
    cursorColor: "#eeff00",
    cursorWidth: 2,
    barWidth: 3,
    barGap: 2,
    barRadius: 9,
    minPxPerSec: 1,
    fillParent: true,
    // mediaControls: true,
    dragToSeek: true,
    hideScrollbar: false,
    audioRate: 1,
    autoScroll: true,
    autoCenter: true,
  });

  // const onUrlChange = useCallback(() => {
  //   setUrlIndex((index) => (index + 1) % audioUrls.length);
  // }, []);

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <>
      <div className="flex w-full">
        <div
          onClick={onPlayPause}
          style={{ minWidth: "5em" }}
          className="flex w-[10%] items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pointyellow">
            {isPlaying ? ">" : "||"}
          </span>
        </div>
        <div ref={containerRef} className="w-[90%]" />
      </div>

      <p>Current audio: {audioUrls[0]}</p>

      <p>Current time: {formatTime(currentTime)}</p>

      {/* <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
        <button onClick={onUrlChange}>Change audio</button>
      </div> */}
    </>
  );
}
