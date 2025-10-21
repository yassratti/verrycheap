"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProductProps {
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  imageSrc: string;
  imageAlt: string;
  purchaseLink: string;
  deliveryInfo: string;
  discordLink: string;
}

export default function Product({
  title,
  price,
  originalPrice,
  discount,
  imageSrc,
  imageAlt,
  purchaseLink,
  deliveryInfo,
  discordLink,
}: ProductProps) {
  return (
    <div className="w-full mt-10 pt-6 flex flex-col items-center justify-center relative z-20">
      {/* Top heading section styled like FAQ header */}
      <div className="text-center space-y-3 mb-8 px-5 w-full">
        <h1 className="text-blue-800 font-semibold text-base">Purchase</h1>
        <h2 className="text-black text-2xl font-bold ">
          Purchase your premium plan, fast delivery
        </h2>
      </div>

      {/* Featured banner with discount badge - no background card */}
      <div className="w-full px-4 flex justify-center">
        <div className="relative max-w-5xl w-full">
          <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
            {discount}
          </div>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg"
            priority
          />
        </div>
      </div>

      {/* Purchase button below banner */}
      <div className="w-full px-4 flex justify-center flex-col items-center gap-3 mt-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold mt-2">{title}</h2>
          <div className="flex justify-between mt-2">
            <p className="text-xl font-medium">{price}</p>
            <p className="text-xl font-medium text-[#737373] line-through">
              {originalPrice}
            </p>
          </div>
        </div>

        <Button
          className="text-lg w-full px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          onClick={() => window.open(purchaseLink, "_blank")}
        >
          Purchase Now
        </Button>
        <p className="text-gray-400 text-sm">
          {deliveryInfo}{" "}
          <a
            href={discordLink}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-700"
          >
            Discord
          </a>
        </p>
      </div>
    </div>
  );
}
