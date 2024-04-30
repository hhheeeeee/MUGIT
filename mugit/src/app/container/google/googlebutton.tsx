import Image from "next/image";
import { flocalUrl, mugitUrl, apiUrl, blocalUrl } from "@/app/store/atoms";

export default function GoogleButton() {
  return (
    <a
      className="pr-4 lg:mt-0"
      href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${flocalUrl}/sns-login&response_type=token&scope=email profile`}
    >
      <Image
        src="/google/web_dark_sq_ctn@4x.png"
        alt=""
        width={150}
        height={0}
      />
    </a>
    // <button className="pr-4 lg:mt-0" onClick={onClick}>
    //   <Image
    //     src="/google/web_dark_sq_ctn@4x.png"
    //     alt=""
    //     width={150}
    //     height={0}
    //   />
    // </button>
  );
}
