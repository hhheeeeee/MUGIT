"use client";

import { apiUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useAtom } from "jotai";
import { useSetAtom } from "jotai";
import { SessionID } from "@/app/store/atoms/user";
import { userAtom } from "@/app/store/atoms/user";

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
  const locale = useLocale();
  const [pk, setPk] = useState<string>("");
  const [sessionId, setSessionID] = useAtom(SessionID);
  const setUser = useSetAtom(userAtom);

  const onSubmit = async (): Promise<void> => {
    const response = await fetch(apiUrl + `/users/mocks/login?pk=${pk}`);
    response.json().then((data: MockLoginResponseType) => {
      setSessionID({
        sessionId: data.sessionId,
      });
      setUser({
        id: String(data.userId),
        isLogined: "true",
        nickName: data.nickName,
        profileImagePath: data.profileImagePath,
        profileText: data.profileText,
        followerCount: String(data.followers),
        followingCount: String(data.followings),
      });
    });
  };

  const handleClick = async () => {
    const response = await fetch(apiUrl + `/users/mocks/login?pk=${pk}`, {
      method: "GET",
      headers: {
        Authorization: sessionId.sessionId,
      },
      credentials: "include",
    });

    console.log(sessionId.sessionId);
  };

  return (
    <div className="m-auto h-60 w-60">
      <input
        type="text"
        className="border-2 border-black"
        onChange={(event) => setPk(event.target.value)}
      />
      <button onClick={onSubmit}>/users/mocks/login?pk= 로 요청임</button>

      <br />
      <button onClick={handleClick}>sessionID 넣어서 요청해보기</button>
    </div>
  );
}
