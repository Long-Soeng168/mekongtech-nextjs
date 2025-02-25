"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, FilterIcon } from "lucide-react";
import { fetchCategories } from "@/service/category-service";
import { useToast } from "@/hooks/use-toast";
import MyLoadingAnimation from "../../../../../../components/my-loading-animation";

const formSchema = z.object({
  parent_code: z.string().optional(),
  status: z.string().optional(),
  sort_by: z.string().optional(),
});

export default function MyForm() {
  const { toast } = useToast();

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleFetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const result = await fetchCategories({
        per_page: "200",
        main_category: "1",
      });
      if (!result.data) {
        toast({
          title: "Fail fetching Categories.",
          variant: "destructive",
        });
        return;
      }
      setCategories(result.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Fail fetching Categories.",
        variant: "destructive",
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    handleFetchCategories();
    // Get query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    // Reset the form with default values from URL params
    form.reset({
      parent_code: params.get("parent_code") || "", // Default value for parent_code
      status: params.get("status") || "", // Default value for status
      sort_by: params.get("sort_by") || "", // Default value for sort_by
    });
  }, []);

  const status_items = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Public",
      value: "1",
    },
    {
      label: "Not-Public",
      value: "0",
    },
  ];

  const sort_by_items = [
    {
      label: "Select Sort",
      value: "",
    },
    {
      label: "Title (Z -> A)",
      value: "title_desc",
    },
    {
      label: "Title (A -> Z)",
      value: "title_asc",
    },
    {
      label: "Index (9 -> 0)",
      value: "order_index_desc",
    },
    {
      label: "Index (0 -> 9)",
      value: "order_index_asc",
    },
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values) {
    try {
      const params = new URLSearchParams(window.location.search);

      // Update or delete query parameters based on form values
      if (values.parent_code) {
        params.set("parent_code", values.parent_code);
      } else {
        params.delete("parent_code");
      }

      if (values.status) {
        params.set("status", values.status);
      } else {
        params.delete("status");
      }

      if (values.sort_by) {
        params.set("sort_by", values.sort_by);
      } else {
        params.delete("sort_by");
      }

      params.set("page", "1");

      // Push the updated query parameters to the URL
      // router.push(`?${params.toString()}`, { scroll: true });
      // Construct the new URL with updated query parameters
      const newUrl = `${window.location.pathname}?${params.toString()}`;

      // Refresh the whole page by setting window.location.href
      window.location.href = newUrl;
      console.log("Form values submitted:", values);
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormLabel className="flex items-center gap-2">
          <FilterIcon /> Filter
        </FormLabel>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Status</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? status_items.find(
                                (status) => status.value === field.value
                              )?.label
                            : "Select status"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search status..." />
                        <CommandList>
                          <CommandEmpty>No status found.</CommandEmpty>
                          <CommandGroup>
                            {status_items.map((status) => (
                              <CommandItem
                                value={status.label}
                                key={status.value}
                                onSelect={() => {
                                  form.setValue("status", status.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    status.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {status.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            <FormField
              control={form.control}
              name="sort_by"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Sort By</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? sort_by_items.find(
                                (sort) => sort.value === field.value
                              )?.label
                            : "Select sort"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search sort..." />
                        <CommandList>
                          <CommandEmpty>No sort found.</CommandEmpty>
                          <CommandGroup>
                            {sort_by_items.map((sort) => (
                              <CommandItem
                                value={sort.label}
                                key={sort.value}
                                onSelect={() => {
                                  form.setValue("sort_by", sort.value);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    sort.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {sort.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-6">
            {loadingCategories ? (
              <MyLoadingAnimation />
            ) : (
              <FormField
                control={form.control}
                name="parent_code"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Parent Category</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value
                              ? categories?.find(
                                  (category) => category.code === field.value
                                )?.title
                              : "Select category"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search category..." />
                          <CommandList>
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup>
                              <CommandItem
                                value={``}
                                onSelect={() => {
                                  form.setValue("parent_code", "");
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    "" === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {`N/A`}
                              </CommandItem>
                              {categories?.map((category) => (
                                <CommandItem
                                  value={category.title}
                                  key={category.code}
                                  onSelect={() => {
                                    form.setValue("parent_code", category.code);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      category.code === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {category.title}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
