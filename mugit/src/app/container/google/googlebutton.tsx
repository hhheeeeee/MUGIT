import Image from "next/image";
import { flocalUrl, mugitUrl } from "@/app/store/atoms";
import { useLocale } from "next-intl";

export default function GoogleButton() {
  const locale = useLocale();
  return (
    <a
      className="pr-4 lg:mt-0"
      // 로컬에서 로그인
      // href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${flocalUrl}/${locale}/sns-login&response_type=token&scope=email profile`}
      // 서버에서 로그인
      href={`https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${mugitUrl}/${locale}/sns-login&response_type=token&scope=email profile`}
    >
      <Image
        src="/google/web_dark_sq_ctn@4x.png"
        alt=""
        width={150}
        height={0}
      />
    </a>
  );
}
