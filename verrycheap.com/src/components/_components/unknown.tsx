import Image from "next/image";

export default function Unknows() {
  return (
    <div className="h-auto pb-10 bg-[#EEF1FA] w-full relative">
      {/* Gradiente blanco en la parte superior */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10" />

      <div className="w-full mt-10 pt-10 flex flex-col items-center justify-center relative z-20">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-blue-800 font-semibold text-base">What we do?</h1>
          <h2 className="text-black text-2xl font-bold ">
            This is what we do to get the same sub but 85% cheaper
          </h2>
        </div>
        
        {/* Imagen del mapa regional */}
        <div className="w-full  px-1">
          <Image
            src="/regional-map.png"
            alt="Regional pricing map"
            width={800}
            height={600}
            className="w-full h-auto"
            priority
          />
        </div>

        <div className="w-full max-w-4xl pt-10 px-4 text-center text-gray-400 text-lg">
          <p>
          it’s as simple as buying the subscription in a country where it’s cheaper due to regional pricing and getting the same service but at a much lower cost

          </p>
        </div>
      </div>
    </div>
  );
}
