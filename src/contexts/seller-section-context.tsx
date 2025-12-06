"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

// Define the available sections for the seller dashboard
type SellerSection = 'products' | 'settings' | 'support' | 'feedback'

// Context interface
interface SellerSectionContextType {
  activeSection: SellerSection
  setActiveSection: (section: SellerSection) => void
}

// Create the context with default values
const SellerSectionContext = createContext<SellerSectionContextType | undefined>(undefined)

// Provider component props
interface SellerSectionProviderProps {
  children: React.ReactNode
}

/**
 * Provider component that manages the active section state
 * and syncs it with the URL without page reloads
 */
export function SellerSectionProvider({ children }: SellerSectionProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  // Extract the current section from the URL
  const getCurrentSectionFromUrl = (): SellerSection => {
    const parts = pathname.split('/')
    const section = parts[parts.length - 1]
    
    // Validate if the section is valid, otherwise default to 'products'
    if (['products', 'settings', 'support', 'feedback'].includes(section)) {
      return section as SellerSection
    }
    return 'products'
  }

  const [activeSection, setActiveSectionState] = useState<SellerSection>(getCurrentSectionFromUrl())

  // Sync state with URL on mount and when pathname changes
  useEffect(() => {
    const currentSection = getCurrentSectionFromUrl()
    setActiveSectionState(currentSection)
  }, [pathname])

  /**
   * Updates the active section and pushes the new URL to the browser history
   * without causing a page reload
   */
  const setActiveSection = (section: SellerSection) => {
    setActiveSectionState(section)
    // Use router.push to update the URL without reloading
    router.push(`/seller/${section}`, { scroll: false })
  }

  return (
    <SellerSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SellerSectionContext.Provider>
  )
}

/**
 * Custom hook to access the seller section context
 * Throws an error if used outside of SellerSectionProvider
 */
export function useSellerSection() {
  const context = useContext(SellerSectionContext)
  if (context === undefined) {
    throw new Error('useSellerSection must be used within a SellerSectionProvider')
  }
  return context
}
