"use client";

import { useEffect } from "react";
import { apiUrl, blocalUrl } from "../store/atoms";
// import { cookies } from "next/headers";
// import cookie from "cookie";

export default function Page() {
  // var cookie = require("cookie");
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
            location.href = "/";
            break;
          }
          case 302: {
            alert("회원가입 페이지로 이동");
            // let setCookie = response.headers.get("Set-Cookie");

            // console.log("set-cookie", setCookie);
            // console.log(response);

            // if (setCookie) {
            //   const parsed = cookie.parse(setCookie);

            //   cookies().set("connect.sid", parsed["connect.sid"], parsed); // 브라우저에 쿠키를 심어주는 것
            // }
            location.href = "/register";
            break;
          }
        }
      })
      .catch((error) => console.log(error));
  });
  return <div>ㅔㅔㅔ</div>;
}
