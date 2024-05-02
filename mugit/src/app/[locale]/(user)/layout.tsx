import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isLogined = cookieStore.get("isLogined");
  console.log("isLogined", isLogined);

  // if (isLogined === "undefined") {
  //   redirect(`/note`);
  // }
  return <>{children}</>;
}
