"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { useSellerSection } from "@/contexts/seller-section-context";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import type { IconProps } from "@/components/_components/icons";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    section: "products" | "management" | "support" | "feedback";
    icon: LucideIcon | React.ComponentType<IconProps>;
    isActive?: boolean;
    items?: {
      title: string;
      section: "products" | "management" | "support" | "feedback";
    }[];
  }[];
}) {
  // Get the active section and setter from context
  const { activeSection, setActiveSection } = useSellerSection();

  /**
   * Handle navigation to a new section
   * Updates the URL without reloading the page
   */
  const handleNavigate = (
    section: "products" | "management" | "support" | "feedback",
  ) => {
    setActiveSection(section);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                // Highlight the active section
                isActive={activeSection === item.section}
              >
                <button onClick={() => handleNavigate(item.section)}>
                  <item.icon />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
              {item.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <button
                              onClick={() =>
                                handleNavigate(
                                  subItem.section as
                                    | "products"
                                    | "management"
                                    | "support"
                                    | "feedback",
                                )
                              }
                            >
                              <span>{subItem.title}</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
