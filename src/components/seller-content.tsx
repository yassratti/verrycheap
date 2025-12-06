"use client"

import { useSellerSection } from "@/contexts/seller-section-context"

/**
 * Component that renders different content based on the active section
 * This is where you'll add the specific UI for each section
 */
export function SellerContent() {
  const { activeSection } = useSellerSection()

  // Render different content based on the active section
  switch (activeSection) {
    case 'products':
      return (
       <>
     
       </>
      )

    case 'settings':
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <p className="text-muted-foreground text-lg">Settings Section - Configure your preferences</p>
          </div>
        </div>
      )

    case 'support':
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <p className="text-muted-foreground text-lg">Support Section - Get help and assistance</p>
          </div>
        </div>
      )

    case 'feedback':
      return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min flex items-center justify-center">
            <p className="text-muted-foreground text-lg">Feedback Section - Share your thoughts</p>
          </div>
        </div>
      )

    default:
      return null
  }
}
