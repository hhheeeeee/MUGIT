"use client";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import ReactStudio from "react-studio-js";
import EventEmitter from "event-emitter";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";
import { Box, Paper } from "@mui/material";
import CustomAudioBar from "./components/CUSTOM/audioBar/CustomAudioBar";
import { dark } from "./theme";
import { useThemeSettings } from "./hooks";
import EditorButtons from "./components/editorButtons/EditorButtons";
import ModeSwitch from "./components/ModeSwitch";
import * as Tone from "tone";
import { useAtomValue, useAtom } from "jotai";
import { fileToEdit } from "@/app/store/atoms/editfile";
import { send } from "process";
const Edit = ({ uploadedFiles }) => {
  const { theme, setEventEmitter, podcast, showAnnotations, setDialogBox } =
    useThemeSettings();

  const { backgroundColor, textColor } = theme;

  const SETBUTTONS = "SETBUTTONS";
  const SETENABLECUT = "SETENABLECUT";
  const SETENEABLESPLIT = "SETENEABLESPLIT";
  const PLAYLIST = "PLAYLIST";

  const initialState = {
    ee: new EventEmitter(),
    toneCtx: Tone.getContext(),
    setUpChain: useRef(),
    uploadRef: useRef(null),
    uploadAnnRef: useRef(null),
    allbuttons: true,
    enableCut: true,
    enableSplit: true,
    playlist: () => {},
  };

  function reducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case SETBUTTONS:
        return { ...state, allbuttons: payload };
      case SETENABLECUT:
        return { ...state, enableCut: payload };
      case SETENEABLESPLIT:
        return { ...state, enableSplit: payload };
      case PLAYLIST:
        return { ...state, playlist: payload };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const [tracks, setTracks] = useState([]);
  const { ee, toneCtx, setUpChain, uploadRef } = state;
  let sendFile = useAtomValue(fileToEdit);
  console.log("$$$$$$$$$$$$$$$sendFile : ", sendFile);
  useEffect(() => {
    console.log("$$$$$$$$$$$$$$$sendFile : ", sendFile);
  }, [sendFile]);
  const [myMusicArray, setMyMusicArray] = useAtom(fileToEdit);
  const container = useCallback(
    (node) => {
      if (node !== null && toneCtx !== null) {
        const playlist = ReactStudio(
          {
            ac: toneCtx.rawContext,
            container: node,
            state: "cursor",
            mono: true,
            samplesPerPixel: 500,
            waveHeight: 100,
            isAutomaticScroll: true,
            timescale: false,
            barGap: 1,
            colors: {
              waveOutlineColor: "#222B36",
              timeColor: "grey",
              fadeColor: "black",
            },
            controls: {
              show: true,
              width: 175,
              widgets: {
                collapse: false,
              },
              customClass: "custom-controls",
            },
            zoomLevels: [500, 1000, 2000],
            seekStyle: "fill",
          },
          ee
        );
        dispatch({
          type: PLAYLIST,
          payload: playlist,
        });
        ee.on("audiorenderingstarting", function (offlineCtx, a) {
          const offlineContext = new Tone.OfflineContext(offlineCtx);
          Tone.setContext(offlineContext);
          setUpChain.current = a;
        });

        ee.on("audiorenderingfinished", function (type, data) {
          Tone.setContext(toneCtx);
          if (type === "wav") {
            saveAs(data, `${podcast}.wav`);
          }
        });

        ee.on("audiosources_rendering", () => setDialogBox(true));
        ee.on("audiosourcesrendered", () => {
          setDialogBox(false);
        });

        ee.on("tracksUpdated", (e) =>
          dispatch({
            type: SETBUTTONS,
            payload: e,
          })
        );

        ee.on(
          "tracksLeft",
          (tracks) =>
            tracks === 0 &&
            dispatch({
              type: SETBUTTONS,
              payload: true,
            })
        );

        ee.on("audiosourceserror", (e) => alert(e.message));
        ee.on("enableCut", (fact) =>
          dispatch({
            type: SETENABLECUT,
            payload: fact,
          })
        );

        ee.on("enableSplit", (fact) =>
          dispatch({
            type: SETENEABLESPLIT,
            payload: fact,
          })
        );

        playlist.initExporter();
        setEventEmitter(ee);
      }
    },
    [ee, toneCtx]
  );

  useEffect(() => {
    const addedFiles = new Set();
    uploadedFiles.forEach((file) => {
      if (!addedFiles.has(file.name)) {
        const newTrack = {
          file: file,
          name: file.name,
          id: uuidv4(),
        };
        ee.emit("newtrack", newTrack);
        setTracks((prevTracks) => [...prevTracks, newTrack]);
        addedFiles.add(file.name);
        console.log("$$$$$$$$$$$$$$$sendFile : ", sendFile);
      }
    });
  }, [uploadedFiles, ee]);

  function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const newTrack = {
      file: file,
      name: file.name,
      id: uuidv4(),
    };
    ee.emit("newtrack", newTrack);
    setTracks((prevTracks) => [...prevTracks, newTrack]);
    uploadRef.current.value = "";
  }

  function handleClick(event) {
    const { name } = event.target;

    switch (name) {
      case "play":
        return ee.emit("play");
      case "pause":
        return ee.emit("pause");
      case "cursor":
        return ee.emit("statechange", "cursor");
      case "region":
        return ee.emit("statechange", "select");
      case "shift":
        return ee.emit("statechange", "shift");
      case "trim":
        return ee.emit("trim");
      case "cut":
        ee.emit("cut");
        return dispatch({
          type: SETENABLECUT,
          payload: true,
        });
      case "split":
        return ee.emit("split");
      case "fadein":
        return ee.emit("statechange", "fadein");
      case "fadeout":
        return ee.emit("statechange", "fadeout");
      case "zoomin":
        return ee.emit("zoomin");
      case "zoomout":
        return ee.emit("zoomout");
      case "upload":
        return uploadRef.current.click();
      case "download":
        return ee.emit("startaudiorendering", "wav");
      case "downloadTracks":
        return handleDownloadTracks();

      default:
        break;
    }
  }

  const handleDownloadTracks = () => {
    tracks.forEach((track, index) => {
      const { file, name } = track;
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;

          let audioContext;

          try {
            audioContext = new (window.AudioContext || window.AudioContext)();
            console.log("AudioContext successfully initialized.");
          } catch (e) {
            console.error("Web Audio API is not supported in this browser", e);
          }

          const buffer = await audioContext.decodeAudioData(arrayBuffer);
          const offlineContext = new OfflineAudioContext(
            buffer.numberOfChannels,
            buffer.length,
            buffer.sampleRate
          );
          const source = offlineContext.createBufferSource();
          source.buffer = buffer;
          source.connect(offlineContext.destination);
          source.start(0);
          const renderedBuffer = await offlineContext.startRendering();
          const wavBlob = bufferToWave(renderedBuffer);
          saveAs(wavBlob, `${name || "track"}_${index}.wav`);
        } catch (error) {
          console.error("Error decoding audio data:", error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const bufferToWave = (buffer) => {
    let numOfChan = buffer.numberOfChannels,
      length = buffer.length * numOfChan * 2 + 44,
      bufferArray = new ArrayBuffer(length),
      view = new DataView(bufferArray),
      channels = [],
      i,
      sample,
      offset = 0,
      pos = 0;

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"

    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16); // 16-bit (hardcoded in this demo)

    setUint32(0x61746164); // "data" - chunk
    setUint32(length - pos - 4); // chunk length

    for (i = 0; i < buffer.numberOfChannels; i++)
      channels.push(buffer.getChannelData(i));

    while (pos < length) {
      for (i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
        sample = (0.5 + sample * 0.5) * 65535.0; // scale to 16-bit unsigned int
        view.setInt16(pos, sample, true); // write 16-bit sample
        pos += 2;
      }
      offset++; // next source sample
    }

    return new Blob([bufferArray], { type: "audio/wav" });

    function setUint16(data) {
      view.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data) {
      view.setUint32(pos, data, true);
      pos += 4;
    }
  };

  const getAudioFilesFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const audioFilesParam = searchParams.get("audioFiles");
    return audioFilesParam
      ? JSON.parse(decodeURIComponent(audioFilesParam))
      : [];
  };

  const parseURLs = (urls) => {
    return urls.map((url, index) => ({
      file: url,
      name: `example${index + 1}`,
    }));
  };

  useEffect(() => {
    const audioFiles = getAudioFilesFromUrl();
    const parsedURLs = parseURLs(audioFiles);
    setMyMusicArray(parsedURLs);

    parsedURLs.forEach((item) => {
      ee.emit("newtrack", {
        file: item.file,
        name: item.name,
        id: uuidv4(),
      });
    });
  }, []);

  useEffect(() => {
    myMusicArray.map((item) => {
      ee.emit("newtrack", {
        file: item.file,
        name: item.name,
        id: uuidv4(),
      });
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          p: 2,
          backgroundColor,
          color: textColor,
          paddingTop: 10,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box>
          <ModeSwitch />
          <EditorButtons
            handleClick={handleClick}
            cutButton={state.enableCut}
            disabled={state.allbuttons}
            splitButton={state.enableSplit}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <input
              ref={uploadRef}
              type="file"
              accept=".mp3, .wav"
              multiple={false}
              onChange={handleUpload}
              style={{
                display: "none",
              }}
            />
            <Paper
              elevation={16}
              ref={container}
              onDragOver={() => console.log("ure dragging")}
              id={"editor"}
              sx={{
                backgroundColor: "white",
                borderRadius: "4px",
                mb: 8,
                input: {
                  backgroundColor: "transparent",
                },
                "#remove": {
                  borderRadius: "6px",
                  position: "relative",
                  ":after": {
                    position: "absolute",
                    content: `""`,
                    width: "3px",
                    height: "65%",
                    backgroundColor: "white",
                    borderRadius: "1px",
                    left: "45%",
                    translate: "-50%",
                    transform: "rotate(45deg)",
                  },
                  ":before": {
                    position: "absolute",
                    content: `""`,
                    width: "3px",
                    height: "65%",
                    backgroundColor: "white",
                    borderRadius: "1px",
                    left: "45%",
                    translate: "-50%",
                    transform: "rotate(-45deg)",
                  },
                },
                ".annotations": {
                  height: showAnnotations ? 215 : 0,
                  overflow: "hidden",
                  transition: "0.35s",
                  ".current": {
                    transition: "0.65s",
                  },
                  span: {
                    color: dark,
                    fontWeight: "bold",
                  },
                },
              }}
            />
          </Box>
        </Box>
        <CustomAudioBar bottom={!state.allbuttons ? 0 : -100} ee={ee} />
      </Box>
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
        .controls {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Edit;
