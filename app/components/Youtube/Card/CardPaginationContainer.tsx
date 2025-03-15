import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import useIsMobile from "~/components/hooks/useMobile";
import { Button } from "~/components/ui/button";
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
  const isMobile = useIsMobile();

  const pages = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  return (
    <div className="w-full flex justify-center">
      {isMobile ? (
        <MobileDevicePaginationWrapper
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          pages={pages}
        />
      ) : (
        <ComputerDevicePaginationWrapper
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
          pages={pages}
        />
      )}
    </div>
  );
}

function MobileDevicePaginationWrapper({
  totalPages,
  currentPage,
  onPageChange,
  pages,
}: CardPaginationContainerProps & { pages: number[] }) {
  return (
    <>
      <div className="flex items-center justify-between w-full max-w-md px-2 py-4">
        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={(e) => {
            e.preventDefault();
            currentPage > 1 && onPageChange(currentPage - 1);
          }}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 text-black" />
          <span className="sr-only">Previous page</span>
        </Button>

        <div className="text-sm font-medium">
          Page {currentPage} sur {totalPages}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4  text-black" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </>
  );
}

function ComputerDevicePaginationWrapper({
  totalPages,
  currentPage,
  onPageChange,
  pages,
}: CardPaginationContainerProps & { pages: number[] }) {
  return (
    <>
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
    </>
  );
}
export default CardPaginationContainer;
