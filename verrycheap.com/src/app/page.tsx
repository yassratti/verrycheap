"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ProductData } from "@/types/product";
import Header from "@/components/_components/header";
import Hero from "@/components/_components/hero";
import Whatwedo from "@/components/_components/what-we-do";
import Carousel from "@/components/_components/carousel";
import Faqs from "@/components/_components/faq";
import DiscordCommunity from "@/components/_components/discordcommunity";
import SubscriptionsDash from "@/components/_components/subscriptionsDash";
import HowItWorksCard from "@/components/_components/how-it-works-card";
import Missing from "@/components/_components/missing";
export default function Home() {
  const [isHowItWorksModalOpen, setIsHowItWorksModalOpen] = useState(false);
  const router = useRouter();

  const openHowItWorksModal = () => setIsHowItWorksModalOpen(true);
  const closeHowItWorksModal = () => setIsHowItWorksModalOpen(false);

  const handlePurchase = (productData: ProductData) => {
    // Guardar los datos del producto en localStorage para que la página de producto los pueda leer
    localStorage.setItem("selectedProduct", JSON.stringify(productData));
    // Navegar a la página de producto
    router.push("/product");
  };
  return (
    <div className="w-screen h-screen">
      <div className="h-240 w-full bg-[#f9fafb] relative">
        {/* Diagonal Fade Grid Background - Top Left */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
            backgroundSize: "60px 60px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
            maskImage:
              "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          }}
        />

        <Header />
        <Hero />
        <Carousel
          onOpenHowItWorks={openHowItWorksModal}
          onPurchase={handlePurchase}
        />
        <Whatwedo />
        <SubscriptionsDash onOpenHowItWorks={openHowItWorksModal} />
        <Missing />
        <Faqs />
        <DiscordCommunity />
        <HowItWorksCard
          isOpen={isHowItWorksModalOpen}
          onClose={closeHowItWorksModal}
        />

        {/* Gradient at bottom */}
        <div
          className="absolute bottom-0 left-0 w-full h-32 z-0"
          style={{
            background: "linear-gradient(to top, #ffffff, transparent)",
          }}
        />
      </div>
    </div>
  );
}
