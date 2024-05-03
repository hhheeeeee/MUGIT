import { atomWithStorage } from "jotai/utils";

export const userAtom = atomWithStorage("user", {
  isLogined: "false",
  nickName: "",
  profileImage: "DEFAULT_IMAGE_URL",
  profileText: "",
  followers: "",
  followings: "",
});
