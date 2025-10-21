"use client";
import { useEffect, useState } from "react";
import Header from "@/components/_components/header";
import Faqs from "@/components/_components/faq";
import DiscordCommunity from "@/components/_components/discordcommunity";
import Product from "@/components/_components/product";

export default function ProductPage() {
  const [productData, setProductData] = useState({
    title: "YouTube Premium",
    price: "$44.99/yearly",
    originalPrice: "$168/year",
    discount: "80% OFF",
    imageSrc: "/youtube-banner.png",
    imageAlt: "YouTube Premium banner",
    purchaseLink: "https://buy.stripe.com/28E8wP0Ge5zP31Q7Jn3840e",
    deliveryInfo: "The delivery can be by email or through",
    discordLink: "https://discord.gg/4rsNDUhApJ"
  });

  useEffect(() => {
    // Leer los datos del producto desde localStorage
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      try {
        const parsedProduct = JSON.parse(savedProduct);
        // Mapear los datos del carrusel a los datos del componente Product
        setProductData({
          title: parsedProduct.title,
          price: parsedProduct.price,
          originalPrice: parsedProduct.originalPrice,
          discount: parsedProduct.discount,
          imageSrc: parsedProduct.imageSrc,
          imageAlt: parsedProduct.imageAlt,
          purchaseLink: getPurchaseLink(parsedProduct.title), // Función para obtener el enlace correcto
          deliveryInfo: "The delivery can be by email or through",
          discordLink: "https://discord.gg/4rsNDUhApJ"
        });
      } catch (error) {
        console.error('Error parsing product data:', error);
      }
    }
  }, []);

  // Función para obtener el enlace de compra correcto según el producto
  const getPurchaseLink = (title: string) => {
    switch (title) {
      case "YouTube Premium":
        return "https://buy.stripe.com/28E8wP0Ge5zP31Q7Jn3840e";
      case "Spotify Premium":
        return "https://buy.stripe.com/spotify-link"; // Reemplazar con el enlace real
      case "Crunchyroll MEGA FAN":
        return "https://buy.stripe.com/crunchyroll-link"; // Reemplazar con el enlace real
      case "Netflix Premium":
        return "https://buy.stripe.com/netflix-link"; // Reemplazar con el enlace real
      default:
        return "https://buy.stripe.com/28E8wP0Ge5zP31Q7Jn3840e";
    }
  };

  return (
    <div className="w-screen min-h-screen">
      <div className="h-auto pt-10 w-full bg-[#f9fafb] relative">
        <Header />

        <Product
          title={productData.title}
          price={productData.price}
          originalPrice={productData.originalPrice}
          discount={productData.discount}
          imageSrc={productData.imageSrc}
          imageAlt={productData.imageAlt}
          purchaseLink={productData.purchaseLink}
          deliveryInfo={productData.deliveryInfo}
          discordLink={productData.discordLink}
        />

        <Faqs />
        <DiscordCommunity />

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
