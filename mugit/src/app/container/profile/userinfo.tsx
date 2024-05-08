"use client";

import Image from "next/image";
import { useState, Fragment, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconCamera from "@/app/assets/icon/IconCamera";
import { apiUrl } from "@/app/store/atoms";
import { useTranslations } from "next-intl";
import { useAtom } from "jotai";
import { userAtom } from "@/app/store/atoms/user";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";

const fetchUser = async (id: string | string[]) => {
  const response = await fetch(apiUrl + `/users/${id}/profiles/detail`);
  return response.json();
};

export default function UserInfo() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations("Profile");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [userInfo, setUserInfo] = useState({
    isMyProfile: "false",
    nickName: "",
    profileImagePath:
      "https://mugit.site/files/008494eb-b272-4c83-919b-677378107fd2.jpg",
    profileText: "",
    followersCount: "",
    followingsCount: "",
  });
  useEffect(() => {
    fetchUser(params.id).then((data) => {
      setUserInfo(data);
    });
  }, []);

  function clickModal() {
    setIsOpen(!isOpen);
    setNewImage(userInfo.profileImagePath);
  }

  const [newFile, setNewFile] = useState<any>(null);
  const [newImage, setNewImage] = useState(userInfo.profileImagePath);
  const [newNickName, setNewNickName] = useState(userInfo.nickName);
  const [newProfileText, setNewProfileText] = useState(userInfo.profileText);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    setNewFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        const file = reader.result as string;
        setNewImage(file); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  async function onClick() {
    let formdata = new FormData();
    formdata.append("profileImage", newFile);
    const response = await fetch("https://mugit.site/files", {
      method: "post",
      body: JSON.stringify({
        image: formdata,
      }),
    }).then((response) => {
      return response.json();
    });
    console.log(response);
    if (response.list) {
      fetch(apiUrl + "/users/profiles", {
        method: "patch",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickName: newNickName,
          profileText: newProfileText,
          profileImagePath: response.list[0].path,
        }),
      }).then((response) => {
        setUser({
          isLogined: String(Cookies.get("isLogined")),
          nickName: String(Cookies.get("nickName")),
          profileImagePath: String(Cookies.get("profileImage")),
          profileText: String(Cookies.get("profileText")),
          followersCount: String(Cookies.get("followers")),
          followingsCount: String(Cookies.get("followings")),
        });
        router.refresh();
      });
    }
  }
  return (
    <div className="flex h-80 flex-wrap content-center justify-center bg-[#f1f609]">
      <div className="flex w-2/3 justify-evenly">
        <Image
          width={150}
          height={150}
          alt="profile image"
          src={userInfo.profileImagePath}
          className="h-48 w-48 rounded-full"
          priority
        />
        <div className="">
          <p className="pb-3 text-4xl">{userInfo.nickName}</p>
          <p className="pb-3 text-xl">{userInfo.profileText}</p>
          <div className="flex divide-x-2 divide-solid divide-black pb-3">
            <div className="pr-5">
              <p>{t("followers")}</p>
              <p className="text-2xl">{userInfo.followersCount}</p>
            </div>
            <div className="pl-5">
              <p>{t("followings")}</p>
              <p className="text-2xl">{userInfo.followingsCount}</p>
            </div>
          </div>
          <div>
            <button className="mr-3 rounded border-2 border-black px-2 py-1">
              {t("follow")}
            </button>
            <button
              className="rounded border-2 border-black px-2 py-1"
              onClick={clickModal}
            >
              {t("edit")}
            </button>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={clickModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[40rem] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-4xl font-bold italic leading-6">
                    Edit Profile
                  </Dialog.Title>
                  <div className="mt-10 flex justify-around">
                    <div>
                      <Image
                        width={150}
                        height={150}
                        alt="profile image"
                        src={newImage}
                        className="h-48 w-48 rounded-full"
                        priority
                      />
                      <label
                        htmlFor="uploadimg"
                        className="mt-2 flex h-8 items-center justify-center gap-2 rounded-md bg-gray-300 text-sm hover:bg-[#c8cace] hover:shadow"
                      >
                        <IconCamera />
                        Upload Image
                      </label>
                      <input
                        id="uploadimg"
                        className="hidden"
                        accept="image/*"
                        type="file"
                        onChange={(event) => onUpload(event)}
                      />
                    </div>
                    <div>
                      <p className="mb-3">Nickname</p>
                      <input
                        type="text"
                        className="mb-3 w-48 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none"
                        defaultValue={userInfo.nickName}
                        onChange={(event) => setNewNickName(event.target.value)}
                      />
                      <p className="pb-3">Description</p>
                      <textarea
                        className="h-32 rounded border-2 border-solid border-slate-500 p-1 text-lg focus:outline-none"
                        defaultValue={userInfo.profileText}
                        onChange={(event) =>
                          setNewProfileText(event.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-10 text-center">
                    <button
                      className="mx-3 rounded border-2 border-slate-500 px-2 py-1"
                      onClick={clickModal}
                    >
                      {t("cancel")}
                    </button>
                    <button
                      className="rounded border-2 border-pointblue bg-pointblue px-2 py-1 text-white"
                      onClick={onClick}
                    >
                      {t("save")}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
