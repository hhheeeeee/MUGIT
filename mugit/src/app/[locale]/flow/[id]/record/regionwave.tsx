import Wavesurfer from "wavesurfer.js";
import Minimap from "wavesurfer.js/dist/plugins/minimap.esm.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import EnvelopePlugin from "wavesurfer.js/dist/plugins/envelope.esm.js";
import { useEffect, useRef, useState } from "react";
import {
  recordIcon,
  stopIcon,
  playIcon,
  pauseIcon,
  downloadIcon,
} from "./editor/constants/icons";

const RegionWave = ({ url }: { url: string }) => {
  const waveform = useRef<Wavesurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isEnvelopeVisible, setIsEnvelopeVisible] = useState(true);
  const [isRegionVisible, setIsRegionVisible] = useState(true);

  const className = `waveform-container-${url.replace(/[^a-zA-Z0-9]/g, "-")}`;

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (!waveform.current) {
      // 그저 디자인
      waveform.current = Wavesurfer.create({
        container: `.${className}`,
        waveColor: "#D0D0D0",
        barGap: 1,
        barWidth: 2,
        barRadius: 2,
        cursorWidth: 3,
        cursorColor: "#FFFFFF",
        plugins: [
          // Minimap.create({
          //   height: 20,
          //   waveColor: "yellow",
          //   progressColor: "#999",
          // }),
        ],
      });
      waveform.current.load(url);

      // const volumeLabel = document.getElementById("volumeLabel");
      // const showVolume = () => {
      //   if (volumeLabel) {
      //     volumeLabel.textContent = waveform.current
      //       ?.getCurrentVolume()
      //       .toFixed(2);
      //   }
      // };
      // waveform.current.on("ready", showVolume);
      // waveform.current.on("volume-change", showVolume);

      // Zoom 기능
      waveform.current?.once("decode", () => {
        const rangeInput = document.querySelector('input[type="range"]');
        // if (rangeInput) {
        //   rangeInput.oninput = (e: { target: { value: any } }) => {
        //     const minPxPerSec = Number(e.target.value);
        //     waveform.current?.zoom(minPxPerSec);
        //   };
        // }
      });
    }
  }, []);

  const playAudio = () => {
    if (waveform.current) {
      togglePlay();
      if (waveform.current.isPlaying()) {
        waveform.current.pause();
      } else {
        waveform.current.play();
      }
    }
  };

  return (
    <div className="flex items-center">
      <div>
        {/* Volume label */}
        <p className="volume-label">
          Volume: <label>0</label>
        </p>
        {/* Zoom input */}
        {/* <p>
          <label className="zoom-label">
            Zoom: <input type="range" min="10" max="1000" value="10" />
          </label>
        </p> */}
        {/* Play/pause button */}
        <div className="flex-row">
          <button
            className="play-pause-button mr-4 rounded-md border p-2"
            onClick={playAudio}
          >
            {isPlaying ? pauseIcon : playIcon}
          </button>
        </div>
      </div>
      {/* Waveform container */}
      <div className={`waveform-container rounded-lg ${className}`} />
    </div>
  );
};

export default RegionWave;
