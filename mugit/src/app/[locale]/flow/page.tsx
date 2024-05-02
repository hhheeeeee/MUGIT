import FlowInfo from "@/app/container/flow/flowinfo";
import Review from "@/app/container/review/review";

export default function Page() {
  return (
    <div>
      <FlowInfo page="detail" />
      <Review />
    </div>
  );
}
