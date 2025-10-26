import { ShimmerButton } from "../ui/shimmer-button";
import Link from "next/link";
import { Icons } from "../icons/icons";

import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import IntegrationsSection from "../ui/integrations-6";
export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex  items-center justify-center">
      <button
        onClick={() => window.open("https://discord.gg/4rsNDUhApJ", "_blank")}
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-md text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-3 py-1  transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="sm:text-lg flex items-center gap-2">
            <Icons.discord className="h-4 w-4" />
            join our discord community
          </span>
        </AnimatedShinyText>
      </button>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="w-full relative  pt-16 lg:pt-20 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full pt-15  ">
        <div className="w-full text-center flex flex-col gap-3  ">
          <div className="w-full flex flex-col gap-6 sm:gap-10">
            <AnimatedShinyTextDemo />
            <div className="mt-4 flex flex-col gap-6 sm:gap-5 text-center">
              <h1 className="text-4xl sm:text-6xl font-black flex flex-col gap-2">
                <span>Premium shouldn’t mean pricey</span>
              </h1>
              <p className="text-[#909090] text-lg sm:text-xl">
                Pay smart, save more, and still enjoy the same premium
                experience
              </p>
            </div>
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/products" prefetch={false}>
                <ShimmerButton className="rounded-lg px-6 py-3">
                  Check our prices
                </ShimmerButton>
              </Link>
            </div>
          </div>
          <IntegrationsSection />
        </div>
      </div>
    </div>
  );
}
