import { Header } from "@/components/_components/header";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="min-h-screen w-full bg-[#f9fafb] relative">
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
      </div>
    </div>
  );
}
