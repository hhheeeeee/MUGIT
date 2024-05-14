import { useEffect, useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { v4 as uuidv4 } from "uuid";
import { downloadIcon, playIcon, stopIcon } from "../../constants/icons";

export default function DragnDrop({ audioFiles, setAudioFiles }) {
  const waveSurfers = useRef({});
  const waveformRefs = useRef({});
  const playIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-6 w-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    </svg>
  );
  useEffect(() => {
    document.body.ondrop = (e) => e.preventDefault();
  }, []);

  useEffect(() => {
    audioFiles.forEach(({ file, id }) => {
      if (!waveSurfers.current[id] && waveformRefs.current[id]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const wavesurfer = WaveSurfer.create({
            container: waveformRefs.current[id],
            waveColor: "rgba(200, 200, 200, 0.5)",
            progressColor: "rgba(100, 100, 100, 0.8)",
            url: event.target.result,
          });
          wavesurfer.on("ready", () => {
            waveSurfers.current[id] = wavesurfer;
            console.log("WaveSurfer is ready for id:", id);
          });
          wavesurfer.on("error", (e) => {
            console.error("WaveSurfer error:", e);
          });
        };
        reader.readAsDataURL(file);
      }
    });
  }, [audioFiles]);

  const handleFilesDrop = (files) => {
    setAudioFiles((prevFiles) => [
      ...prevFiles,
      ...Array.from(files).map((file) => ({
        file,
        id: uuidv4(),
      })),
    ]);
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
      {audioFiles.map(({ file, id }) => (
        <div key={id} className="file-container">
          <div className="controls">
            <p className="file-info">
              {file.name} - {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <button onClick={() => waveSurfers.current[id].playPause()}>
              <img src={playIcon} alt="Play/Pause" />
            </button>
            {/* <button onClick={() => waveSurfers.current[id].exportPCM()}>
              <img src={downloadIcon} alt="Download" />
            </button> */}
            <button
              onClick={() => {
                waveSurfers.current[id]?.destroy();
                delete waveSurfers.current[id];
                setAudioFiles((prev) => prev.filter((x) => x.id !== id));
              }}
            >
              <img src={stopIcon} alt="Remove" />
            </button>
          </div>
          <div
            ref={(el) => (waveformRefs.current[id] = el)}
            className="waveform"
          ></div>
        </div>
      ))}
      <style jsx>{`
        .file-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
        }
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
        .waveform {
          height: 100px;
          margin-top: 10px;
          width: 100%;
        }
        .controls {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .controls button {
          background: none;
          border: none;
          cursor: pointer;
          margin-right: 5px;
        }
        .controls img {
          width: 24px;
          height: 24px;
        }
        .file-info {
          text-align: center;
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
