"use client";
import React, { useState } from "react";

const DragnDropEdit = ({ audioFiles, setAudioFiles, onFileUpload }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setAudioFiles((prevFiles) => [...prevFiles, ...files]);
    setDragOver(false);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setAudioFiles((prevFiles) => [...prevFiles, ...files]);
  };

  return (
    <div
      className={`drop-area ${dragOver ? "drag-over" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="file-input"
      />
      <label htmlFor="file-input">
        Drag and drop files here or click to upload
      </label>
      {audioFiles.length > 0 && (
        <div className="file-list">
          {audioFiles.map((file, index) => (
            <div key={index} className="file-item">
              {file.name}
              <button onClick={() => onFileUpload([file])}>
                Upload to Edit
              </button>
            </div>
          ))}
        </div>
      )}
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
        .drag-over {
          border-color: #333;
        }
        .file-list {
          margin-top: 10px;
        }
        .file-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default DragnDropEdit;
