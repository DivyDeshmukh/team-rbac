"use client";

import { PaginationMeta } from "@/lib/shared/types";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: PaginationMeta) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className="flex items-center justify-between px-4 py-3 
                    bg-slate-900 border border-slate-700 
                    rounded-xl shadow-md mt-4"
    >
      {/* Previous Button */}
      <button
        onClick={() => goToPage(page - 1)}
        disabled={!hasPrevPage}
        className="px-4 py-2 rounded-lg text-sm font-medium
                   bg-slate-800 text-slate-200 border border-slate-700
                   hover:bg-slate-700 hover:text-white
                   disabled:opacity-40 disabled:cursor-not-allowed
                   transition-all duration-200 cursor-pointer"
      >
        Previous
      </button>

      {/* Page Select */}
      <div className="flex items-center gap-2 text-sm text-slate-300">
        <span className="text-sm text-blue-400 font-medium">Page</span>
        <select
          value={page}
          onChange={(e) => goToPage(Number(e.target.value))}
          className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1
                     text-sm cursor-pointer
                     hover:border-slate-500 transition-colors"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option value={i + 1} key={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <span className="mx-2 text-blue-400">
          of <span className="mx-2 text-white">{totalPages}</span>
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={() => goToPage(page + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 rounded-lg text-sm font-medium
                   bg-blue-600 text-white
                   hover:bg-blue-500
                   disabled:bg-slate-700 disabled:text-slate-400
                   disabled:cursor-not-allowed
                   transition-all duration-200 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
