import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { v4 as uuidv4 } from "uuid";
import {
  downloadIcon,
  stopIcon,
  playIcon,
  pauseIcon,
} from "../../constants/icons.js";

interface AudioFile {
  file: File;
  id: string;
}

interface DragnDropProps {
  audioFiles: AudioFile[];
  setAudioFiles: (files: AudioFile[]) => void;
}

export default function DragnDrop({
  audioFiles,
  setAudioFiles,
}: DragnDropProps) {
  const waveSurfers = useRef<{ [key: string]: WaveSurfer | null }>({});
  const waveformRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    document.body.ondrop = (e) => e.preventDefault();
  }, []);

  useEffect(() => {
    audioFiles.forEach(({ file, id }) => {
      if (!waveSurfers.current[id] && waveformRefs.current[id]) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const wavesurfer = WaveSurfer.create({
              container: waveformRefs.current[id]!,
              waveColor: "rgba(200, 200, 200, 0.5)",
              progressColor: "rgba(100, 100, 100, 0.8)",
              url: event.target.result as string,
            });
            waveSurfers.current[id] = wavesurfer;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, [audioFiles]);

  const handleFilesDrop = (files: FileList) => {
    setAudioFiles([
      ...audioFiles,
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
            <button onClick={() => waveSurfers.current[id]?.playPause()}>
              {playIcon}
            </button>
            <button
              onClick={() => {
                waveSurfers.current[id]?.destroy();
                delete waveSurfers.current[id];
                setAudioFiles(audioFiles.filter((x) => x.id !== id));
              }}
            >
              {stopIcon}
            </button>
            <p className="file-info">{file.name}</p>
          </div>
          <div
            ref={(el) => {
              waveformRefs.current[id] = el;
            }}
            className="waveform"
          ></div>
        </div>
      ))}
      <style jsx>{`
        .file-container {
          display: flex;
          flex-direction: column;
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
      `}</style>
    </>
  );
}
