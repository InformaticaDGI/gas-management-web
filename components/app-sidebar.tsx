"use client"

import * as React from "react"
import Link from "next/link"
import {
  IconCalendar,
  IconCamera,
  IconChartBar,
  IconCylinder,
  IconDashboard,
  IconDatabase,
  IconDatabaseLeak,
  IconDropletPlus,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconPackages,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import { MeQuery } from "@/graphql/generated/graphql"

const data = {
  reports: [
    {
      title: "Cierres diarios",
      url: "/reports/daily-closings",
      icon: IconCalendar,
    },
  ],
  inventory: [
    {
      title: "Entradas",
      url: "/inventory/entries",
      icon: IconDropletPlus,
    },
    {
      title: "Tanques",
      url: "/inventory/containers",
      icon: IconDatabaseLeak,
    },
    {
      title: "Productos",
      url: "/inventory/products",
      icon: IconPackages,
    },
    {
      title: "Clientes",
      url: "/inventory/customers",
      icon: IconUsers,
    }
  ],
  users: [
    {
      title: "Usuarios",
      url: "/users",
      icon: IconUsers,
    },
  ],
  navMain: [
    {
      title: "Tablero",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Plantas",
      url: "/plants",
      icon: IconListDetails,
    }
  ],
  navClouds: [
    {
      title: "Captura",
      icon: IconCamera,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Capturas activas",
          url: "#",
        },
        {
          title: "Archivado",
          url: "#",
        },
      ],
    },
    {
      title: "Propuestas",
      icon: IconFileDescription,
      url: "#",
      items: [
        {
          title: "Propuestas activas",
          url: "#",
        },
        {
          title: "Archivado",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: IconFileAi,
      url: "#",
      items: [
        {
          title: "Propuestas activas",
          url: "#",
        },
        {
          title: "Archivado",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Opciones",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Ayuda",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Buscar",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Biblioteca de datos",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reportes",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Asistente de Word",
      url: "#",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ user, ...props }: React.ComponentProps<typeof Sidebar> & { user: MeQuery["me"] }) {
  return (
    <Sidebar collapsible="none" className="h-auto border-r" {...props}>
      <SidebarHeader className="border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="#">
                <IconInnerShadowTop className="size-5!" />
                <span className="text-base font-semibold">Gas management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} label="Inicio" />
        <NavMain items={data.reports} label="Reportes" />
        <NavMain items={data.inventory} label="Inventario" />
        <NavMain items={data.users} label="Usuarios" />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}