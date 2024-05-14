import React, { useState, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import * as styles from "./Fmsynth.module.css"; // CSS 모듈 임포트

export const Fmsynth2 = () => {
  const [modulationIndex, setModulationIndex] = useState(2);
  const [modulationDepth, setModulationDepth] = useState(50);
  const [duration, setDuration] = useState(100);
  const [waveSurfer, setWaveSurfer] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [dataArray, setDataArray] = useState(null);

  useEffect(() => {
    const ac = new window.AudioContext();

    // Create an analyser node
    const analyserNode = ac.createAnalyser();
    analyserNode.fftSize = 512 * 2;
    analyserNode.connect(ac.destination);
    const data = new Float32Array(analyserNode.frequencyBinCount);

    setAnalyser(analyserNode);
    setDataArray(data);

    const createVoice = () => {
      // Carrier oscillator
      const carrierOsc = ac.createOscillator();
      carrierOsc.type = "sine";

      // Modulator oscillator
      const modulatorOsc = ac.createOscillator();
      modulatorOsc.type = "sine";

      // Modulation depth
      const modulationGain = ac.createGain();

      // Connect the modulator to the carrier frequency
      modulatorOsc.connect(modulationGain);
      modulationGain.connect(carrierOsc.frequency);

      // Create an output gain
      const outputGain = ac.createGain();
      outputGain.gain.value = 0;

      // Connect carrier oscillator to output
      carrierOsc.connect(outputGain);

      // Connect output to analyser
      outputGain.connect(analyser);

      // Start oscillators
      carrierOsc.start();
      modulatorOsc.start();

      return {
        carrierOsc,
        modulatorOsc,
        modulationGain,
        outputGain,
      };
    };

    const playNote = (
      frequency,
      modulationFrequency,
      modulationDepth,
      duration
    ) => {
      const voice = createVoice();
      const { carrierOsc, modulatorOsc, modulationGain, outputGain } = voice;

      carrierOsc.frequency.value = frequency;
      modulatorOsc.frequency.value = modulationFrequency;
      modulationGain.gain.value = modulationDepth;

      outputGain.gain.setValueAtTime(0.00001, ac.currentTime);
      outputGain.gain.exponentialRampToValueAtTime(
        1,
        ac.currentTime + duration / 1000
      );

      return voice;
    };

    const releaseNote = (voice, duration) => {
      const { carrierOsc, modulatorOsc, modulationGain, outputGain } = voice;
      outputGain.gain.cancelScheduledValues(ac.currentTime);
      outputGain.gain.setValueAtTime(1, ac.currentTime);
      outputGain.gain.exponentialRampToValueAtTime(
        0.0001,
        ac.currentTime + duration / 1000
      );

      setTimeout(() => {
        carrierOsc.stop();
        modulatorOsc.stop();
        carrierOsc.disconnect();
        modulatorOsc.disconnect();
        modulationGain.disconnect();
        outputGain.disconnect();
      }, duration + 100);
    };

    const wavesurfer = WaveSurfer.create({
      container: "#waveform",
      waveColor: "rgb(200, 0, 200)",
      cursorColor: "transparent",
      barWidth: 2,
      interact: false,
    });
    setWaveSurfer(wavesurfer);

    return () => {
      wavesurfer.destroy();
      ac.close();
    };
  }, []);

  const randomizeFmParams = () => {
    setModulationIndex(Math.random() * 10);
    setModulationDepth(Math.random() * 200);
    setDuration(Math.random() * 1000);
  };

  const drawWaveform = () => {
    if (!analyser || !dataArray) return;
    analyser.getFloatTimeDomainData(dataArray);
    const duration = parseFloat(document.getElementById("duration"));
    waveSurfer && waveSurfer.load("", [dataArray], duration);
  };

  useEffect(() => {
    const animationId = requestAnimationFrame(drawWaveform);
    return () => cancelAnimationFrame(animationId);
  }, [dataArray]);

  const onKeyDown = (freq) => {
    const modulationIndex = parseFloat(
      document.getElementById("modulationIndex")
    );
    const modulationDepth = parseFloat(
      document.getElementById("modulationDepth").value
    );
    const duration = parseFloat(document.getElementById("duration").value);
    return playNote(freq, freq * modulationIndex, modulationDepth, duration);
  };

  const onKeyUp = (voice) => {
    const duration = parseFloat(document.getElementById("duration").value);
    releaseNote(voice, duration);
  };

  const createButton = (row, col) => {
    const button = document.createElement("button");
    const key = qwerty[(row * numCols + col) % qwerty.length];
    const capsKey = capsQwerty[(row * numCols + col) % capsQwerty.length];
    const frequency = noteFrequency(row, col);
    let note = null;

    button.textContent = key;
    pianoRoll.appendChild(button);

    // Mouse
    button.addEventListener("mousedown", (e) => {
      note = onKeyDown(frequency * (e.shiftKey ? numRows : 1));
    });
    button.addEventListener("mouseup", () => {
      if (note) {
        onKeyUp(note);
        note = null;
      }
    });

    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === key || e.key === capsKey) {
        button.className = "active";
        if (!note) {
          note = onKeyDown(frequency * (e.shiftKey ? numRows : 1));
        }
      }
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === key || e.key === capsKey) {
        button.className = "";
        if (note) {
          onKeyUp(note);
          note = null;
        }
      }
    });
  };

  const createPianoRoll = () => {
    const baseFrequency = 110;
    const numRows = 4;
    const numCols = 10;

    const noteFrequency = (row, col) => {
      // The top row is the bass
      // The lower rows represent the notes of a major third chord
      // Columns represent the notes of a C major scale (there are 10 columns and 4 rows)
      const chord = [-8, 0, 4, 7];
      const scale = [0, 2, 4, 5, 7, 9, 11, 12, 14, 16];
      const note = chord[row] + scale[col];
      return baseFrequency * Math.pow(2, note / 12);
    };

    const pianoRoll = document.getElementById("pianoRoll");
    const qwerty = "1234567890qwertyuiopasdfghjkl;zxcvbnm,./";
    const capsQwerty = "!@#$%^&*()QWERTYUIOPASDFGHJKL:ZXCVBNM<>?";

    const onKeyDown = (freq) => {
      const modulationIndex = parseFloat(
        document.getElementById("modulationIndex")
      );
      const modulationDepth = parseFloat(
        document.getElementById("modulationDepth")
      );
      const duration = parseFloat(document.getElementById("duration"));
      return playNote(freq, freq * modulationIndex, modulationDepth, duration);
    };

    const onKeyUp = (voice) => {
      const duration = parseFloat(document.getElementById("duration"));
      releaseNote(voice, duration);
    };

    const createButton = (row, col) => {
      const button = document.createElement("button");
      const key = qwerty[(row * numCols + col) % qwerty.length];
      const capsKey = capsQwerty[(row * numCols + col) % capsQwerty.length];
      const frequency = noteFrequency(row, col);
      let note = null;

      button.textContent = key;
      pianoRoll.appendChild(button);

      // Mouse
      button.addEventListener("mousedown", (e) => {
        note = onKeyDown(frequency * (e.shiftKey ? numRows : 1));
      });
      button.addEventListener("mouseup", () => {
        if (note) {
          onKeyUp(note);
          note = null;
        }
      });

      // Keyboard
      document.addEventListener("keydown", (e) => {
        if (e.key === key || e.key === capsKey) {
          button.className = "active";
          if (!note) {
            note = onKeyDown(frequency * (e.shiftKey ? numRows : 1));
          }
        }
      });
      document.addEventListener("keyup", (e) => {
        if (e.key === key || e.key === capsKey) {
          button.className = "";
          if (note) {
            onKeyUp(note);
            note = null;
          }
        }
      });
    };

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        createButton(row, col);
      }
    }

    const buttons = document.querySelectorAll("button");
    document.addEventListener("keydown", (e) => {
      if (e.shiftKey) {
        Array.from(buttons).forEach((button, index) => {
          button.textContent = capsQwerty[index];
        });
      }
    });
    document.addEventListener("keyup", (e) => {
      if (!e.shiftKey) {
        Array.from(buttons).forEach((button, index) => {
          button.textContent = qwerty[index];
        });
      }
    });
  };

  useEffect(() => {
    createPianoRoll();
    randomizeFmParams();
  }, []);

  return (
    <div>
      <label>Modulation index:</label>
      <input
        type="range"
        min="0.5"
        max="10"
        value={modulationIndex}
        step="0.5"
        onChange={(e) => setModulationIndex(parseFloat(e.target.value))}
      />
      <br />
      <label>Modulation depth:</label>
      <input
        type="range"
        min="1"
        max="200"
        value={modulationDepth}
        step="1"
        onChange={(e) => setModulationDepth(parseFloat(e.target.value))}
      />
      <br />
      <label>Attack/release:</label>
      <input
        type="range"
        min="100"
        max="1000"
        value={duration}
        step="10"
        onChange={(e) => setDuration(parseFloat(e.target.value))}
      />
      <p>Hold Shift to play the notes one octave higher</p>
      <div id="pianoRoll" className={styles.pianoRoll}></div>
      <div id="waveform" className={styles.waveform}></div>
    </div>
  );
};
