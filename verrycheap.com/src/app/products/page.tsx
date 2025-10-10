"use client";

import { useState } from "react";
import Header from "@/components/_components/header";
import SubscriptionsDash from "@/components/_components/subscriptionsDash";
import Faqs from "@/components/_components/faq";
import DiscordCommunity from "@/components/_components/discordcommunity";
import HowItWorksCard from "@/components/_components/how-it-works-card";

export default function Products() {
  const [isHowItWorksModalOpen, setIsHowItWorksModalOpen] = useState(false);

  const openHowItWorksModal = () => setIsHowItWorksModalOpen(true);
  const closeHowItWorksModal = () => setIsHowItWorksModalOpen(false);

  return (
    <div className="w-screen min-h-screen">
      <div className="h-auto pt-10 w-full bg-[#f9fafb] relative">
       

        <Header />
        <SubscriptionsDash onOpenHowItWorks={openHowItWorksModal} />
        <Faqs />
        <DiscordCommunity />
        <HowItWorksCard isOpen={isHowItWorksModalOpen} onClose={closeHowItWorksModal} />

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