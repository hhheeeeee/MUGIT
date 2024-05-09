"use client";

import fireToast from "../utils/fireToast";

export default function Notification() {
  const SSE_CONNECT_API_PATH = "/sse/subscribe";

  // functions
  const connectHandler = function (e) {
    // console.log("connect : 연결됨", e);
    // console.log(e.data);
  };
  const errorHandler = function (e) {
    // console.log("에러", e);
  };
  const openHandler = function (e) {
    // console.log(e);
    // console.log("open : 연결");
  };
  const followHandler = function (e) {
    console.log(e.data.event);
    console.log(e.data.description);
    fireToast({
      type: "정보",
      title: "follow",
      text: e.data.message.description,
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

  return (
    <button className="p h-8 w-8 rounded-full pl-[3px]">
      <svg viewBox="0 0 24 24" fill="lightgrey" height="1.3em" width="1.3em">
        <path d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 012-2 2 2 0 012 2v.29c2.97.88 5 3.61 5 6.71v6l2 2m-7 2a2 2 0 01-2 2 2 2 0 01-2-2" />
      </svg>
    </button>
  );
}
