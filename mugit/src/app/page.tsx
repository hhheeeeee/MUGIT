import Line from "./container/landing/line";
import Footer from "./components/footer";
import TextAnimation from "./components/text-animation";

export default function Home() {
  return (
    <>
      <main
        className="flex h-[90%] w-full flex-auto flex-col content-center items-center justify-center
      bg-pointblack"
      >
        <div
          className="flex items-center justify-between bg-pointblack text-[14rem]
    font-extrabold italic text-pointyellow"
        >
          <TextAnimation inputText="MUGIT" />
        </div>

        <div className="w-full items-center justify-between bg-pointblack">
          <Line />
          <p className="mt-5 text-center text-[2rem] font-bold text-pointyellow">
            Make your own Flow
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
