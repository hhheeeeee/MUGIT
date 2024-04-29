import Image from "next/image";

export default function GoogleButton() {
  console.log(process.env.GOOGLE_CLIENT_ID);
  return (
    <button className="pr-4 lg:mt-0">
      <Image
        src="/google/web_dark_sq_ctn@4x.png"
        alt=""
        width={150}
        height={0}
      />
    </button>
  );
}
