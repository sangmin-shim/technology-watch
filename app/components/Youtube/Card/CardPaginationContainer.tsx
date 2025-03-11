import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";

interface CardPaginationContainerProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function CardPaginationContainer({
  totalPages,
  currentPage,
  onPageChange,
}: CardPaginationContainerProps) {
  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                currentPage > 1 && onPageChange(currentPage - 1);
              }}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                className={`hover:cursor-pointer border border-gray-700 hover:bg-gray-700 ${
                  currentPage === page
                    ? "bg-white text-black"
                    : "bg-gray-900 text-white"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                currentPage < totalPages && onPageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default CardPaginationContainer;
