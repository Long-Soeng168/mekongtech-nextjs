import React, { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import AddNewButton from "./components/add-new-button";
import TableData from "./components/table-data";
import { FilterButton } from "./components/filter-button";
import MyLoadingAnimation from "../../../../components/my-loading-animation";
import { MySearchTableData } from "@/components/my-search-table-data";
import MyFilterQueries from "@/components/my-filter-queries";

const Page = async ({ searchParams }) => {
  const {
    page = "1",
    sort_by = "",
    search = "",
    parent_code = "",
    status = "",
    is_delete_search = "",
  } = await searchParams;

  return (
    <div>
      <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block hover:underline">
                <BreadcrumbLink href="/dashboard/products">
                  Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="text-foreground hover:underline"
                  href="/dashboard/products/categories"
                >
                  Categories
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <AddNewButton />
      </header>
      <main>
        <Suspense
          key={"filter and search key" + is_delete_search}
          fallback={<MyLoadingAnimation />}
        >
          <div className="flex gap-2 items-center">
            <MySearchTableData />
            <FilterButton />
          </div>
        </Suspense>

        <MyFilterQueries />

        <Suspense
          key={"" + search + page + sort_by + parent_code + status}
          fallback={<MyLoadingAnimation />}
        >
          <TableData
            page={page}
            search={search}
            sort_by={sort_by}
            parent_code={parent_code}
            status={status}
          />
        </Suspense>
      </main>
    </div>
  );
};

export default Page;
