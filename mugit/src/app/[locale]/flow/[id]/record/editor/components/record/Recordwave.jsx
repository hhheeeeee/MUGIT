import React from "react";
import {
  recordIcon,
  stopIcon,
  playIcon,
  pauseIcon,
  downloadIcon,
} from "./editor/constants/icons";

export const recordwave = () => {
  return (
    <div>
      <button
        style={{ border: "1px solid black", padding: "10px" }}
        onClick={onClick}
      >
        {playIcon}
      </button>
      <button
        style={{ border: "1px solid black", padding: "10px" }}
        onClick={onClick}
      >
        {downloadIcon}
      </button>
    </div>
  );
};
