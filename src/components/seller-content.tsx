"use client";

import { useSellerSection } from "@/contexts/seller-section-context";
import { ProductsSection } from "@/components/sections/products-section";
import { SupportSection } from "@/components/sections/support-section";
import { FeedbackSection } from "@/components/sections/feedback-section";
import { ManagementSection } from "@/components/sections/management-section";
/**
 * Component that renders different sections based on the active section
 * Each section is a separate component with its own customizable header and content
 */
export function SellerContent() {
  const { activeSection } = useSellerSection();

  // Render the appropriate section component based on active section
  switch (activeSection) {
    case "products":
      return <ProductsSection />;

    case "management":
      return <ManagementSection />;

    case "support":
      return <SupportSection />;

    case "feedback":
      return <FeedbackSection />;

    default:
      return null;
  }
}
