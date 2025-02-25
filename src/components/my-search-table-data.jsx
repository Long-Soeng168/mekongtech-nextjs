"use client";

import { useDebounce } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function MySearchTableData() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Debounced value updates after 500ms
  const [debouncedSearch] = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, router]);

  // Function for immediate search on button click
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh

    const params = new URLSearchParams(window.location.search);
    if (search) {
      params.set("search", search);
      params.set("page", "1");
    } else {
      params.delete("search");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex rounded-lg p-1 border w-full max-w-sm items-center space-x-2"
    >
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="shadow-none border-none"
        placeholder="Search..."
      />
      <Button variant="outline" type="submit">
        <SearchIcon className="[&_svg]:size-2" /> Search
      </Button>
    </form>
  );
}
