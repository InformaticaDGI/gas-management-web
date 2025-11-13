import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { getMe } from "../actions";
import { signOut } from "next-auth/react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me, error } = await getMe();

  if (error || !me) {
    console.error("Error al obtener los datos del usuario:", error);
    redirect("/auth/login");
  }

  if (!me.isActive) {
    signOut({ redirect: true, callbackUrl: "/auth/login" });
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
    <AppSidebar variant="sidebar" user={me} />
    <SidebarInset>
      {children}
    </SidebarInset>
  </SidebarProvider>
}