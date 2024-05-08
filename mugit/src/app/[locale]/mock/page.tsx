"use client";
import { useEffect, useState } from "react";
import { apiUrl, blocalUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";
import Cookies from "js-cookie";
import { userAtom } from "@/app/store/atoms/user";
import { useSetAtom } from "jotai";

export default function Page() {
  const setUser = useSetAtom(userAtom);

  async function login() {
    // const url = "https://mugit.site/api/users/mocks/login?pk=" + id;

    const response = await fetch("/login");

    console.log(response.json());
    setUser({
      id: String(Cookies.get("userID")),
      isLogined: String(Cookies.get("isLogined")),
      nickName: String(Cookies.get("nickName")),
      profileImagePath: String(Cookies.get("profileImage")),
      profileText: String(Cookies.get("profileText")),
      followerCount: String(Cookies.get("followers")),
      followingCount: String(Cookies.get("followings")),
    });
  }

  return (
    <div>
      {/* <input
        type="text"
        className="border-2 border-solid"
        value={id}
        onChange={setID}
      /> */}
      <button onClick={login}>제출</button>
    </div>
  );
}
