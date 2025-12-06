"use client"

import * as React from "react"
import { type LucideIcon } from "lucide-react"
import { useSellerSection } from "@/contexts/seller-section-context"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string
    section: 'products' | 'settings' | 'support' | 'feedback'
    icon: LucideIcon
  }[]
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  // Get the active section and setter from context
  const { activeSection, setActiveSection } = useSellerSection()

  /**
   * Handle navigation to a new section
   * Updates the URL without reloading the page
   */
  const handleNavigate = (section: 'products' | 'settings' | 'support' | 'feedback') => {
    setActiveSection(section)
  }

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                size="sm"
                // Highlight the active section
                isActive={activeSection === item.section}
              >
                <button onClick={() => handleNavigate(item.section)}>
                  <item.icon />
                  <span>{item.title}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
