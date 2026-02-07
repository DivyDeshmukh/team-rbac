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
    <div className="flex items-center justify-between px-4 py-3 
                    bg-slate-900 border border-slate-700 
                    rounded-xl shadow-md mt-4">

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

      {/* Page Info */}
      <span className="text-sm text-slate-300 font-medium">
        Page <span className="text-blue-400">{page}</span> of{" "}
        <span className="text-blue-400">{totalPages}</span>
      </span>

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
