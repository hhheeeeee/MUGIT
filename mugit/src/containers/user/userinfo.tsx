import Image from "next/image";

export default function UserInfo() {
  return (
    <div className="bg-[#f1f609] w-screen flex justify-between">
      <Image width={150} height={150} alt="" src="/150.jpg" />
      <div>
        <h1>User nickname</h1>
        <h2>User profiletext</h2>
        <div className="flex">
          <div>
            <p>Followers</p>
            <p>10</p>
          </div>
          <div>
            <p>Followings</p>
            <p>20</p>
          </div>
        </div>
      </div>
    </div>
  );
}
