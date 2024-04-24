"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResultTable from "@/app/container/trends/keyword/ResultTable";

export default function Page() {
  const [searchInput, setSearchInput] = useState<string>("");
  const searchParams = useSearchParams();
  const keyword = searchParams.get("search");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

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
          value={keyword || searchInput}
        />
        <button className="h-full w-[30%] rounded-full border-2 border-solid bg-pointblue px-4 py-2 text-white">
          Search
        </button>
      </div>
      <ResultTable />
    </div>
  );
}
