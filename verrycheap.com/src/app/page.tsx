import { Header } from "@/components/_components/header";

import Hero from "@/components/_components/hero";
import Unknows from "@/components/_components/unknown";
import Carousel from "@/components/_components/carousel";
export default function Home() {
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
        <Carousel />
        <Unknows />
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
