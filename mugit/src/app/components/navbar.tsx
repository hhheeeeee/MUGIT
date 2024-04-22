"use client";

import Link from "next/link";
// import Image from "next/image";
import Logo from "../assets/logo";
import { usePathname } from "next/navigation";
import { navbaritems } from "../constants/navbaritems";
import { theme } from "../styles/theme";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex h-[10%] w-full flex-wrap items-center justify-between bg-pointblack p-5">
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
      <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
        <div className="text-sm lg:flex-grow">
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
                {item.name}
              </Link>
            );
          })}
        </div>
        <div>
          <Link
            href="#"
            className="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-teal-500 lg:mt-0"
          >
            Download
          </Link>
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
