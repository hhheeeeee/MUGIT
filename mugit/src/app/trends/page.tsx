import { theme } from "../styles/theme";

export default function TrendsPage() {
  return (
    <main
      className={`box-border flex h-full w-full flex-auto flex-col items-center bg-[${theme.pointyellow}] px-10 py-8`}
      // className={`w-screen flex flex-col flex-auto items-center bg-[${theme.pointyellow}]`}
    >
      <div className="flex h-full flex-auto flex-col items-center border-orange-700">
        이거 트렌드 페이지임
      </div>
      <div className="flex h-full flex-auto flex-col items-center border-orange-700">
        이거 트렌드 페이지임
      </div>
    </main>
  );
}
