"use client";
import React, { useState } from "react";

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file.type);
    if (file) {
      if (file.type === "audio/mp3") {
        setSelectedFile(file);
      } else {
        alert("Please upload an MP3 file.");
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type === "audio/mp3") {
        setSelectedFile(file);
      } else {
        alert("Please drop an MP3 file.");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSelectFile = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div
      style={{ width: "100%", height: "200px", border: "2px dashed #ccc" }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        id="fileInput"
        type="file"
        accept="audio/mp3"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button onClick={handleSelectFile}>Select File</button>
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
    </div>
  );
};

export default FileUpload;
