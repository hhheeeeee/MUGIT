import FlowInfo from "@/app/container/flow/flowinfo";
import Review from "@/app/container/review/review";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  cookieStore.getAll().map((cookie) => console.log("=======", cookie));
  return (
    <div>
      <FlowInfo page="detail" />
      <Review />
    </div>
  );
}
