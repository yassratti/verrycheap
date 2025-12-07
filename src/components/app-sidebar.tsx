"use client";

import * as React from "react";
import { Command, LifeBuoy, Send, Settings2 } from "lucide-react";

import { Icons } from "@/components/_components/icons";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Products",
      section: "products" as const,
      icon: Icons.store,
      isActive: true,
    },

    {
      title: "Settings",
      section: "settings" as const,
      icon: Settings2,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      section: "support" as const,
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      section: "feedback" as const,
      icon: Send,
    },
  ],
};

// Define the user type for the sidebar
type SidebarUser = {
  name: string;
  email: string;
  avatar: string;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  user?: SidebarUser;
};

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  // Use provided user or fallback to default data
  const userData = user || data.user;
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">VeryCheap Inc</span>
                  <span className="truncate text-xs">Seller</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* Quick Create and Notifications buttons */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="flex items-center gap-2">
              <SidebarMenuButton
                tooltip="Quick Create"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground flex-1 cursor-pointer duration-200 ease-linear"
              >
                <Icons.plus />
                <span>Quick Create</span>
              </SidebarMenuButton>
              <Button
                size="icon"
                className="size-8 shrink-0 cursor-pointer group-data-[collapsible=icon]:opacity-0"
                variant="outline"
              >
                <Icons.bell />
                <span className="sr-only">Notifications</span>
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
    </Sidebar>
  );
}
