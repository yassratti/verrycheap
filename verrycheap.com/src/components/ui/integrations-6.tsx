"use client";
import { Icons } from "../icons/icons";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useBreakpoint from "@/hooks/use-breakpoint";
import { Highlighter } from "@/components/ui/highlighter";
import { useRouter } from "next/navigation";

export default function IntegrationsSection() {
  const isSm = useBreakpoint();
  return (
    <section>
      <div className="dark:bg-background pt-5 sm:py-10 relative z-10">
        <div className="mx-auto max-w-5xl px-0">
          <div className="mx-auto max-w-md sm:max-w-3xl px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
            <div className="bg-background dark:bg-muted/50 rounded-xl border px-6 pb-5 sm:pb-3  pt-3 shadow-xl">
              <Integration
                icon={<Icons.youtube />}
                name="$3.74/monthly"
                description="Youtube Premium"
                productData={{
                  title: "YouTube Premium",
                  price: "$44.99/yearly",
                  originalPrice: "$168/year",
                  discount: "80% OFF",
                  imageSrc: "/youtube-banner.png",
                  imageAlt: "YouTube Premium",
                  pricePerYear: 44.99,
                  originalPriceValue: 168,
                }}
              />
              <Integration
                icon={<Icons.netflix />}
                name="$13,33/monthly"
                description="Netflix Premium"
                productData={{
                  title: "Netflix Premium",
                  price: "$159.99/yearly",
                  originalPrice: "$300/year",
                  discount: "75% OFF",
                  imageSrc: "/netflix-banner.png",
                  imageAlt: "Netflix Premium",
                  pricePerYear: 159.99,
                  originalPriceValue: 300,
                }}
              />
              <Integration
                icon={<Icons.spotify />}
                name="$3,33/monthly"
                description="Spotify Premium"
                productData={{
                  title: "Spotify Premium",
                  price: "$39.99/yearly",
                  originalPrice: "$145/year",
                  discount: "85% OFF",
                  imageSrc: "/spotify-banner.png",
                  imageAlt: "Spotify Premium",
                  pricePerYear: 39.99,
                  originalPriceValue: 145,
                }}
              />
              {isSm && (
                <>
                  <Integration
                    icon={<Icons.crunchyroll />}
                    name="$2,88/monthly"
                    description="Crunchyroll MEGA FAN"
                    productData={{
                      title: "Crunchyroll MEGA FAN",
                      price: "$29.99/yearly",
                      originalPrice: "$119.99/year",
                      discount: "95% OFF",
                      imageSrc: "/crunchyroll-banner.png",
                      imageAlt: "Crunchyroll MEGA FAN",
                      pricePerYear: 29.99,
                      originalPriceValue: 119.99,
                    }}
                  />
                </>
              )}
            </div>
          </div>
          <div className="mx-auto mt-3 max-w-lg space-y-2 text-center">
            <h2 className="text-balance text-2xl font-semibold md:text-4xl lg:text-5xl">
              Save up to{" "}
              <Highlighter action="box" color="#818cf8">
                75%
              </Highlighter>{" "}
              in the same services you love
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

const Integration = ({
  icon,
  name,
  description,
  productData,
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
  productData: {
    title: string;
    price: string;
    originalPrice: string;
    discount: string;
    imageSrc: string;
    imageAlt: string;
    pricePerYear: number;
    originalPriceValue: number;
  };
}) => {
  const router = useRouter();

  const handleClick = () => {
    try {
      localStorage.setItem("selectedProduct", JSON.stringify(productData));
      router.push("/product");
    } catch (e) {
      // ignore localStorage errors
      router.push("/product");
    }
  };

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-dashed py-3 last:border-b-0">
      <div className="bg-muted border-foreground/5 flex size-12 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <div className="space-y-0.5 text-start">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {description}
        </p>
      </div>
      <Button
        className="cursor-pointer"
        variant="outline"
        size="icon"
        aria-label="Add integration"
        onClick={handleClick}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
