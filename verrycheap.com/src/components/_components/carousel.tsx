"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

interface CarouselCardProps {
  imageSrc: string;
  imageAlt: string;
  discount: string;
  title: string;
  pricePerYear: number;
  originalPrice: number;
  onOpenHowItWorks: () => void;
}

function CarouselCard({
  imageSrc,
  imageAlt,
  discount,
  title,
  pricePerYear,
  originalPrice,
  onOpenHowItWorks,
}: CarouselCardProps) {
  return (
    <div className="flex-shrink-0 w-80 bg-white h-auto mx-4 p-3 border border-gray-200 rounded-lg shadow-lg">
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
        <Button className="text-lg p-5" onClick={onOpenHowItWorks}>How it works?</Button>
      </div>
    </div>
  );
}

interface CarouselProps {
  onOpenHowItWorks: () => void;
}

function Carousel({ onOpenHowItWorks }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  });

  // Autoplay con intervalo; no necesitamos exponer estado para el linter

  const autoplay = useCallback(() => {
    if (!emblaApi) return;
    
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext();
    } else {
      emblaApi.scrollTo(0);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(autoplay, 3000);
    // autoplay activo

    return () => {
      clearInterval(interval);
      // limpiar autoplay
    };
  }, [emblaApi, autoplay]);

  const carouselData = [
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

  // Duplicar los datos para crear un efecto de cinta infinita más suave
  const infiniteData = [...carouselData, ...carouselData, ...carouselData];

  return (
    <>
      <div className="w-screen mt-10 relative z-50 px-5 flex items-center justify-center">
        <div className="w-full max-w-6xl relative">
          {/* Gradiente izquierdo */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          
          {/* Gradiente derecho */}
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {infiniteData.map((item, index) => (
                <CarouselCard
                  key={`${item.title}-${index}`}
                  imageSrc={item.imageSrc}
                  imageAlt={item.imageAlt}
                  discount={item.discount}
                  title={item.title}
                  pricePerYear={item.pricePerYear}
                  originalPrice={item.originalPrice}
                  onOpenHowItWorks={onOpenHowItWorks}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Carousel;
