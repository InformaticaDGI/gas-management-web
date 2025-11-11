import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) {
      redirect("/auth/login");
  }

    return <SidebarProvider
    className="hidden md:flex"
    style={
      {
        "--sidebar-width": "calc(var(--spacing) * 64)",
        "--header-height": "calc(var(--spacing) * 12 + 1px)",
      } as React.CSSProperties
    }
  >
    <AppSidebar variant="sidebar" />
    <SidebarInset>
      {children}
    </SidebarInset>
  </SidebarProvider>
}