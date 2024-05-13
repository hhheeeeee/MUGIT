"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResultTable from "@/app/container/trends/keyword/ResultTable";
// import { useRouter } from "next/navigation";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import Pagination from "@/app/container/trends/pagenation";
import useAsync from "@/app/hooks/useAsync";
import { getSearchResult } from "@/app/libs/trendApi";

export default function Page({ params }: { params: { keyword: string } }) {
  const t = useTranslations("Trends");
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>("");
  const [page, setPage] = useState(0);

  useEffect(() => {
    setSearchInput(decodeURIComponent(params.keyword));
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const [state, refetch] = useAsync(
    () => getSearchResult(page, params.keyword),
    []
  );
  const { loading, data: searchResult, error } = state;

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <div
      className="flex min-h-[90%] w-full flex-col px-52 py-10
	"
    >
      <div className="relative h-10 w-96 rounded-full  bg-gray-200 p-0">
        <input
          type="text"
          className=" h-full w-[70%] rounded-full bg-gray-200 p-0 pl-4 outline-none"
          onChange={(event) => handleInput(event)}
          value={searchInput}
        />
        <button
          onClick={() => router.push(`/trends/${searchInput}`)}
          className="h-full w-[30%] rounded-full border-2 border-solid bg-pointblue px-4 py-2 text-white"
        >
          {t("search")}
        </button>
      </div>
      <ResultTable data={searchResult?.content} />
      {searchResult?.content.length ? (
        <Pagination totalPage={searchResult.totalPages} />
      ) : (
        <div className="pt-9 text-center text-gray-500">{t("noResult")}</div>
      )}
    </div>
  );
}
