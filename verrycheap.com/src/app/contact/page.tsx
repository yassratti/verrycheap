"use client";
import Header from "@/components/_components/header";
import { Icons } from "@/components/icons/icons";
import { Icon } from "lucide-react";
import Faqs from "@/components/_components/faq";
import DiscordCommunity from "@/components/_components/discordcommunity";
interface ContactMethodCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  contactInfo: string;
  onClick?: () => void;
  bgColor?: string;
}

function ContactMethodCard({
  icon,
  title,
  description,
  contactInfo,
  onClick,
  bgColor = "bg-blue-600",
}: ContactMethodCardProps) {
  return (
    <div
      className="p-5 border bg-white flex flex-col justify-start items-start gap-2 rounded-lg hover:shadow-lg transition-shadow duration-200 w-full"
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="flex items-center gap-2">
        <div
          className={`flex items-center    justify-center ${bgColor} w-10 h-10 rounded-lg`}
        >
          {icon}
        </div>
        <p className="text-lg font-medium">{title}</p>
      </div>
      <div>
        <p className="mt-4 text-lg font-medium text-gray-600">{description}</p>
      </div>
      <div className="flex items-center justify-between w-full mt-3">
        <p className="text-lg font-semibold">{contactInfo}</p>
        <Icons.chevronRight />
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <div className="w-full">
        <Header />
        <div className="w-full mt-30 flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-4 mb-12 max-w-4xl">
            <h1 className="text-blue-800 font-semibold text-lg md:text-xl">
              Contact page
            </h1>
            <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Contact us
            </h2>
          </div>
          <div className="w-full max-w-6xl pt-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ContactMethodCard
              icon={<Icons.email className="text-white" />}
              title="Email"
              description="Contact us via email, we will get back to you as soon as possible."
              contactInfo="verycheapteam@outlook.com"
              onClick={() =>
                (window.location.href = "mailto:verycheapteam@outlook.com")
              }
            />
            <ContactMethodCard
              icon={<Icons.discordWhite className="" />}
              title="Discord"
              description="Join our Discord community for instant support and updates."
              contactInfo="Discord"
              bgColor="bg-[#5865F2]"
              onClick={() =>
                window.open("https://discord.gg/4rsNDUhApJ", "_blank")
              }
            />
          </div>
          <Faqs />
          <DiscordCommunity />
        </div>
      </div>
    </>
  );
}
