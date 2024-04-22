"use client";

import { useMemo, useCallback, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";

const audioUrls = [
  "/musics/Burkinelectric.mp3",
  "/musics/Far_Apart.mp3",
  "/musics/Podcast.wav",
  "/musics/Tin_Spirit.mp3",
  "/musics/Unavailable.mp3",
  "/musics/Valley_of_Spies.mp3",
  "/musics/Winner_Winner_Funky_Chicken_Dinner.mp3",
  // "https://ccrma.stanford.edu/~jos/mp3/harpsi-cs.mp3",
];

const formatTime = (seconds: number) =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

export default function Demows({ musicname }: { musicname: string }) {
  const audioUrl = `/musics/${musicname}`;
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: "#f1f609",
    progressColor: "#0033ff",
    url: audioUrl,
    plugins: useMemo(() => [Timeline.create()], []),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <div className="my-10 mx-auto p-1">
      <div ref={containerRef} />

      <p>Current audio: {audioUrl}</p>

      <p>Current time: {formatTime(currentTime)}</p>

      <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
        <button
          onClick={onPlayPause}
          style={{ minWidth: "5em" }}
          className="border-2 border-black rounded"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
