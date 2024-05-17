import { atom } from "jotai";

// 편집기로 보낼 파일
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

export const flowInitialValue = [
  {
    flow: "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
    source: [
      "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
      "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
      "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
      "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
    ],
  },
];
// 최종적으로 릴리즈할 플로우
export const fileToRelease = atom(flowInitialValue);
