"use client"

import { useSellerSection } from "@/contexts/seller-section-context"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

/**
 * Component that renders different content based on the active section
 * Each section has its own header and content
 */
export function SellerContent() {
  const { activeSection } = useSellerSection()

  // Get the display name for the current section
  const getSectionDisplayName = () => {
    switch (activeSection) {
      case 'products':
        return 'Products'
      case 'settings':
        return 'Settings'
      case 'support':
        return 'Support'
      case 'feedback':
        return 'Feedback'
      default:
        return 'Dashboard'
    }
  }

  // Render the header for the current section
  const renderHeader = () => (
    <header className="flex h-16 shrink-0 items-center gap-2">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">
                Seller Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{getSectionDisplayName()}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  )

  // Render different content based on the active section
  switch (activeSection) {
    case 'products':
      return (
        <>
          {renderHeader()}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">Product 1</p>
              </div>
              <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">Product 2</p>
              </div>
              <div className="bg-muted/50 aspect-video rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">Product 3</p>
              </div>
            </div>
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Products Section - Add your products here</p>
            </div>
          </div>
        </>
      )

    case 'settings':
      return (
        <>
          {renderHeader()}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Settings Section - Configure your preferences</p>
            </div>
          </div>
        </>
      )

    case 'support':
      return (
        <>
          {renderHeader()}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Support Section - Get help and assistance</p>
            </div>
          </div>
        </>
      )

    case 'feedback':
      return (
        <>
          {renderHeader()}
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
              <p className="text-muted-foreground text-lg">Feedback Section - Share your thoughts</p>
            </div>
          </div>
        </>
      )

    default:
      return null
  }
}
