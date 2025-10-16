import Image from "next/image";
import Header from "@/components/_components/header";
import Faqs from "@/components/_components/faq";
import DiscordCommunity from "@/components/_components/discordcommunity";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Icons } from "@/components/icons/icons";

export default function ProductPage() {
  return (
    <div className="w-screen min-h-screen">
      <div className="h-auto pt-10 w-full bg-[#f9fafb] relative">
        <Header />

        <div className="w-full mt-10 pt-6 flex flex-col items-center justify-center relative z-20">
          {/* Top heading section styled like FAQ header */}
          <div className="text-center space-y-3 mb-8 px-5 w-full">
            <h1 className="text-blue-800 font-semibold text-base">Purchase</h1>
            <h2 className="text-black text-2xl font-bold ">Purchase your premium plan, fast delivery</h2>
          </div>

          {/* Featured banner with discount badge - no background card */}
          <div className="w-full   px-4  flex justify-center">
            <div className="relative max-w-5xl w-full">
              <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
                80% OFF
              </div>
              <Image
                src="/youtube-banner.png"
                alt="Featured product banner"
                width={1200}
                height={600}
                className="w-full h-auto rounded-lg "
                priority
              />
            </div>
          </div>

          
        </div>

        <Faqs />
        <DiscordCommunity />

        <div
          className="absolute bottom-0 left-0 w-full h-32 z-0"
          style={{ background: "linear-gradient(to top, #ffffff, transparent)" }}
        />
      </div>
    </div>
  );
}


