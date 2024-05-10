import React, { useState } from "react";
import fireToast from "@/app/utils/fireToast";

interface DragDropProps {
  onChangeFile: (file: File | null) => void;
  description?: string;
  validExtensions?: string[]; // 확장자 정보를 받아온다.
}

const DragnDrop: React.FC<DragDropProps> = ({
  onChangeFile,
  description,
  validExtensions,
}) => {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    console.log(file);
    if (file && validExtensions && validExtensions.includes(file.type)) {
      onChangeFile(file);
    } else {
      // fireToast("Please drop a valid file.");
    }
  };

  return (
    <div
      className={`dropzone ${dragging ? "dragging" : ""}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>{description || "Drag & Drop File Here"}</p>
      <style jsx>{`
        .dropzone {
          width: 100%;
          height: 200px;
          border: 2px dashed #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .dragging {
          background-color: #f0f0f0;
        }

        p {
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default DragnDrop;
