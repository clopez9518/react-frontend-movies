import { Button } from "@/components/ui/button";
import { getPagesPagination } from "@/helpers/getPagesPagination.helper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export const PaginationComponent: React.FC<PaginationProps> = ({
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}) => {

  const { pages, lastVisiblePage, firstVisiblePage } = getPagesPagination(page, totalPages);

  return (
    <div className="flex items-center justify-center mt-6 mb-6 text-white space-x-2">
      {/* Prev */}
      <Button
        variant="outline"
        size="sm"
        disabled={!hasPreviousPage}
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft />
      </Button>

      {/* First */}
      {firstVisiblePage > 1 && (
        <>
          <Button variant="outline" size="sm" onClick={() => onPageChange(1)}>
            1
          </Button>
          <span>...</span>
        </>
      )}

      {/* Pages */}
      {pages.map((p) => (
        <Button
          key={p}
          onClick={() => onPageChange(p)}
          variant={p === page ? "default" : "outline"}
          size="sm"
          style={{ minWidth: "35px" }}
        >
          {p}
        </Button>
      ))}

      {/* Last */}
      {lastVisiblePage < totalPages && (
        <>
          <span>...</span>
          <Button variant="outline" size="sm" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </Button>
        </>
      )}

      {/* Next */}
      <Button
        className="dark"
        variant="outline"
        size="sm"
        disabled={!hasNextPage}
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};