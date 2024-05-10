// // pages/index.js

// import { useEffect, useState } from "react";
// import WaveSurfer from "wavesurfer.js";

// export default function Home() {
//   const [fileName, setFileName] = useState(""); // 파일 이름 상태 추가

//   useEffect(() => {
//     const pitchWorker = new Worker("/examples/pitch-worker.js", {
//       type: "module",
//     });

//     const wavesurfer = WaveSurfer.create({
//       container: "#waveform",
//       waveColor: "rgba(200, 200, 200, 0.5)",
//       progressColor: "rgba(100, 100, 100, 0.5)",
//       url: "/examples/audio/librivox.mp3",
//       minPxPerSec: 200,
//       sampleRate: 11025,
//     });

//     // Pitch detection
//     wavesurfer.on("decode", () => {
//       const peaks = wavesurfer.getDecodedData().getChannelData(0);
//       pitchWorker.postMessage({
//         peaks,
//         sampleRate: wavesurfer.options.sampleRate,
//       });
//     });

//     // Drag'n'drop
//     {
//       const dropArea = document.querySelector("#drop");
//       dropArea.ondragenter = (e) => {
//         e.preventDefault();
//         e.target.classList.add("over");
//       };
//       dropArea.ondragleave = (e) => {
//         e.preventDefault();
//         e.target.classList.remove("over");
//       };
//       dropArea.ondragover = (e) => {
//         e.preventDefault();
//       };
//       dropArea.ondrop = (e) => {
//         e.preventDefault();
//         e.target.classList.remove("over");

//         // Check if files are present
//         if (e.dataTransfer.files.length > 0) {
//           const reader = new FileReader();
//           reader.onload = (event) => {
//             wavesurfer.load(event.target.result);
//             console.log(e.dataTransfer.files);
//             setFileName(e.dataTransfer.files[0].name); // 파일 이름 상태 업데이트
//           };
//           reader.readAsDataURL(e.dataTransfer.files[0]);

//           // Write the name of the file into the drop area
//           dropArea.textContent = "Loading..."; // 로딩 중 표시
//           wavesurfer.empty();
//         } else {
//           console.log("No files dropped.");
//         }
//       };
//       document.body.ondrop = (e) => {
//         e.preventDefault();
//       };
//     }
//     // cleanup function
//     return () => {
//       // wavesurfer destroy 등의 정리 작업 추가
//     };
//   }, []);

//   return (
//     <>
//       <div id="waveform"></div>
//       <div id="drop" className="drop-area">
//         {fileName ? fileName : "Drag-n-drop your own audio file"}
//       </div>
//       <style jsx>{`
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
//         .drop-area.over {
//           border-color: #333;
//         }
//       `}</style>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import WaveSurfer from "wavesurfer.js";

export default function DragnDrop() {
  const [audioFiles, setAudioFiles] = useState([]); // 오디오 파일 목록 상태 추가

  useEffect(() => {
    // 웹 워커 생성 등의 코드

    // Drag'n'drop
    {
      const dropArea = document.querySelector("#drop");
      dropArea.ondragenter = (e) => {
        e.preventDefault();
        e.target.classList.add("over");
      };
      dropArea.ondragleave = (e) => {
        e.preventDefault();
        e.target.classList.remove("over");
      };
      dropArea.ondragover = (e) => {
        e.preventDefault();
      };
      dropArea.ondrop = (e) => {
        e.preventDefault();
        e.target.classList.remove("over");

        const files = e.dataTransfer.files;
        // 새로운 오디오 파일 목록을 기존 상태에 추가
        setAudioFiles((prevFiles) => [...prevFiles, ...files]);

        // 로딩 중 표시
        dropArea.textContent = "Loading...";

        // 오디오 파일을 Wavesurfer로 로드하고 UI 업데이트
        handleAudioLoad(files);
      };
      document.body.ondrop = (e) => {
        e.preventDefault();
      };
    }
    // cleanup function
    return () => {
      // wavesurfer destroy 등의 정리 작업 추가
    };
  }, []);

  // Wavesurfer를 사용하여 오디오 파일 로드 및 UI 업데이트 함수
  const handleAudioLoad = (files) => {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const wavesurfer = WaveSurfer.create({
          container: "#waveform",
          waveColor: "rgba(200, 200, 200, 0.5)",
          progressColor: "rgba(100, 100, 100, 0.5)",
          // 오디오 파일 로드
          url: event.target.result,
          minPxPerSec: 200,
          sampleRate: 11025,
        });

        // Play 버튼 토글 및 다운로드 활성화
        handleWaveSurferControls(wavesurfer, file.name);
      };
      reader.readAsDataURL(file);
    });
  };

  // Play 버튼 토글 및 다운로드 활성화 함수
  const handleWaveSurferControls = (wavesurfer, fileName) => {
    const playButton = document.createElement("button");
    playButton.textContent = "Play";
    playButton.onclick = () => wavesurfer.playPause();
    document.getElementById("controls").appendChild(playButton);

    const downloadButton = document.createElement("button");
    downloadButton.textContent = "Download";
    downloadButton.onclick = () => wavesurfer.exportPCM();
    document.getElementById("controls").appendChild(downloadButton);
  };

  return (
    <>
      <div id="waveform"></div>
      <div id="drop" className="drop-area">
        Drag-n-drop your own audio file
      </div>
      <div id="controls"></div>
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
        .drop-area.over {
          border-color: #333;
        }
      `}</style>
    </>
  );
}
