import logoimg from "./logo.png";
import Image from "next/image";
export const Logo = () => {
  return (
    <div>
      <Image src={logoimg} width={30} height={30} alt="logo" />
    </div>
  );
};

export default Logo;
