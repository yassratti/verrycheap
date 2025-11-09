"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/_components/header";
import Faqs from "@/components/_components/faq";
import DiscordCommunity from "@/components/_components/discordcommunity";
import Product, { ProductVariant } from "@/components/_components/product";
import { getProductBySlug } from "@/lib/products";

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productSlug = params.product as string;
  
  const [productData, setProductData] = useState({
    title: "YouTube Premium",
    price: "$44.99/yearly",
    originalPrice: "$168/year",
    discount: "75% OFF",
    imageSrc: "/youtube-banner.png",
    imageAlt: "YouTube Premium banner",
    purchaseLink: "https://buy.stripe.com/28E8wP0Ge5zP31Q7Jn3840e",
    deliveryInfo: "The delivery can be by email or through",
    discordLink: "https://discord.gg/4rsNDUhApJ",
    variants: undefined as ProductVariant[] | undefined,
  });

  useEffect(() => {
    // Try to get product from URL slug first
    if (productSlug) {
      const product = getProductBySlug(productSlug);
      if (product) {
        // Convert variants to ProductVariant format if they exist
        const variants: ProductVariant[] | undefined = product.variants?.map((variant) => {
          const titleLower = variant.title.toLowerCase();
          const isMonthly = titleLower.includes("mensual") || titleLower.includes("monthly");
          return {
            title: variant.title,
            price: isMonthly ? `$${variant.pricePerYear}/month` : `$${variant.pricePerYear}/yearly`,
            originalPrice: isMonthly ? `$${variant.originalPrice}/month` : `$${variant.originalPrice}/year`,
            discount: variant.discount,
            purchaseLink: variant.purchaseLink,
          };
        });

        setProductData({
          title: product.title,
          price: `$${product.pricePerYear}/yearly`,
          originalPrice: `$${product.originalPrice}/year`,
          discount: product.discount,
          imageSrc: product.imageSrc,
          imageAlt: product.imageAlt,
          purchaseLink: product.purchaseLink,
          deliveryInfo: "The delivery can be by email or through",
          discordLink: "https://discord.gg/4rsNDUhApJ",
          variants,
        });
        return;
      }
    }

    // Fallback: Try to read from localStorage (for backwards compatibility)
    const savedProduct = localStorage.getItem("selectedProduct");
    if (savedProduct) {
      try {
        const parsedProduct = JSON.parse(savedProduct);
        // Try to find product by title
        const product = getProductBySlug(parsedProduct.title);
        
        if (product) {
          setProductData({
            title: product.title,
            price: `$${product.pricePerYear}/yearly`,
            originalPrice: `$${product.originalPrice}/year`,
            discount: product.discount,
            imageSrc: product.imageSrc,
            imageAlt: product.imageAlt,
            purchaseLink: product.purchaseLink,
            deliveryInfo: "The delivery can be by email or through",
            discordLink: "https://discord.gg/4rsNDUhApJ",
            variants: undefined,
          });
        } else {
          // Fallback to parsed data if product not found in config
          setProductData({
            title: parsedProduct.title,
            price: parsedProduct.price,
            originalPrice: parsedProduct.originalPrice,
            discount: parsedProduct.discount || "",
            imageSrc: parsedProduct.imageSrc || "/youtube-banner.png",
            imageAlt: parsedProduct.imageAlt || parsedProduct.title,
            purchaseLink: getPurchaseLink(parsedProduct.title),
            deliveryInfo: "The delivery can be by email or through",
            discordLink: "https://discord.gg/4rsNDUhApJ",
            variants: undefined,
          });
        }
      } catch (error) {
        console.error("Error parsing product data:", error);
      }
    }
  }, [productSlug]);

  // Fallback function for purchase links (if product not in config)
  const getPurchaseLink = (title: string) => {
    const product = getProductBySlug(title);
    if (product) return product.purchaseLink;
    
    // Legacy fallback (shouldn't be needed if all products are in config)
    return "https://buy.stripe.com/28E8wP0Ge5zP31Q7Jn3840e";
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
          variants={productData.variants}
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
