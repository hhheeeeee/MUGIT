import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Line from "../container/landing/line";
import Footer from "../components/footer";
import TextAnimation from "../components/text-animation";

export default function IndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  // Once the request locale is set, you
  // can call hooks from `next-intl`
  const t = useTranslations("Index");

  return (
    <>
      <main
        className="flex h-[90%] w-full flex-auto flex-col content-center items-center justify-center
      bg-pointblack"
      >
        {/* <h1>{t("title")}</h1> */}
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
