"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import WaveSurfer from "wavesurfer.js";
import styles from "./liverecord.module.css";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import {
  recordIcon,
  stopIcon,
  playIcon,
  pauseIcon,
  downloadIcon,
} from "./editor/constants/icons";

const LiveRecord: React.FC = () => {
  const [wavesurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);
  const [record, setRecord] = useState<any | null>(null);
  const [scrollingWaveform, setScrollingWaveform] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const createWaveSurfer = () => {
    // Create an instance of WaveSurfer
    if (wavesurfer) {
      wavesurfer.destroy();
    }
    const container = document.querySelector<HTMLDivElement>("#mic");
    if (container) {
      const ws = WaveSurfer.create({
        container,
        waveColor: "#567FFF",
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

      // 끝난 레코드로 웨이브서퍼 만듦
      rec.on("record-end", (blob: Blob) => {
        const recordedUrl = URL.createObjectURL(blob);
        // Play button
        const playButton = document.createElement("button"); // <button> 요소 생성
        const playIconContainer = document.createElement("div");
        ReactDOM.render(playIcon, playIconContainer);
        playButton.appendChild(playIconContainer);
        playButton.style.border = "1px solid black";
        playButton.style.padding = "10px";
        playButton.onclick = () => wsRecorded.playPause();
        document
          .querySelector<HTMLDivElement>("#recordings")
          ?.appendChild(playButton);

        // Download button
        const downloadButton = document.createElement("button");
        const downloadIconContainer = document.createElement("div");
        ReactDOM.render(downloadIcon, downloadIconContainer);
        downloadButton.appendChild(downloadIconContainer);
        downloadButton.style.border = "1px solid black";
        downloadButton.style.padding = "10px";
        downloadButton.style.textDecoration = "none";
        downloadButton.onclick = () => {
          window.location.href = recordedUrl;
        };
        document
          .querySelector<HTMLDivElement>("#recordings")
          ?.appendChild(downloadButton);
        const wsRecorded = WaveSurfer.create({
          container: "#recordings",
          waveColor: "#567FFF",
          barGap: 1,
          barWidth: 2,
          barRadius: 2,
          cursorWidth: 3,
          cursorColor: "#567FFF",
          url: recordedUrl,
        });
      });

      rec.on("record-progress", (time: number) => {
        updateProgress(time);
      });
    }
  };

  // 시간 적용되는 부분
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

  // play/pause 버튼
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

  // record 버튼
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
  // 녹음시작 버튼
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
      {/* <select id="mic-select" className="mr-4">
        <option value="">Select mic</option>
      </select> */}

      <p id="progress">00:00</p>
      <div id="mic" className="mt-4 rounded-md border border-black"></div>

      <div id="recordings" className={`mt-4`}></div>
    </div>
  );
};

export default LiveRecord;
