import Image from "next/image";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <body>
      {/* <Image
        src="/register2.webp"
        alt="register image"
        fill
        className="z-[-100]"
      />
      <div className="h-[90%] w-full bg-black opacity-30"></div> */}
      {children}
    </body>
  );
}
