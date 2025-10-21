"use client";
import Header from "@/components/_components/header";
import Faqs from "@/components/_components/faq";
import DiscordCommunity from "@/components/_components/discordcommunity";
import Product from "@/components/_components/product";

export default function ProductPage() {
  return (
    <div className="w-screen min-h-screen">
      <div className="h-auto pt-10 w-full bg-[#f9fafb] relative">
        <Header />

        <Product
          title="YouTube Premium"
          price="$44.99/yearly"
          originalPrice="$168/year"
          discount="80% OFF"
          imageSrc="/youtube-banner.png"
          imageAlt="YouTube Premium banner"
          purchaseLink="https://buy.stripe.com/28E8wP0Ge5zP31Q7Jn3840e"
          deliveryInfo="The delivery can be by email or through"
          discordLink="https://discord.gg/4rsNDUhApJ"
        />

        <Faqs />
        <DiscordCommunity />

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
