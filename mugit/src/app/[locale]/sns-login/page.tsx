"use client";

import { useEffect } from "react";
import { apiUrl, blocalUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";
import { useSetAtom, useAtomValue } from "jotai";
import { userAtom } from "@/app/store/atoms/user";
import Cookies from "js-cookie";
import { prevpathAtom } from "@/app/store/atoms/user";
import fireToast from "@/app/utils/fireToast";

export default function Page() {
  const locale = useLocale();
  const setUser = useSetAtom(userAtom);
  const prevpath = useAtomValue(prevpathAtom);

  useEffect(() => {
    const accessToken = window.location.hash.split("=")[1].split("&")[0];
    fetch(apiUrl + "/users/login", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    })
      .then((response) => {
        switch (response.status) {
          case 200: {
            setUser({
              id: String(Cookies.get("userId")),
              isLogined: String(Cookies.get("isLogined")),
              nickName: String(Cookies.get("nickName")),
              profileImagePath: String(Cookies.get("profileImagePath")),
              profileText: String(Cookies.get("profileText")),
              followerCount: String(Cookies.get("followers")),
              followingCount: String(Cookies.get("followings")),
            });

            const SSE_CONNECT_API_PATH = "/sse/subscribe";

            // functions
            const connectHandler = function (e: any) {
              // console.log("connect : 연결됨", e);
              // console.log(e.data);
            };
            const errorHandler = function (e: any) {
              // console.log("에러", e);
            };
            const openHandler = function (e: any) {
              // console.log(e);
              // console.log("open : 연결");
            };
            const followHandler = function (e: any) {
              console.log(e.data.event);
              console.log(e.data.description);
              fireToast({
                type: "정보",
                title: "follow",
                text: e.data?.message?.description,
              });
            };

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

            if (prevpath) {
              location.href = prevpath;
            }
            break;
          }
          case 302: {
            location.href = `/${locale}/register`;
            break;
          }
        }
      })
      .catch((error) => console.log(error));
  });
  return <div>로그인 중... 로딩중 화면 넣기</div>;
}
