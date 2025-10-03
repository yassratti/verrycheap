import ScrollStack, { ScrollStackItem } from "../ScrollStack";
import Image from "next/image";
import { Button } from "../ui/button";

interface CarouselCardProps {
  imageSrc: string;
  imageAlt: string;
  discount: string;
  title: string;
  pricePerYear: number;
  originalPrice: number;
}

function CarouselCard({
  imageSrc,
  imageAlt,
  discount,
  title,
  pricePerYear,
  originalPrice,
}: CarouselCardProps) {
  return (
    <ScrollStackItem itemClassName="w-full bg-white w-full h-auto my-8 p-3 border border-gray-200">
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
        <Button className="text-lg p-5  bg-blue-600 hover:bg-blue-700">
          Purchase
        </Button>
        <Button className="text-lg p-5">How it works?</Button>
      </div>
    </ScrollStackItem>
  );
}

function Carousel() {
  return (
    <>
      <div className="w-screen h-screen relative z-50  px-10">
        <div className="w-full h-full  ">
          <ScrollStack className="w-full">
            <CarouselCard
              imageSrc="/youtube-banner.png"
              imageAlt="YouTube Premium"
              discount="80% OFF"
              title="YouTube Premium"
              pricePerYear={35}
              originalPrice={168}
            />
            <CarouselCard
              imageSrc="/spotify-banner.png"
              imageAlt="Spotify Premium"
              discount="85% OFF"
              title="Spotify Premium"
              pricePerYear={30}
              originalPrice={168}
            />
            <CarouselCard
              imageSrc="/crunchyroll-banner.png"
              imageAlt="Crunchyroll MEGA FAN"
              discount="95% OFF"
              title="Crunchyroll MEGA FAN"
              pricePerYear={30}
              originalPrice={120}
            />
            <CarouselCard
              imageSrc="/netflix-banner.png"
              imageAlt="Netflix Premium"
              discount="75% OFF"
              title="Netflix Premium"
              pricePerYear={100}
              originalPrice={220}
            />
          </ScrollStack>
        </div>
      </div>
    </>
  );
}
export default Carousel;
