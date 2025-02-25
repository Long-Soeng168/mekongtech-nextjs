import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Page({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="px-4">{children}</SidebarInset>
    </SidebarProvider>
  );
}
