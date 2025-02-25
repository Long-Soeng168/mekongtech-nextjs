"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

const MyFilterQueries = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleDelete = (value, secondValue, thirdValue) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.delete(value);
      if (value == "search") {
        params.set(
          "is_delete_search",
          (1 + Number(searchParams.get("is_delete_search"))).toString()
        );
      } else {
        params.delete("is_delete_search");
      }
      params.set("page", "1");
    }
    if (secondValue) {
      params.delete(secondValue);
    }
    if (thirdValue) {
      params.delete(thirdValue);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 py-2">
      {searchParams.get("search")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            search : {searchParams.get("search")?.toString()}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("search")?.toString()}
            onClick={() => handleDelete("search")}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("status")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            status :{" "}
            {searchParams.get("status") == "1" ? "Public" : "Not-Public"}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("status")?.toString()}
            onClick={() => handleDelete("status")}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("parent_code")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">
            parent_code : {searchParams.get("parent_code")}
          </span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("parent_code")?.toString()}
            onClick={() => handleDelete("parent_code")}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
      {searchParams.get("sort_by")?.toString() && (
        <div className="flex items-center pl-2 rounded-md bg-secondary">
          <span className="mr-2">sort_by : {searchParams.get("sort_by")}</span>
          <Button
            variant="secondary"
            size="icon"
            key={searchParams.get("sort_by")?.toString()}
            onClick={() => handleDelete("sort_by")}
            className="shadow-none hover:bg-primary group hover:text-primary-foreground"
          >
            <XIcon className="text-primary/50 group-hover:text-primary-foreground" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MyFilterQueries;
