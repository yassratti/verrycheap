"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

type SellerSection = "products" | "management" | "support" | "feedback";

interface SellerSectionContextType {
  activeSection: SellerSection;
  setActiveSection: (section: SellerSection) => void;
}

const SellerSectionContext = createContext<
  SellerSectionContextType | undefined
>(undefined);
interface SellerSectionProviderProps {
  children: React.ReactNode;
}

export function SellerSectionProvider({
  children,
}: SellerSectionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getCurrentSectionFromUrl = (): SellerSection => {
    const parts = pathname.split("/");
    const section = parts[parts.length - 1];

    if (["products", "management", "support", "feedback"].includes(section)) {
      return section as SellerSection;
    }
    return "products";
  };

  const [activeSection, setActiveSectionState] = useState<SellerSection>(
    getCurrentSectionFromUrl(),
  );

  useEffect(() => {
    const parts = pathname.split("/");
    const section = parts[parts.length - 1];

    const currentSection = (
      ["products", "management", "support", "feedback"].includes(section)
        ? section
        : "products"
    ) as SellerSection;

    setActiveSectionState(currentSection);
  }, [pathname]);

  const setActiveSection = (section: SellerSection) => {
    setActiveSectionState(section);
    router.push(`/seller/${section}`, { scroll: false });
  };

  return (
    <SellerSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SellerSectionContext.Provider>
  );
}

export function useSellerSection() {
  const context = useContext(SellerSectionContext);
  if (context === undefined) {
    throw new Error(
      "useSellerSection must be used within a SellerSectionProvider",
    );
  }
  return context;
}
