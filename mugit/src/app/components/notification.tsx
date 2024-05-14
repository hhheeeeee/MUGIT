"use client";

import { Popover } from "@headlessui/react";
import fireToast from "../utils/fireToast";
import { apiUrl } from "../store/atoms";
import { useState } from "react";
import { useTranslations } from "next-intl";

export default function Notification() {
  const t = useTranslations("Notification");

  const [notifications, setNotifications] = useState([
    {
      id: 0,
      notifiedId: 0,
      notifierId: 0,
      causeEntityId: 0,
      type: t("noContent"),
      description: "",
    },
  ]);

  const getNotifications = () => {
    fetch(apiUrl + "/users/notifications", {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.list) {
          setNotifications(data.list);
        } else {
          setNotifications([
            {
              id: 0,
              notifiedId: 0,
              notifierId: 0,
              causeEntityId: 0,
              type: t("noContent"),
              description: "",
            },
          ]);
        }
      });
  };

  const markRead = (id: number) => {
    fetch(apiUrl + `/users/notifications/${id}`, {
      method: "PATCH",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        getNotifications();
      }
    });
  };

  const readAll = () => {
    fetch(apiUrl + `/users/notifications`, {
      method: "PATCH",
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        getNotifications();
      }
    });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            onClick={open ? () => "" : getNotifications}
            className="h-8 w-8 rounded-full pl-[5.5px]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="lightgrey"
              height="1.3em"
              width="1.3em"
            >
              <path d="M21 19v1H3v-1l2-2v-6c0-3.1 2.03-5.83 5-6.71V4a2 2 0 012-2 2 2 0 012 2v.29c2.97.88 5 3.61 5 6.71v6l2 2m-7 2a2 2 0 01-2 2 2 2 0 01-2-2" />
            </svg>
          </Popover.Button>
          <Popover.Panel className="absolute right-0 top-[100%] z-10">
            <div className="h-60 w-60 overflow-auto rounded-lg bg-white p-3">
              <div className="flex justify-between border-b-2 border-solid border-slate-500 text-xl">
                <h1 className="font-bold">{t("notice")}</h1>
                <p
                  className="text-sm hover:cursor-pointer hover:font-semibold hover:text-pointblue"
                  onClick={readAll}
                >
                  {t("readall")}
                </p>
              </div>
              {notifications.map((noti) => (
                <div
                  key={noti.id}
                  className="border-b-2 border-solid border-slate-500 py-0.5"
                >
                  <div className="flex justify-between">
                    <p className="text-base font-medium">{noti.type}</p>
                    {noti.id ? (
                      <p
                        className="text-sm hover:cursor-pointer hover:font-semibold hover:text-pointblue"
                        onClick={() => {
                          markRead(noti.id);
                        }}
                      >
                        {t("read")}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <p className="text-sm">{noti.description}</p>
                </div>
              ))}
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
