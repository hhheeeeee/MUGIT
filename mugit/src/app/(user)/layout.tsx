import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const name = cookieStore.get("name");
  console.log("name", name);

  if (!name) {
    redirect(`/`);
  }
  return <>{children}</>;
}
