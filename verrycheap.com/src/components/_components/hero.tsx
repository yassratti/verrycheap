import { Highlighter } from "@/components/ui/highlighter";
import { ShimmerButton } from "../ui/shimmer-button";

import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import IntegrationsSection from "../ui/integrations-6";
export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex  items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-md text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-3 py-1  transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="sm:text-lg">🎁 Introducing Magic UI</span>
        </AnimatedShinyText>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <div className="w-full relative  pt-16 lg:pt-20 ">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full pt-15  ">
        <div className="w-full text-center flex flex-col gap-3  ">
          <AnimatedShinyTextDemo />
          <div className="w-full flex flex-col gap-6 sm:gap-10">
            <div className="mt-4 flex flex-col gap-6 sm:gap-5 text-center">
              <h1 className="text-4xl sm:text-5xl font-black flex flex-col gap-2">
                {/* <span>Stop paying more</span>
                <span>
                  for the same thing
                  {/* <Highlighter action="highlight" color="#818cf8">
                    <p className="text-white">same thing</p>
                  </Highlighter> */}
                <span>Premium shouldn’t mean pricey</span>
              </h1>
              <p className="text-[#737373] text-md sm:text-lg">
                Why pay full price? Access the exact same subscription and cut
                your bill by up to 85% simple, secure, and trustworthy
              </p>
            </div>
            <div className="w-full flex items-center justify-center ">
              <ShimmerButton className="rounded-lg">
                All subscriptions
              </ShimmerButton>
            </div>
          </div>
          <IntegrationsSection />
        </div>
      </div>
    </div>
  );
}
