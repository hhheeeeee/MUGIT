"use client";

// import { useMemo, useState, useCallback, useRef, useEffect } from "react";
// import { useWavesurfer } from "@wavesurfer/react";
// import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
// import { formatTime } from "@/app/utils/formatTime";

// const audioUrls = [
//   "/musics/example.mp3",
//   // "https://file-examples.com/storage/fe61ecc6566626110a55ee3/2017/11/file_example_MP3_700KB.mp3",
// ];

// export default function AudioSprites() {
//   const containerRef = useRef(null);
//   const [audio, setAudio] = useState<HTMLAudioElement | null>();
//   // const [urlIndex, setUrlIndex] = useState(0);
//   // console.log(audio?.currentTime);
//   useEffect(() => {
//     const _audio = new Audio();
//     _audio.controls = true;
//     _audio.src = audioUrls[0];
//     _audio.volume = 0;
//     setAudio(_audio);
//   }, []);

//   const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
//     container: containerRef,
//     height: 80,
//     // url: audioUrls[0],
//     media: audio!,
//     // plugins: useMemo(() => [Timeline.create()], []),
//     waveColor: "#494950",
//     progressColor: "#0011ff",
//     cursorColor: "#eeff00",
//     cursorWidth: 2,
//     barWidth: 3,
//     barGap: 2,
//     barRadius: 9,
//     minPxPerSec: 1,
//     fillParent: true,
//     // mediaControls: true,
//     dragToSeek: true,
//     hideScrollbar: false,
//     audioRate: 1,
//     autoScroll: true,
//     autoCenter: true,
//   });

//   // const onUrlChange = useCallback(() => {
//   //   setUrlIndex((index) => (index + 1) % audioUrls.length);
//   // }, []);

//   const onPlayPause = useCallback(() => {
//     wavesurfer && wavesurfer.playPause();
//   }, [wavesurfer]);

//   const [width, setWidth] = useState(0);

//   const handleMouseMove = (e: any) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left; // 현재 마우스 위치
//     setWidth(x);
//   };

//   return (
//     <>
//       <div className="flex  w-full">
//         <div
//           onClick={onPlayPause}
//           style={{ minWidth: "5em" }}
//           className="flex w-[10%] items-center justify-center"
//         >
//           <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pointyellow">
//             {isPlaying ? ">" : "||"}
//           </span>
//         </div>
//         <div
//           className="relative w-[90%]"
//           onMouseMove={handleMouseMove}
//           onMouseLeave={() => setWidth(0)}
//         >
//           <div ref={containerRef} className="absolute left-0 top-0 w-full" />
//           <div
//             style={{ width: `${width}px` }}
//             className="absolute left-0 top-0 h-full bg-pointblue bg-opacity-40 transition-all duration-300"
//           ></div>
//         </div>
//       </div>

//       <p>Current audio: {audioUrls[0]}</p>

//       <p>Current time: {formatTime(currentTime)}</p>

//       {/* <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
//         <button onClick={onUrlChange}>Change audio</button>
//       </div> */}
//       {/* <audio
//         className="absolute bottom-0 left-0 w-full"
//         controls
//         src={audioUrls[0]}
//       ></audio>
//       <p>isplaying : {isPlaying} </p> */}
//     </>
//   );
// }

"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { formatTime } from "@/app/utils/formatTime";

const audioUrls = [
  "/musics/example.mp3",
  // "https://file-examples.com/storage/fe61ecc6566626110a55ee3/2017/11/file_example_MP3_700KB.mp3",
];

export default function AudioSprites() {
  const containerRef = useRef(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>();
  // const [urlIndex, setUrlIndex] = useState(0);
  // console.log(audio?.currentTime);
  useEffect(() => {
    const _audio = new Audio();
    _audio.controls = true;
    _audio.src = audioUrls[0];
    _audio.volume = 0;
    setAudio(_audio);
  }, []);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 80,
    // url: audioUrls[0],
    media: audio!,
    // plugins: useMemo(() => [Timeline.create()], []),
    waveColor: "#494950",
    progressColor: "#0011ff",
    cursorColor: "#eeff00",
    cursorWidth: 2,
    barWidth: 10,
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

  const [width, setWidth] = useState(0);

  const handleMouseMove = (e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // 현재 마우스 위치
    setWidth(x);
  };

  return (
    <>
      <div className="flex  w-full">
        <div
          onClick={onPlayPause}
          style={{ minWidth: "5em" }}
          className="flex w-[10%] items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-pointyellow">
            {isPlaying ? ">" : "||"}
          </span>
        </div>
        <div
          className="relative w-[90%]"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setWidth(0)}
        >
          <div ref={containerRef} className="absolute left-0 top-0 w-full" />
          <div
            style={{ width: `${width}px` }}
            className="absolute left-0 top-0 h-full bg-pointblue bg-opacity-40 transition-all duration-300"
          ></div>
        </div>
      </div>

      <p>Current audio: {audioUrls[0]}</p>

      <p>Current time: {formatTime(currentTime)}</p>

      {/* <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
        <button onClick={onUrlChange}>Change audio</button>
      </div> */}
      {/* <audio
        className="absolute bottom-0 left-0 w-full"
        controls
        src={audioUrls[0]}
      ></audio>
      <p>isplaying : {isPlaying} </p> */}
    </>
  );
}
