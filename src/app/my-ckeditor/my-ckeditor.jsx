"use client";
import dynamic from "next/dynamic";

const CustomCKEditor = dynamic(() => import("./custom-ckeditor"), {
  ssr: false,
});

export default function MyCKEditor() {
  return <CustomCKEditor />;
}
