"use client";

import Image from "next/image";
import { useState } from "react";

const tempUserInfo = {
  profileImage: "/150.jpg",
};

const tempReviewInfo = [
  {
    id: 1,
    user: "Jasmine",
    content: "히히하하호호",
    time: "0:00",
    profileImage: "/150.jpg",
  },
  {
    id: 2,
    user: "Eminem",
    content: "mom's spaghetti",
    time: "1:25",
    profileImage: "/150.jpg",
  },
  {
    id: 3,
    user: "김범석",
    content: "내 기분은 마치 만루홈런",
    time: "0:47",
    profileImage: "/150.jpg",
  },
  {
    id: 4,
    user: "ssafy",
    content: "smasnug sotfware acadmey for youth",
    time: "2:50",
    profileImage: "/150.jpg",
  },
];

export default function ReviewList() {
  const [content, setContent] = useState("");
  return (
    <div>
      <div className="my-5 flex justify-evenly">
        <Image
          src={tempUserInfo.profileImage}
          alt="profile image"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div className="flex w-5/6">
          <input
            type="text"
            placeholder="Write a comment"
            className="mr-2 w-full rounded-full border-4 border-gray-200 pl-5 focus:outline-none"
            defaultValue={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      {tempReviewInfo.map((review) => (
        <div key={review.id} className="my-5 flex justify-evenly">
          <Image
            src={review.profileImage}
            alt="profile image"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="relative w-5/6">
            <span className="mr-3 font-semibold">{review.user}</span>
            <a href="#" className="text-pointblue">
              {review.time}
            </a>
            <p className="absolute top-1/2">{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
