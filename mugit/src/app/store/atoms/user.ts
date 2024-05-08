import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", {
  isLogined: "false",
  nickName: "",
  profileImagePath:
    "https://mugit.site/files/008494eb-b272-4c83-919b-677378107fd2.jpg",
  profileText: "",
  followersCount: "",
  followingsCount: "",
});

export const prevpathAtom = atomWithStorage("prevpath", "");
