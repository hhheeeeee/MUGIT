import FlowInfo from "@/app/container/flow/flowinfo";
import Review from "@/app/container/review/review";
import { Suspense } from "react";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  cookieStore.getAll().map((cookie) => console.log("=======", cookie));
  return (
    <div>
      <Suspense
        fallback={
          <div className="mx-auto h-80 w-2/3 bg-red-800">
            Loading...FlowInfo
          </div>
        }
      >
        <FlowInfo page="detail" />
      </Suspense>
      <Suspense
        fallback={
          <div className="mx-auto h-80 w-2/3 bg-red-800">Loading Review...</div>
        }
      >
        <Review />
      </Suspense>
    </div>
  );
}
