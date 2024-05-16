import { atom } from "jotai";

// 편집할 파일

export const fileInitialValue = [
  {
    file: "/note.mp3",
    name: "example1",
  },
  {
    file: "/note.mp3",
    name: "example2",
  },
];

export const fileToEdit = atom(fileInitialValue);
