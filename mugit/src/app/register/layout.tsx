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
      /> */}
      {children}
    </body>
  );
}
