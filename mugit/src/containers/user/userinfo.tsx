import Image from "next/image";

export default function UserInfo() {
  return (
    <div className="bg-[#f1f609] h-80 flex flex-wrap justify-center content-center">
      <div className="w-2/3 flex justify-evenly">
        <Image
          width={150}
          height={150}
          alt="profile image"
          src="/150.jpg"
          className="rounded-full w-48 h-48"
        />
        <div className="">
          <p className="text-4xl pb-3">User nickname</p>
          <p className="text-xl pb-3">User profiletext</p>
          <div className="flex divide-x-2 divide-black pb-3">
            <div className="pr-5">
              <p>Followers</p>
              <p className="text-2xl">10</p>
            </div>
            <div className="pl-5">
              <p>Followings</p>
              <p className="text-2xl">20</p>
            </div>
          </div>
          <button className="border-2 border-black rounded py-1 px-2">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
