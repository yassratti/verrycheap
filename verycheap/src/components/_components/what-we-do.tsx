import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Whatwedo() {
  return (
    <div className="h-auto pb-16 bg-[#EEF1FA] w-full relative">
      {/* Gradiente blanco en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10" />

      <div className="container mx-auto max-w-7xl mt-10 pt-10 flex flex-col items-center justify-center relative z-20">
        <div className="text-center space-y-4 mb-12 max-w-4xl">
          <h1 className="text-blue-800 font-semibold text-lg md:text-xl">
            What we do?
          </h1>
          <h2 className="text-black text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
            This is what we do to get the same service but 75% cheaper
          </h2>
        </div>

        {/* Imagen del mapa regional */}
        <div className="w-full max-w-5xl px-4 mx-auto">
          <Image
            src="/regional-map.png"
            alt="Regional pricing map"
            width={1200}
            height={900}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="w-full max-w-4xl pt-12 px-6 text-center">
          <p className="text-gray-600 text-lg md:text-xl lg:text-2xl leading-relaxed">
            Subscription prices vary around the world. We simply connect you
            with the most affordable regions, giving you full access to premium
            services at local prices
          </p>
        </div>

        {/* Botón Purchase */}
        <div className="w-full max-w-4xl pt-10 px-4 flex justify-center">
          <Link href="/products" prefetch={false}>
            <Button className="text-lg md:text-xl p-6 px-8 bg-blue-600 hover:bg-blue-700 transform hover:scale-105 transition-transform duration-200">
              Get your premium
            </Button>
          </Link>
        </div>
      </div>

      {/* Gradiente blanco corto en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent z-10" />
    </div>
  );
}
