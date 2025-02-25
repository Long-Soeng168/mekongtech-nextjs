"use client";

import React from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define API Pagination Response Types

const MyPagination = ({ links, from, to, total, last_page }) => {
  if (total < 1) return null; // Prevent rendering if no results

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  // Get current page from query params, default to page 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // Function to update the page in URL
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Check previous and next page availability
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < last_page;

  // Function to handle pagination clicks
  const handlePaginationChange = (pageNumber) => {
    if (pageNumber) {
      replace(createPageURL(pageNumber));
    }
  };

  return (
    <div className="flex items-center mt-3 justify-center w-full md:justify-between">
      <p className="hidden whitespace-nowrap md:block">
        {`Showing ${from} to ${to} of ${total} results`}
      </p>
      <Pagination className="w-auto mx-0">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              title="Previous"
              className={
                hasPreviousPage
                  ? "text-primary font-bold"
                  : "opacity-50 pointer-events-none"
              }
              onClick={() => handlePaginationChange(currentPage - 1)}
            />
          </PaginationItem>

          {/* Page Links */}
          {links
            .filter(
              (link) =>
                !link.label.includes("Previous") && !link.label.includes("Next")
            )
            .map((link, index) => {
              const pageNumber = link.url
                ? Number(new URL(link.url).searchParams.get("page"))
                : null;
              return (
                <PaginationItem
                  key={index}
                  className={`${
                    link.active ? "" : "hidden"
                  } md:block cursor-pointer`}
                >
                  <PaginationLink
                    onClick={() => handlePaginationChange(pageNumber)}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={
                      link.active
                        ? "text-primary border-primary border-2 font-bold"
                        : ""
                    }
                  />
                </PaginationItem>
              );
            })}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              title="Next"
              className={
                hasNextPage
                  ? "text-primary font-bold"
                  : "opacity-50 pointer-events-none"
              }
              onClick={() => handlePaginationChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default MyPagination;
