"use client";

import { Link } from "@/navigation";
import { usePathname } from "@/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import Logo from "../assets/logo";
import { navbaritems } from "../constants/navbaritems";
import GoogleButton from "../container/google/googlebutton";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <nav className="flex h-[10%] w-full items-center justify-between bg-pointblack p-5">
      <Link
        href="/"
        className="mr-6 flex flex-shrink-0 items-center text-white"
      >
        <Logo />
        <span className="ml-2 text-2xl font-semibold tracking-tight">
          MUGIT
        </span>
      </Link>
      {/* <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div> */}
      <div className="flex w-full flex-grow items-center">
        <div className="flex-grow text-sm">
          {navbaritems.map((item) => {
            let activefonts;
            if (pathname.includes(item.to)) {
              activefonts = "text-white font-bold";
            } else {
              activefonts = "text-gray-500";
            }
            return (
              <Link
                key={item.id}
                href={item.to}
                className={`mr-4 mt-4 block hover:text-white lg:mt-0 lg:inline-block ${activefonts}`}
              >
                {t(item.name)}
              </Link>
            );
          })}
        </div>
        <div className="mx-3">
          {locale === "en" ? (
            <Link locale="ko" href={pathname} className="text-2xl text-white">
              <Image
                width={50}
                height={50}
                alt="English"
                className="h-8 w-8"
                priority
                src="/en.png"
              />
            </Link>
          ) : (
            <Link locale="en" href={pathname} className="text-2xl text-white">
              <Image
                width={50}
                height={50}
                alt="Korea"
                className="h-8 w-8"
                priority
                src="/ko.png"
              />
            </Link>
          )}
        </div>
        <div className="mt-1">
          <GoogleButton />
        </div>

        {/* <Image
          src={person}
          className="w- rounded-full"
          alt="Avatar"
          width={40}
          style={{ objectFit: "cover" }}
        /> */}
      </div>
    </nav>
  );
};

export default Navbar;
