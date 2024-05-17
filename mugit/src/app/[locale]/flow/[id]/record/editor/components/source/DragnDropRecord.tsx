// // import React, { useEffect, useRef } from "react";
// // import WaveSurfer from "wavesurfer.js";
// // import { v4 as uuidv4 } from "uuid";
// // import {
// //   downloadIcon,
// //   stopIcon,
// //   playIcon,
// //   pauseIcon,
// // } from "../../constants/icons";

// // interface AudioFile {
// //   file: File;
// //   id: string;
// // }

// // interface DragnDropProps {
// //   audioFiles: AudioFile[];
// //   setAudioFiles: (files: AudioFile[]) => void;
// // }

// // export default function DragnDrop({
// //   audioFiles,
// //   setAudioFiles,
// // }: DragnDropProps) {
// //   const waveSurfers = useRef<{ [key: string]: WaveSurfer | null }>({});
// //   const waveformRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

// //   useEffect(() => {
// //     document.body.ondrop = (e) => e.preventDefault();
// //   }, []);

// //   useEffect(() => {
// //     audioFiles.forEach(({ file, id }) => {
// //       if (!waveSurfers.current[id] && waveformRefs.current[id]) {
// //         const reader = new FileReader();
// //         reader.onload = (event) => {
// //           if (event.target && event.target.result) {
// //             const canvas = document.createElement("canvas");
// //             const ctx = canvas.getContext("2d");

// //             if (ctx) {
// //               // Define the waveform gradient
// //               const gradient = ctx.createLinearGradient(
// //                 0,
// //                 0,
// //                 0,
// //                 canvas.height * 1.35
// //               );
// //               gradient.addColorStop(0, "#656666"); // Top color
// //               gradient.addColorStop(
// //                 (canvas.height * 0.7) / canvas.height,
// //                 "#656666"
// //               ); // Top color
// //               gradient.addColorStop(
// //                 (canvas.height * 0.7 + 1) / canvas.height,
// //                 "#ffffff"
// //               ); // White line
// //               gradient.addColorStop(
// //                 (canvas.height * 0.7 + 2) / canvas.height,
// //                 "#ffffff"
// //               ); // White line
// //               gradient.addColorStop(
// //                 (canvas.height * 0.7 + 3) / canvas.height,
// //                 "#B1B1B1"
// //               ); // Bottom color
// //               gradient.addColorStop(1, "#B1B1B1"); // Bottom color

// //               // Define the progress gradient
// //               const progressGradient = ctx.createLinearGradient(
// //                 0,
// //                 0,
// //                 0,
// //                 canvas.height * 1.35
// //               );
// //               progressGradient.addColorStop(0, "#EE772F"); // Top color
// //               progressGradient.addColorStop(
// //                 (canvas.height * 0.7) / canvas.height,
// //                 "#EB4926"
// //               ); // Top color
// //               progressGradient.addColorStop(
// //                 (canvas.height * 0.7 + 1) / canvas.height,
// //                 "#ffffff"
// //               ); // White line
// //               progressGradient.addColorStop(
// //                 (canvas.height * 0.7 + 2) / canvas.height,
// //                 "#ffffff"
// //               ); // White line
// //               progressGradient.addColorStop(
// //                 (canvas.height * 0.7 + 3) / canvas.height,
// //                 "#F6B094"
// //               ); // Bottom color
// //               progressGradient.addColorStop(1, "#F6B094"); // Bottom color

// //               const wavesurfer = WaveSurfer.create({
// //                 container: waveformRefs.current[id]!,
// //                 waveColor: gradient,
// //                 progressColor: progressGradient,
// //                 barWidth: 2,
// //                 barHeight: 1, // Adjust bar height to make waveform more sensitive
// //                 cursorWidth: 1,
// //                 normalize: true,
// //                 url: event.target.result as string,
// //               });

// //               wavesurfer.on("interaction", () => {
// //                 wavesurfer.playPause();
// //               });

// //               const hover = document.querySelector<HTMLDivElement>(
// //                 `#hover-${id}`
// //               );
// //               const waveform = waveformRefs.current[id];
// //               if (waveform) {
// //                 waveform.addEventListener("pointermove", (e) => {
// //                   if (hover) hover.style.width = `${e.offsetX}px`;
// //                 });
// //               }

// //               const formatTime = (seconds: number) => {
// //                 const minutes = Math.floor(seconds / 60);
// //                 const secondsRemainder = Math.round(seconds) % 60;
// //                 const paddedSeconds = `0${secondsRemainder}`.slice(-2);
// //                 return `${minutes}:${paddedSeconds}`;
// //               };

// //               const timeEl = document.querySelector<HTMLDivElement>(
// //                 `#time-${id}`
// //               );
// //               const durationEl = document.querySelector<HTMLDivElement>(
// //                 `#duration-${id}`
// //               );

// //               wavesurfer.on("decode", (duration) => {
// //                 if (durationEl) durationEl.textContent = formatTime(duration);
// //               });
// //               wavesurfer.on("timeupdate", (currentTime) => {
// //                 if (timeEl) timeEl.textContent = formatTime(currentTime);
// //               });

// //               waveSurfers.current[id] = wavesurfer;
// //             }
// //           }
// //         };
// //         reader.readAsDataURL(file);
// //       }
// //     });
// //   }, [audioFiles]);

// //   const handleFilesDrop = (files: FileList) => {
// //     setAudioFiles([
// //       ...audioFiles,
// //       ...Array.from(files).map((file) => ({
// //         file,
// //         id: uuidv4(),
// //       })),
// //     ]);
// //   };

// //   return (
// //     <>
// //       <div
// //         id="drop"
// //         className="drop-area"
// //         onDragOver={(e) => e.preventDefault()}
// //         onDrop={(e) => {
// //           e.preventDefault();
// //           handleFilesDrop(e.dataTransfer.files);
// //         }}
// //       >
// //         Drag-n-drop your own audio file
// //       </div>
// //       {audioFiles.map(({ file, id }) => (
// //         <div key={id} className="file-container">
// //           <div className="controls">
// //             <button onClick={() => waveSurfers.current[id]?.playPause()}>
// //               {playIcon}
// //             </button>
// //             <button
// //               onClick={() => {
// //                 waveSurfers.current[id]?.destroy();
// //                 delete waveSurfers.current[id];
// //                 setAudioFiles(audioFiles.filter((x) => x.id !== id));
// //               }}
// //             >
// //               {stopIcon}
// //             </button>
// //             <p className="file-info">{file.name}</p>
// //           </div>
// //           <div
// //             id={`waveform-${id}`}
// //             ref={(el) => {
// //               waveformRefs.current[id] = el;
// //             }}
// //             className="waveform"
// //           >
// //             <div id={`time-${id}`} className="time">
// //               0:00
// //             </div>
// //             <div id={`duration-${id}`} className="duration">
// //               0:00
// //             </div>
// //             <div id={`hover-${id}`} className="hover"></div>
// //           </div>
// //         </div>
// //       ))}
// //       <style jsx>{`
// //         .file-container {
// //           display: flex;
// //           flex-direction: column;
// //           margin-bottom: 20px;
// //         }
// //         .drop-area {
// //           height: 128px;
// //           border: 4px dashed #999;
// //           margin: 2em 0;
// //           text-align: center;
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: center;
// //           font-size: 18px;
// //         }
// //         .waveform {
// //           height: 100px;
// //           margin-top: 10px;
// //           width: 100%;
// //           position: relative;
// //         }
// //         .hover {
// //           position: absolute;
// //           left: 0;
// //           top: 0;
// //           z-index: 10;
// //           pointer-events: none;
// //           height: 100%;
// //           width: 0;
// //           mix-blend-mode: overlay;
// //           background: rgba(255, 255, 255, 0.5);
// //           opacity: 0;
// //           transition: opacity 0.2s ease;
// //         }
// //         .waveform:hover .hover {
// //           opacity: 1;
// //         }
// //         .time,
// //         .duration {
// //           position: absolute;
// //           z-index: 11;
// //           top: 50%;
// //           margin-top: -1px;
// //           transform: translateY(-50%);
// //           font-size: 11px;
// //           background: rgba(0, 0, 0, 0.75);
// //           padding: 2px;
// //           color: #ddd;
// //         }
// //         .time {
// //           left: 0;
// //         }
// //         .duration {
// //           right: 0;
// //         }
// //       `}</style>
// //     </>
// //   );
// // }
// import React, { useEffect, useRef } from "react";
// import WaveSurfer from "wavesurfer.js";
// import { v4 as uuidv4 } from "uuid";
// import {
//   downloadIcon,
//   stopIcon,
//   playIcon,
//   pauseIcon,
// } from "../../constants/icons";

// interface AudioFile {
//   file: File;
//   id: string;
// }

// interface DragnDropProps {
//   audioFiles: AudioFile[];
//   setAudioFiles: (files: AudioFile[]) => void;
// }

// export default function DragnDrop({
//   audioFiles,
//   setAudioFiles,
// }: DragnDropProps) {
//   const waveSurfers = useRef<{ [key: string]: WaveSurfer | null }>({});
//   const waveformRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

//   useEffect(() => {
//     document.body.ondrop = (e) => e.preventDefault();
//   }, []);

//   useEffect(() => {
//     audioFiles.forEach(({ file, id }) => {
//       if (!waveSurfers.current[id] && waveformRefs.current[id]) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           if (event.target && event.target.result) {
//             const canvas = document.createElement("canvas");
//             const ctx = canvas.getContext("2d");

//             if (ctx) {
//               // Define the waveform gradient
//               const gradient = ctx.createLinearGradient(
//                 0,
//                 0,
//                 0,
//                 canvas.height * 1.35
//               );
//               gradient.addColorStop(0, "#656666"); // Top color
//               gradient.addColorStop(
//                 (canvas.height * 0.7) / canvas.height,
//                 "#656666"
//               ); // Top color
//               gradient.addColorStop(
//                 (canvas.height * 0.7 + 1) / canvas.height,
//                 "#ffffff"
//               ); // White line
//               gradient.addColorStop(
//                 (canvas.height * 0.7 + 2) / canvas.height,
//                 "#ffffff"
//               ); // White line
//               gradient.addColorStop(
//                 (canvas.height * 0.7 + 3) / canvas.height,
//                 "#B1B1B1"
//               ); // Bottom color
//               gradient.addColorStop(1, "#B1B1B1"); // Bottom color

//               // Define the progress gradient
//               const progressGradient = ctx.createLinearGradient(
//                 0,
//                 0,
//                 0,
//                 canvas.height * 1.35
//               );
//               progressGradient.addColorStop(0, "#EE772F"); // Top color
//               progressGradient.addColorStop(
//                 (canvas.height * 0.7) / canvas.height,
//                 "#EB4926"
//               ); // Top color
//               progressGradient.addColorStop(
//                 (canvas.height * 0.7 + 1) / canvas.height,
//                 "#ffffff"
//               ); // White line
//               progressGradient.addColorStop(
//                 (canvas.height * 0.7 + 2) / canvas.height,
//                 "#ffffff"
//               ); // White line
//               progressGradient.addColorStop(
//                 (canvas.height * 0.7 + 3) / canvas.height,
//                 "#F6B094"
//               ); // Bottom color
//               progressGradient.addColorStop(1, "#F6B094"); // Bottom color

//               const wavesurfer = WaveSurfer.create({
//                 container: waveformRefs.current[id]!,
//                 waveColor: gradient,
//                 progressColor: progressGradient,
//                 barWidth: 2,
//                 barHeight: 1, // Adjust bar height to make waveform more sensitive
//                 cursorWidth: 1,
//                 normalize: true,
//                 url: event.target.result as string,
//               });

//               wavesurfer.on("interaction", () => {
//                 wavesurfer.playPause();
//               });

//               const hover = document.querySelector<HTMLDivElement>(
//                 `#hover-${id}`
//               );
//               const waveform = waveformRefs.current[id];
//               if (waveform) {
//                 waveform.addEventListener("pointermove", (e) => {
//                   if (hover) hover.style.width = `${e.offsetX}px`;
//                 });
//               }

//               const formatTime = (seconds: number) => {
//                 const minutes = Math.floor(seconds / 60);
//                 const secondsRemainder = Math.round(seconds) % 60;
//                 const paddedSeconds = `0${secondsRemainder}`.slice(-2);
//                 return `${minutes}:${paddedSeconds}`;
//               };

//               const timeEl = document.querySelector<HTMLDivElement>(
//                 `#time-${id}`
//               );
//               const durationEl = document.querySelector<HTMLDivElement>(
//                 `#duration-${id}`
//               );

//               wavesurfer.on("decode", (duration) => {
//                 if (durationEl) durationEl.textContent = formatTime(duration);
//               });
//               wavesurfer.on("timeupdate", (currentTime) => {
//                 if (timeEl) timeEl.textContent = formatTime(currentTime);
//               });

//               waveSurfers.current[id] = wavesurfer;
//             }
//           }
//         };
//         reader.readAsDataURL(file);
//       }
//     });
//   }, [audioFiles]);

//   const handleFilesDrop = (files: FileList) => {
//     setAudioFiles([
//       ...audioFiles,
//       ...Array.from(files).map((file) => ({
//         file,
//         id: uuidv4(),
//       })),
//     ]);
//   };

//   return (
//     <>
//       <div
//         id="drop"
//         className="drop-area"
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           handleFilesDrop(e.dataTransfer.files);
//         }}
//       >
//         Drag-n-drop your own audio file
//       </div>
//       {audioFiles.map(({ file, id }) => (
//         <div key={id} className="file-container">
//           <div className="controls">
//             <button onClick={() => waveSurfers.current[id]?.playPause()}>
//               {playIcon}
//             </button>
//             <button
//               onClick={() => {
//                 waveSurfers.current[id]?.destroy();
//                 delete waveSurfers.current[id];
//                 setAudioFiles(audioFiles.filter((x) => x.id !== id));
//               }}
//             >
//               {stopIcon}
//             </button>
//             <p className="file-info">{file.name}</p>
//           </div>
//           <div
//             id={`waveform-${id}`}
//             ref={(el) => {
//               waveformRefs.current[id] = el;
//             }}
//             className="waveform"
//           >
//             <div id={`time-${id}`} className="time">
//               0:00
//             </div>
//             <div id={`duration-${id}`} className="duration">
//               0:00
//             </div>
//             <div id={`hover-${id}`} className="hover"></div>
//           </div>
//         </div>
//       ))}
//       <style jsx>{`
//         .file-container {
//           display: flex;
//           flex-direction: column;
//           margin-bottom: 20px;
//         }
//         .drop-area {
//           height: 128px;
//           border: 4px dashed #999;
//           margin: 2em 0;
//           text-align: center;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           font-size: 18px;
//         }
//         .waveform {
//           height: 100px;
//           margin-top: 10px;
//           width: 100%;
//           position: relative;
//         }
//         .hover {
//           position: absolute;
//           left: 0;
//           top: 0;
//           z-index: 10;
//           pointer-events: none;
//           height: 100%;
//           width: 0;
//           mix-blend-mode: overlay;
//           background: rgba(255, 255, 255, 0.5);
//           opacity: 0;
//           transition: opacity 0.2s ease;
//         }
//         .waveform:hover .hover {
//           opacity: 1;
//         }
//         .time,
//         .duration {
//           position: absolute;
//           z-index: 11;
//           top: 50%;
//           margin-top: -1px;
//           transform: translateY(-50%);
//           font-size: 11px;
//           background: rgba(0, 0, 0, 0.75);
//           padding: 2px;
//           color: #ddd;
//         }
//         .time {
//           left: 0;
//         }
//         .duration {
//           right: 0;
//         }
//       `}</style>
//     </>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { minusCircleIcon } from "../../constants/icons";
import WaveSurferComp from "../../../WaveSurferComp";

interface AudioFile {
  file: File;
  id: string;
  url: string;
}

interface DragnDropProps {
  audioFiles: AudioFile[];
  setAudioFiles: (files: AudioFile[]) => void;
}

export default function DragnDrop({
  audioFiles,
  setAudioFiles,
}: DragnDropProps) {
  useEffect(() => {
    document.body.ondrop = (e) => e.preventDefault();
  }, []);

  const handleFilesDrop = (files: FileList) => {
    const newFiles = Array.from(files).map((file) => {
      const url = URL.createObjectURL(file);
      return { file, id: uuidv4(), url };
    });
    setAudioFiles([...audioFiles, ...newFiles]);
  };

  const handlePlayPause = (id: string) => {
    const audio = audioFiles.find((audioFile) => audioFile.id === id);
    if (audio) {
      // Implement play/pause functionality here if needed
    }
  };

  return (
    <>
      <div
        id="drop"
        className="drop-area"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFilesDrop(e.dataTransfer.files);
        }}
      >
        Drag-n-drop your own audio file
      </div>
      {audioFiles.map(({ file, id, url }) => (
        <div key={id} className="file-container relative mb-5 flex flex-col">
          <div className="controls flex justify-between">
            {/* <button
              onClick={() => handlePlayPause(id)}
              className="border-zz h-fit border-solid border-black bg-pointyellow text-black"
            >
              {playIcon}
            </button> */}
            <button
              onClick={() => {
                setAudioFiles(audioFiles.filter((x) => x.id !== id));
                URL.revokeObjectURL(url); // Clean up the object URL
              }}
              className="h-fit"
            >
              {minusCircleIcon}
            </button>
            <p className="file-info">{file.name}</p>
          </div>
          <WaveSurferComp
            key={id}
            musicname={file.name}
            musicPath={url}
            type="source"
          />
        </div>
      ))}
      <style jsx>{`
        .drop-area {
          height: 128px;
          border: 4px dashed #999;
          margin: 2em 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 18px;
        }
        .file-container {
          display: flex;
          flex-direction: column;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
}
