"use client";
import React, { useState } from "react";

interface DragnDropEditProps {
  audioFiles: File[];
  setAudioFiles: React.Dispatch<React.SetStateAction<File[]>>;
  onFileUpload: (files: File[]) => void;
}

const DragnDropEdit: React.FC<DragnDropEditProps> = ({
  audioFiles,
  setAudioFiles,
  onFileUpload,
}) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setAudioFiles((prevFiles) => [...prevFiles, ...files]);
    setDragOver(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const files = Array.from(target.files);
      setAudioFiles((prevFiles) => [...prevFiles, ...files]);
    }
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
      <label htmlFor="file-input" className="upload-label">
        Drag and drop files here or click to upload
      </label>
      {audioFiles.length > 0 && (
        <div className="file-list">
          {audioFiles.map((file, index) => (
            <div key={index} className="file-item">
              <span className="file-name">{file.name}</span>
              <button
                className="upload-button"
                onClick={() => onFileUpload([file])}
              >
                Upload to Edit
              </button>
            </div>
          ))}
        </div>
      )}
      <style jsx>{`
        .drop-area {
          height: 128px;
          border: 2px dashed #d1d5da;
          border-radius: 6px;
          background-color: #f6f8fa;
          margin: 2em 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 16px;
          color: #586069;
          cursor: pointer;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .drag-over {
          background-color: #e1e4e8;
          border-color: #0366d6;
        }
        .upload-label {
          cursor: pointer;
          padding: 20px;
          color: #0366d6;
          font-weight: 600;
        }
        .file-list {
          margin-top: 10px;
          border-top: 1px solid #e1e4e8;
          padding-top: 10px;
        }
        .file-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #fff;
          border: 1px solid #e1e4e8;
          border-radius: 6px;
          padding: 10px;
          margin: 5px 0;
          transition: background-color 0.3s;
        }
        .file-item:hover {
          background-color: #f6f8fa;
        }
        .file-name {
          font-size: 14px;
          color: #24292e;
        }
        .upload-button {
          background-color: #28a745;
          border: none;
          color: #fff;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
        }
        .upload-button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default DragnDropEdit;
