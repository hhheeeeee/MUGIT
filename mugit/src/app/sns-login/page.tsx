"use client";

import { useEffect } from "react";
import { apiUrl, flocalUrl, blocalUrl } from "../store/atoms";

export default function Page() {
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
            location.href = "/";
            break;
          }
          case 302: {
            location.href = "/register";
            break;
          }
        }
      })
      .catch((error) => console.log(error));
  });
  return <div>ppp</div>;
}
