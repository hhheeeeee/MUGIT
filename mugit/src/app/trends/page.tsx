import Trendslist from "../container/trends/trendslist";
export default function TrendsPage() {
  return (
    <main
      //   className="py-10s flex min-h-[90%] w-full flex-auto flex-col content-center items-center
      // justify-center bg-pointyellow"
      className="py-10s flex min-h-[90%] w-full flex-auto flex-col content-center items-center
    justify-center "
    >
      <div className="flex h-full w-7/12 flex-col border-2 border-solid">
        이거 트렌드 페이지임
        <div>여기는 검색하는 데</div>
        <Trendslist />
      </div>
    </main>
  );
}
