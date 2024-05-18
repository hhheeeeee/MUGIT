import { atom } from "jotai";

// 편집기로 보낼 파일
// export const fileInitialValue = [
//   {
//     file: "/note.mp3",
//     name: "example1",
//   },
//   {
//     file: "/note.mp3",
//     name: "example2",
//   },
// ];

// export const fileInitialValue2 = {
//   preSources: [
//     {
//       file: "/note.mp3",
//       name: "소스1",
//       url: "/",
//     },
//     {
//       file: "/note.mp3",
//       name: "소스2",
//       url: "/",
//     },
//     {
//       file: "/note.mp3",
//       name: "소스3",
//       url: "/",
//     },
//   ],
//   newSources: [
//     {
//       file: "/note.mp3",
//       name: "소스4",
//       url: "/",
//     },
//     {
//       file: "/note.mp3",
//       name: "소스5",
//       url: "/",
//     },
//     {
//       file: "/note.mp3",
//       name: "소스6",
//       url: "/",
//     },
//   ],
// };
interface AudioFile {
  file: File;
  name: string;
  url: string;
}

export const fileInitialValue2: {
  preSources: AudioFile[];
  newSources: AudioFile[];
} = {
  preSources: [
    {
      file: new File([], "소스1.mp3"),
      name: "소스1",
      url: URL.createObjectURL(new File([], "소스1.mp3")),
    },
    {
      file: new File([], "소스2.mp3"),
      name: "소스2",
      url: URL.createObjectURL(new File([], "소스2.mp3")),
    },
    {
      file: new File([], "소스3.mp3"),
      name: "소스3",
      url: URL.createObjectURL(new File([], "소스3.mp3")),
    },
  ],
  newSources: [
    {
      file: new File([], "소스4.mp3"),
      name: "소스4",
      url: URL.createObjectURL(new File([], "소스4.mp3")),
    },
    {
      file: new File([], "소스5.mp3"),
      name: "소스5",
      url: URL.createObjectURL(new File([], "소스5.mp3")),
    },
    {
      file: new File([], "소스6.mp3"),
      name: "소스6",
      url: URL.createObjectURL(new File([], "소스6.mp3")),
    },
  ],
};

export const fileToEdit = atom(fileInitialValue2);

// 최종적으로 릴리즈할 플로우

// export const flowInitialValue = [
//   {
//     flow: "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//     source: [
//       "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//       "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//       "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//       "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//     ],
//   },
// ];

// export const flowInitialValue2 = [
//   {
//     flow: "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//     source: [
//       {
//         file: "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//         name: "good life",
//         url: "/",
//       },
//       {
//         file: "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//         name: "good life",
//         url: "/",
//       },
//       {
//         file: "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//         name: "good life",
//         url: "/",
//       },
//       {
//         file: "https://mugit.site/files/36e523db-e317-4c32-80fa-aaed0cbb4658.mp3",
//         name: "good life",
//         url: "/",
//       },
//     ],
//   },
// ];

export const flowInitialValue2 = {
  flow: "말도안되는플로우",
  source: [
    {
      file: new File([], "어디.mp3"),
      name: "good life",
      url: URL.createObjectURL(new File([], "good life.mp3")),
    },
    {
      file: new File([], "보자.mp3"),
      name: "good life",
      url: URL.createObjectURL(new File([], "good life.mp3")),
    },
    {
      file: new File([], "되나.mp3"),
      name: "good life",
      url: URL.createObjectURL(new File([], "good life.mp3")),
    },
    {
      file: new File([], "안되나.mp3"),
      name: "good life",
      url: URL.createObjectURL(new File([], "good life.mp3")),
    },
  ],
};

// 형식 또는 샘플 값으로 initialValue 지정
export const flowInitialValue3 = {
  flow: "",
  source: [] as AudioFile[],
};

export const flowInitialValue4 = {
  flow: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  source: [
    {
      file: null,
      name: "SoundHelix Song 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      file: null,
      name: "SoundHelix Song 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      file: null,
      name: "SoundHelix Song 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
      file: null,
      name: "SoundHelix Song 1",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
  ],
};

export const fileToRelease = atom(flowInitialValue3);
