"use client";

import { apiUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { SessionID } from "@/app/store/atoms/user";
import { userAtom } from "@/app/store/atoms/user";
import fireToast from "@/app/utils/fireToast";
import { userInitialValue } from "@/app/store/atoms/user";
import { useRouter } from "next/navigation";

type MockLoginResponseType = {
  sessionId: string;
  userId: number;
  nickName: string;
  profileText: string;
  profileImagePath: string;
  followers: number;
  followings: number;
};

export default function Page() {
  const router = useRouter();
  const locale = useLocale();
  const [pk, setPk] = useState<string>("");
  const [sessionId, setSessionID] = useAtom(SessionID);
  const setUser = useSetAtom(userAtom);

  // functions
  const connectHandler = function (e: any) {
    console.log("connect : 연결됨", e);
  };
  const errorHandler = function (e: any) {
    console.log("에러", e);
  };
  const openHandler = function (e: any) {
    console.log("open : 연결", e);
  };
  const followHandler = function (e: any) {
    console.log(JSON.parse(e.data).message);
    const data = JSON.parse(e.data);
    fireToast({
      type: "정보",
      title: data.message.type,
      text: data.message.description,
    });
  };

  const onSubmit = async (): Promise<void> => {
    const response = await fetch(apiUrl + `/users/mocks/login?pk=${pk}`);
    response.json().then((data: MockLoginResponseType) => {
      setSessionID(data.sessionId);
      setUser({
        id: String(data.userId),
        isLogined: "true",
        nickName: data.nickName,
        profileImagePath: data.profileImagePath,
        profileText: data.profileText,
        followerCount: String(data.followers),
        followingCount: String(data.followings),
      });
      const SSE_CONNECT_API_PATH = "/sse/subscribe";

      const eventSource = new EventSource(
        "https://mugit.site" + SSE_CONNECT_API_PATH,
        {
          withCredentials: true,
        }
      );

      eventSource.addEventListener("connect", connectHandler);
      eventSource.addEventListener("error", errorHandler);
      eventSource.addEventListener("open", openHandler);
      eventSource.addEventListener("follow", followHandler);
    });
  };

  const logout = () => {
    fetch("https://mugit.site/sse/complete", {
      credentials: "include",
    });
    setUser(userInitialValue);
    localStorage.clear();
    router.refresh();
    fetch(apiUrl + "/users/logout").then((response) => {
      switch (response.status) {
        case 200: {
          fireToast({
            type: "성공",
            title: "로그아웃이 되었습니다",
          });
          break;
        }
      }
    });
  };

  return (
    <div className="m-auto h-60 w-60">
      <input
        type="text"
        className="border-2 border-black"
        onChange={(event) => setPk(event.target.value)}
      />
      <button onClick={onSubmit}>/users/mocks/login?pk= 로 요청임</button>
      <hr />
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
