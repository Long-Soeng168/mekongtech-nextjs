import { Button } from "@/components/ui/button";
import MyCKEditor from "./my-ckeditor/my-ckeditor";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <Button>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
}
