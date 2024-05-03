"use client";

import { useEffect } from "react";
import { apiUrl, blocalUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";
import { useSetAtom } from "jotai";
import { userAtom } from "@/app/store/atoms/user";
import Cookies from "js-cookie";

export default function Page() {
  const locale = useLocale();
  const setUser = useSetAtom(userAtom);
  useEffect(() => {
    const accessToken = window.location.hash.split("=")[1].split("&")[0];
    fetch(apiUrl + "/users/login", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        switch (response.status) {
          case 200: {
            setUser({
              isLogined: String(Cookies.get("isLogined")),
              nickName: String(Cookies.get("nickName")),
              profileImage: String(Cookies.get("profileImage")),
              profileText: String(Cookies.get("profileText")),
              followers: String(Cookies.get("followers")),
              followings: String(Cookies.get("followings")),
            });
            window.history.go(-1);
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
