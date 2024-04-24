import Image from "next/image";

const tempUserInfo = {
  profileImage: "/150.jpg",
};

export default function CreateReview() {
  return (
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
          className="mr-2 w-full rounded-full border-2 border-slate-300 pl-5"
        />
        <button>
          <Image src="/send.svg" alt="" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}
