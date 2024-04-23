"use client";

// const useAudio = () => {
//   const [audio, setAudio] = useState(new Audio()); // audio 엘리먼트다
//   const [play, setPlay] = useState(false); // 오디오 플레이어의 재생 여부를 나타내는 상태 값이다.
//   const [source, setSource] = useState(); // 재생할 오디오 소스 값이다.

//   useEffect(() => {
//     if (play) {
//       audio.play();
//     } else {
//       audio.pause();
//     }
//   }, [play]);

//   return {
//     play,
//     audio,
//     source,
//     toggle: () => setPlay((prev) => !prev),
//   };
// };
import { useAtom, useAtomValue } from "jotai";
import BottomController from "./BottomController";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  isplaying,
  nowPlaying,
  nowPlayingDuration,
  playingButton,
  nowPlayingTime,
} from "@/app/store/atoms";

import { formatTime } from "@/app/utils/formatTime";

const audioUrls = [
  "/musics/example.mp3",
  // "https://file-examples.com/storage/fe61ecc6566626110a55ee3/2017/11/file_example_MP3_700KB.mp3",
];

const BottomPlaybar = () => {
  const myRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useAtom(isplaying);
  const song = useAtomValue(nowPlaying);

  const [play, setPlay] = useAtom(playingButton);
  // const [currentTime, setCurrentTime] = useAtom(nowPlayingTime);
  // console.log(currentTime);

  // const { audio, toggle, play }  useAudio();
  // const progressRef = useRef(null);

  const handleClose = () => {
    localStorage.clear();
    setPlaying(false);
  };

  // const start = () => {
  //   if (myRef.current) {
  //     myRef.current.play();
  //   }
  //   setPlay(true);
  // };
  // // 일시 정지
  // const stop = () => {
  //   if (myRef.current) {
  //     myRef.current.pause();
  //   }
  //   setPlay(false);
  // };

  // useEffect(() => {
  //   if (!myRef.current) return;
  //   if (play) {
  //     myRef.current.play();
  //     console.log(myRef.current.currentTime);
  //   } else myRef.current.pause();
  // }, [play]);

  return (
    <>
      {playing === true ? (
        <>
          <div className="pt-4"></div>

          <div className="fixed bottom-0 left-0 flex h-24 w-full items-center justify-between bg-pointblue px-10">
            <div className="ml-20 flex">
              <div className="relative h-20 w-20 rounded-lg bg-red-500"></div>
              <div className="mx-4">
                <p className="mb-2 text-2xl font-bold text-pointyellow">
                  {song?.title}
                </p>
                <p className="text-pointyellow">{song?.name}</p>
              </div>
            </div>
            <BottomController />
            <div
              className="fixed bottom-16 right-5 text-white"
              onClick={() => handleClose()}
            >
              X
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default BottomPlaybar;
