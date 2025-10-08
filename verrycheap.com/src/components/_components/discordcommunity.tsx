"use client";
import { WobbleCard } from "../ui/wobble-card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icons } from "../icons/icons";
export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[450px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Signup for blazing-fast cutting-edge state of the art Gippity AI
            wrapper today!
          </h2>
          {/* <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p> */}
          <div className="mt-6">
            <Button className="bg-white text-black font-bold" asChild size="lg">
              <Link
                prefetch={false}
                href="https://discord.gg/your-invite"
                target="_blank"
                rel="noreferrer"
              >
                <Icons.discord className="text h-7 w-7" />
                Join community
              </Link>
            </Button>
          </div>
        </div>
        <img
          src="/discord-banner.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}

export default function DiscordCommunity() {
  return (
    <div className="w-full h-auto pt-10 pb-5  relative px-4">
      <div></div>
      <WobbleCardDemo />
    </div>
  );
}
