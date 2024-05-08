"use client";

import { apiUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function Page() {
  const locale = useLocale();
  const [pk, setPk] = useState("");
  const onSubmit = async () => {
    const response = await fetch(apiUrl + `/users/mocks/login?pk=${pk}`);
    console.log(response);
    // location.href = `/${locale}`;
  };
  return (
    <div className="m-auto h-60 w-60">
      <input
        type="text"
        className="border-2 border-black"
        onChange={(event) => setPk(event.target.value)}
      />
      <button onClick={onSubmit}>submit</button>
    </div>
  );
}
