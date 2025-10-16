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
            <h2 className="text-black text-2xl font-bold ">Still got questions? We&apos;ve got answers</h2>
          </div>

          {/* Featured banner with discount badge - no background card */}
          <div className="w-full px-5 max-w-4xl flex justify-center">
            <div className="relative max-w-2xl">
              <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
                80% OFF
              </div>
              <Image
                src="/youtube-banner.png"
                alt="Featured product banner"
                width={1200}
                height={600}
                className="w-full h-auto rounded-lg border"
                priority
              />
            </div>
          </div>

          {/* Title, paragraph and Join button below the banner - centered */}
          <div className="w-full px-5 max-w-4xl mt-6 text-center">
            <h3 className="text-3xl font-bold">YouTube Premium</h3>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Get the same premium experience paying less. Quick management, instant delivery
              and support when you need it.
            </p>
            <p className="text-sm text-[#1f2937] mt-2">
              Make sure you&apos;re in our Discord server to make the purchase.
            </p>
            <div className="mt-5">
              <Button className="text-lg px-6 py-5 bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="https://discord.gg/4rsNDUhApJ" target="_blank" rel="noreferrer">
                  <Icons.discord className="h-5 w-5 mr-2" />
                  Join community
                </Link>
              </Button>
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


