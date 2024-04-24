import CreateReview from "./createreview";

export default function Review() {
  return (
    <div className="mx-auto w-2/3">
      <p className="text-2xl font-bold underline decoration-4 underline-offset-[7.3px]">
        Comments
      </p>
      <hr className="border-2" />
      <CreateReview />
    </div>
  );
}
