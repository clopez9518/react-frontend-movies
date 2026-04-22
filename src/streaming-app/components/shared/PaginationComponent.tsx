import { Button } from "@/components/ui/button";
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

  const getPages = () => {
    const pages: number[] = [];

    const maxVisible = 5; // cantidad de botones visibles
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

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
      {page > 3 && (
        <>
          <Button variant="outline" size="sm" onClick={() => onPageChange(1)}>
            1
          </Button>
          <span>...</span>
        </>
      )}

      {/* Pages */}
      {getPages().map((p) => (
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
      {page < totalPages - 2 && (
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