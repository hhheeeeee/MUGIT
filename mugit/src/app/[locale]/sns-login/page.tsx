"use client";

import { useEffect } from "react";
import { apiUrl, blocalUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";

export default function Page() {
  const locale = useLocale();
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
            alert("로그인 완료");
            window.history.go(-1);
            break;
          }
          case 302: {
            alert("회원가입 페이지로 이동");
            location.href = `/${locale}/register`;
            break;
          }
        }
      })
      .catch((error) => console.log(error));
  });
  return <div>로그인 중... 로딩중 화면 넣기</div>;
}
