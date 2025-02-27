"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"; // Use named import for zod
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, CloudUpload } from "lucide-react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/ui/file-upload";
import { BASE_BACKEND_API_URL, CATEGORY_IMAGE_URL } from "@/config/env";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import axios from "axios";
import MyProgressBar from "@/components/my-progress-bar";
import MyLoadingAnimation from "../../../../../../components/my-loading-animation";
import { clearCache } from "@/lib/clear-cache";
import { fetchBrand, fetchBrands } from "@/service/brands-service";

// Define the form schema using zod
const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  title_kh: z.string().min(1, "Khmer title is required").max(255),
  code: z.string().min(1, "Code is required").max(255),
  order_index: z.coerce.number().min(0).max(255).optional(),
  image: z.any().optional(), // Allow any file type for the image
});

export default function EditBrandForm({ id }) {
  const [loadingBrand, setLoadingBrand] = useState(false);
  const [brand, setbrand] = useState(null);

  const [loadingBrands, setLoadingBrands] = useState(false);
  const [Brands, setBrands] = useState([]);

  const [refreshKey, setRefreshKey] = useState(0);

  const { toast } = useToast();
  const [files, setFiles] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      title_kh: "",
      code: "",
      order_index: 1,
      image: undefined,
    },
  });

  const handleBrands = async () => {
    try {
      setLoadingBrands(true);
      const resultBrands = await fetchBrands({ per_page: "200" });
      if (!resultBrands.data) {
        toast({
          title: "Fail fetching brands.",
          variant: "destructive",
        });
        return;
      }
      setBrands(resultBrands.data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Fail fetching brands.",
        variant: "destructive",
      });
    } finally {
      setLoadingBrands(false);
    }
  };

  const handleFetchBrands = async () => {
    try {
      setLoadingBrands(true);
      const resultBrands = await fetchBrand({ id: id });
      console.log(resultBrands);
      if (!resultBrands) {
        toast({
          title: "Fail fetching brands.",
          variant: "destructive",
        });
        return;
      }
      setBrands(resultBrands);
      // Set form values with fetched data
      form.reset({
        title: resultBrands.title,
        title_kh: resultBrands.title_kh,
        code: resultBrands.code,
        order_index: resultBrands.order_index,
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Fail fetching Brands.",
        variant: "destructive",
      });
    } finally {
      setLoadingBrands(false);
    }
  };

  useEffect(() => {
    handleFetchBrands();
    handleBrands();
  }, [refreshKey]);

  const onSubmit = async (values) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("title_kh", values.title_kh);
    formData.append("code", values.code);
    if (values.order_index !== undefined) {
      formData.append("order_index", values.order_index.toString());
    }
    // if (values.parent_code) {
    //   formData.append("parent_code", values.parent_code);
    // }
    if (files && files.length > 0) {
      formData.append("image", files[0]); // Append the first file
    }

    try {
      const response = await axios.post(
        `${BASE_BACKEND_API_URL}brands/${id}/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );
      setUploadProgress(0);
      toast({
        title: "Update Successfully.",
        variant: "success",
      });
      form.reset();
      setFiles(null);
      clearCache("/dashboard/products/brands");
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      if (error.response) {
        const errorData = error.response.data;
        const firstError = Object.values(errorData.errors)[0][0];
        toast({
          title: `${errorData.message || "Something went wrong"}`,
          description: `${firstError}`,
          variant: "destructive",
        });
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Axios Error:", error.message);
      }
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: Computer" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="title_kh"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Khmer</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="ex: កុំព្យូទ័រ"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: CP" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-6">
            <FormField
              control={form.control}
              name="order_index"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Index</FormLabel>
                  <FormControl>
                    <Input placeholder="ex: 1" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* <div className="col-span-6">
            {loadingBrands ? (
              <MyLoadingAnimation />
            ) : (
              <FormField
                control={form.control}
                name="parent_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Parent Brands</FormLabel>
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
                              ? Brands.find(
                                  (Brands) => Brands.code === field.value
                                )?.title
                              : "Select Brands"}
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
                              {Brands.map((category) => (
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
          </div> */}
        </div>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <FileUploader
                  value={files}
                  onValueChange={setFiles}
                  dropzoneOptions={{
                    maxFiles: 100,
                    maxSize: 1024 * 1024 * 2, // 2MB
                    multiple: false,
                    accept: {
                      "image/jpeg": [".jpeg", ".jpg"],
                      "image/png": [".png"],
                      "image/gif": [".gif"],
                    },
                  }}
                  className="relative bg-background rounded-lg p-2"
                >
                  <FileInput
                    id="fileInput"
                    className="outline-dashed outline-1 outline-slate-500"
                  >
                    <div className="flex items-center justify-center flex-col p-8 w-full">
                      <CloudUpload className="text-gray-500 w-10 h-10" />
                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                        &nbsp; or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (Max 2MB)
                      </p>
                    </div>
                  </FileInput>
                  <FileUploaderContent className="flex items-center flex-row gap-2">
                    {(files?.length ?? 0) > 0 ||
                      (brand?.image && (
                        <span className="size-20 mt-2 border p-0 rounded-md overflow-hidden">
                          <Image
                            src={`${CATEGORY_IMAGE_URL}${brand?.image}`}
                            alt={brand?.image || "icon image"}
                            height={80}
                            width={80}
                            className="size-20 p-0 object-contain"
                          />
                        </span>
                      ))}

                    {files?.map((file, i) => (
                      <FileUploaderItem
                        key={i}
                        index={i}
                        className="size-20 border p-0 rounded-md overflow-hidden"
                        aria-roledescription={`file ${i + 1} containing ${
                          file.name
                        }`}
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          height={80}
                          width={80}
                          className="size-20 p-0 object-contain"
                        />
                      </FileUploaderItem>
                    ))}
                  </FileUploaderContent>
                </FileUploader>
              </FormControl>
              <FormDescription>
                Recommended: 1x1 or (512x512px) and Max 2MB
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {uploadProgress > 0 && (
          <MyProgressBar uploadProgress={uploadProgress} />
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
