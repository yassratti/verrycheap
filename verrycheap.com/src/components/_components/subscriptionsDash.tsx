import Image from "next/image";
import { Button } from "../ui/button";

const platforms = [
  {
    imageSrc: "/youtube-banner.png",
    imageAlt: "YouTube Premium",
    discount: "80% OFF",
    title: "YouTube Premium",
    pricePerYear: 35,
    originalPrice: 168,
  },
  {
    imageSrc: "/spotify-banner.png",
    imageAlt: "Spotify Premium",
    discount: "85% OFF",
    title: "Spotify Premium",
    pricePerYear: 30,
    originalPrice: 168,
  },
  {
    imageSrc: "/crunchyroll-banner.png",
    imageAlt: "Crunchyroll MEGA FAN",
    discount: "95% OFF",
    title: "Crunchyroll MEGA FAN",
    pricePerYear: 30,
    originalPrice: 120,
  },
  {
    imageSrc: "/netflix-banner.png",
    imageAlt: "Netflix Premium",
    discount: "75% OFF",
    title: "Netflix Premium",
    pricePerYear: 100,
    originalPrice: 220,
  },
];

interface PlatformCardProps {
  imageSrc: string;
  imageAlt: string;
  discount: string;
  title: string;
  pricePerYear: number;
  originalPrice: number;
  onOpenHowItWorks: () => void;
}

function PlatformCard({
  imageSrc,
  imageAlt,
  discount,
  title,
  pricePerYear,
  originalPrice,
  onOpenHowItWorks,
}: PlatformCardProps) {
  return (
    <div className="w-full bg-white h-auto p-3 border border-gray-200 rounded-lg shadow-xs">
      <div className="relative">
        <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
          {discount}
        </div>
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg border"
        />
      </div>
      <div>
        <h2 className="text-xl font-semibold mt-2">{title}</h2>
      </div>
      <div className="flex justify-between mt-2">
        <p className="text-xl font-medium ">${pricePerYear}/yearly</p>
        <p className="text-xl font-medium text-[#737373] line-through">
          ${originalPrice}/year
        </p>
      </div>
      <div className="flex flex-col mt-5 gap-1">
        <Button className="text-lg p-5 bg-blue-600 hover:bg-blue-700">
          Purchase
        </Button>
        <Button className="text-lg p-5" variant="outline" onClick={onOpenHowItWorks}>
          How it works?
        </Button>
      </div>
    </div>
  );
}

interface SubscriptionsDashProps {
  onOpenHowItWorks: () => void;
}

export default function SubscriptionsDash({ onOpenHowItWorks }: SubscriptionsDashProps) {
  return (
    <div className="min-h-screen pb-10 w-full relative">
      <div className="w-full mt-10 pt-10 flex flex-col items-center justify-center relative z-20">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-blue-800 font-semibold text-base">
            Subscriptions
          </h1>
          <h2 className="text-black text-2xl font-bold ">
            Same apps, smaller bill
          </h2>
        </div>

        <div className="w-full px-5 max-w-6xl">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {platforms.map((p) => (
              <PlatformCard key={p.title} {...p} onOpenHowItWorks={onOpenHowItWorks} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
