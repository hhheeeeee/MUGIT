// "use client";
// import React, { useState } from "react";
// import WaveSurfer from "wavesurfer.js";
// import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
// import {
//   recordIcon,
//   stopIcon,
//   playIcon,
//   pauseIcon,
//   downloadIcon,
// } from "../../constants/icons";

// interface LiveRecordProps {
//   onFileUpload: (files: File[]) => void;
// }

// const LiveRecord: React.FC<LiveRecordProps> = ({ onFileUpload }) => {
//   const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
//   const [record, setRecord] = useState<any | null>(null);
//   const [scrollingWaveform, setScrollingWaveform] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

//   const createWaveSurfer = () => {
//     if (wavesurfer) {
//       wavesurfer.destroy();
//     }
//     const container = document.querySelector<HTMLDivElement>("#mic");
//     if (container) {
//       const ws = WaveSurfer.create({
//         container,
//         waveColor: "white",
//         barGap: 1,
//         barWidth: 2,
//         barRadius: 2,
//         cursorWidth: 3,
//         cursorColor: "#567FFF",
//       });
//       setWaveSurfer(ws);

//       const rec = ws.registerPlugin(
//         RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false })
//       );
//       setRecord(rec);

//       rec.on("record-end", (blob: Blob) => {
//         const recordedUrl = URL.createObjectURL(blob);
//         setRecordedUrl(recordedUrl);

//         const wsRecorded = WaveSurfer.create({
//           container: "#recordings",
//           waveColor: "white",
//           barGap: 1,
//           barWidth: 2,
//           barRadius: 2,
//           cursorWidth: 3,
//           cursorColor: "#567FFF",
//           url: recordedUrl,
//         });

//         const button = container.appendChild(document.createElement("button"));
//         button.textContent = "Play";
//         button.onclick = () => wsRecorded.playPause();
//         wsRecorded.on("pause", () => (button.textContent = "Play"));
//         wsRecorded.on("play", () => (button.textContent = "Pause"));

//         const link = container.appendChild(document.createElement("a"));
//         Object.assign(link, {
//           href: recordedUrl,
//           download:
//             "recording." + blob.type.split(";")[0].split("/")[1] || "webm",
//           textContent: "Download",
//         });

//         // Upload to Edit 버튼 추가
//         const uploadButton = container.appendChild(
//           document.createElement("button")
//         );
//         uploadButton.textContent = "Upload to Edit";
//         uploadButton.onclick = () => {
//           const file = new File([blob], "recording.webm", {
//             type: blob.type,
//           });
//           onFileUpload([file]);
//         };
//       });

//       rec.on("record-progress", (time: number) => {
//         updateProgress(time);
//       });
//     }
//   };

//   const updateProgress = (time: number) => {
//     const formattedTime = [
//       Math.floor((time % 3600000) / 60000),
//       Math.floor((time % 60000) / 1000),
//     ]
//       .map((v) => (v < 10 ? "0" + v : v))
//       .join(":");
//     const progressElement =
//       document.querySelector<HTMLParagraphElement>("#progress");
//     if (progressElement) {
//       progressElement.textContent = formattedTime;
//     }
//   };

//   const togglePlay = () => {
//     setIsPlaying(!isPlaying);
//   };

//   const handlePauseClick = () => {
//     if (record?.isPaused()) {
//       record.resumeRecording();
//       togglePlay();
//     } else {
//       record.pauseRecording();
//       togglePlay();
//     }
//   };

//   const toggleRecord = () => {
//     setIsRecording(!isRecording);
//   };

//   const handleRecordClick = () => {
//     if (record?.isRecording() || record?.isPaused()) {
//       record?.stopRecording();
//       toggleRecord();
//     } else {
//       toggleRecord();
//       const micSelect =
//         document.querySelector<HTMLSelectElement>("#mic-select");
//       if (micSelect) {
//         const deviceId = micSelect.value;
//         record?.startRecording({ deviceId });
//       }
//     }
//   };

//   const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setScrollingWaveform(e.target.checked);
//     createWaveSurfer();
//   };

//   return (
//     <div>
//       <label className="inline-block">
//         <input type="checkbox" onChange={handleCheckboxChange} />
//         녹음하기
//       </label>
//       <button
//         id="record"
//         className="play-pause-button mr-4 rounded-md border p-2"
//         onClick={handleRecordClick}
//       >
//         {isRecording ? stopIcon : recordIcon}
//       </button>
//       <button
//         id="pause"
//         className="play-pause-button mr-4 rounded-md border p-2"
//         onClick={handlePauseClick}
//       >
//         {isPlaying ? playIcon : pauseIcon}
//       </button>
//       <select id="mic-select" className="mr-4">
//         <option value="">Select mic</option>
//       </select>

//       <p id="progress">00:00</p>
//       <div id="mic" className="mt-4 rounded-md border border-black"></div>

//       <div id="recordings" className="mt-4"></div>
//     </div>
//   );
// };

// export default LiveRecord;
"use client";
import React, { useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import {
  recordIcon,
  stopIcon,
  playIcon,
  pauseIcon,
  downloadIcon,
} from "../../constants/icons";

interface LiveRecordProps {
  onFileUpload: (files: File[]) => void;
}

const LiveRecord: React.FC<LiveRecordProps> = ({ onFileUpload }) => {
  const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [record, setRecord] = useState<any | null>(null);
  const [scrollingWaveform, setScrollingWaveform] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const createWaveSurfer = () => {
    if (wavesurfer) {
      wavesurfer.destroy();
    }
    const container = document.querySelector<HTMLDivElement>("#mic");
    if (container) {
      const ws = WaveSurfer.create({
        container,
        waveColor: "white",
        barGap: 1,
        barWidth: 2,
        barRadius: 2,
        cursorWidth: 3,
        cursorColor: "#567FFF",
      });
      setWaveSurfer(ws);

      const rec = ws.registerPlugin(
        RecordPlugin.create({ scrollingWaveform, renderRecordedAudio: false })
      );
      setRecord(rec);

      rec.on("record-end", (blob: Blob) => {
        const recordedUrl = URL.createObjectURL(blob);
        setRecordedUrl(recordedUrl);

        const wsRecorded = WaveSurfer.create({
          container: "#recordings",
          waveColor: "white",
          barGap: 1,
          barWidth: 2,
          barRadius: 2,
          cursorWidth: 3,
          cursorColor: "#567FFF",
          url: recordedUrl,
        });

        const button = container.appendChild(document.createElement("button"));
        button.textContent = "Play";
        button.onclick = () => wsRecorded.playPause();
        wsRecorded.on("pause", () => (button.textContent = "Play"));
        wsRecorded.on("play", () => (button.textContent = "Pause"));

        const link = container.appendChild(document.createElement("a"));
        Object.assign(link, {
          href: recordedUrl,
          download:
            "recording." + blob.type.split(";")[0].split("/")[1] || "webm",
          textContent: "Download",
        });

        // Upload to Edit 버튼 추가
        const uploadButton = container.appendChild(
          document.createElement("button")
        );
        uploadButton.textContent = "Upload to Edit";
        uploadButton.onclick = () => {
          const file = new File([blob], "recording.webm", {
            type: blob.type,
          });
          onFileUpload([file]);
        };
      });

      rec.on("record-progress", (time: number) => {
        updateProgress(time);
      });
    }
  };

  const updateProgress = (time: number) => {
    const formattedTime = [
      Math.floor((time % 3600000) / 60000),
      Math.floor((time % 60000) / 1000),
    ]
      .map((v) => (v < 10 ? "0" + v : v))
      .join(":");
    const progressElement =
      document.querySelector<HTMLParagraphElement>("#progress");
    if (progressElement) {
      progressElement.textContent = formattedTime;
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePauseClick = () => {
    if (record?.isPaused()) {
      record.resumeRecording();
      togglePlay();
    } else {
      record.pauseRecording();
      togglePlay();
    }
  };

  const toggleRecord = () => {
    setIsRecording(!isRecording);
  };

  const handleRecordClick = () => {
    if (record?.isRecording() || record?.isPaused()) {
      record?.stopRecording();
      toggleRecord();
    } else {
      toggleRecord();
      const micSelect =
        document.querySelector<HTMLSelectElement>("#mic-select");
      if (micSelect) {
        const deviceId = micSelect.value;
        record?.startRecording({ deviceId });
      }
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScrollingWaveform(e.target.checked);
    createWaveSurfer();
  };

  return (
    <div>
      <label className="inline-block">
        <input type="checkbox" onChange={handleCheckboxChange} />
        녹음하기
      </label>
      <button
        id="record"
        className="play-pause-button mr-4 rounded-md border p-2"
        onClick={handleRecordClick}
      >
        {isRecording ? stopIcon : recordIcon}
      </button>
      <button
        id="pause"
        className="play-pause-button mr-4 rounded-md border p-2"
        onClick={handlePauseClick}
      >
        {isPlaying ? playIcon : pauseIcon}
      </button>
      <select id="mic-select" className="mr-4">
        <option value="">Select mic</option>
      </select>

      <p id="progress">00:00</p>
      <div id="mic" className="mt-4 rounded-md border border-black"></div>

      <div id="recordings" className="mt-4"></div>
    </div>
  );
};

export default LiveRecord;
