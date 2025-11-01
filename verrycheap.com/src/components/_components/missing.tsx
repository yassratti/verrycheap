import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { ProductData } from "@/types/product";
import { useRouter } from "next/navigation";
const platforms = [
  {
    imageSrc: "/youtube-banner.png",
    imageAlt: "YouTube Premium",
    discount: "80% OFF",
    title: "YouTube Premium",
    pricePerYear: 44.99,
    originalPrice: 168,
  },
  {
    imageSrc: "/spotify-banner.png",
    imageAlt: "Spotify Premium",
    discount: "85% OFF",
    title: "Spotify Premium",
    pricePerYear: 39.99,
    originalPrice: 145,
  },
  {
    imageSrc: "/netflix-banner.png",
    imageAlt: "Netflix Premium",
    discount: "75% OFF",
    title: "Netflix Premium",
    pricePerYear: 159.99,
    originalPrice: 300,
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
  onPurchase: (productData: ProductData) => void;
  onAdd: () => void;
}
function PlatformCard({
  imageSrc,
  imageAlt,
  discount,
  title,
  pricePerYear,
  originalPrice,
  onOpenHowItWorks,
  onPurchase,
  onAdd,
}: PlatformCardProps) {
  return (
    <div className="w-full bg-white h-auto  p-3   rounded-lg shadow-xs relative">
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center rounded-lg p-4 backdrop-blur-md bg-white/20`}
      >
        <Button
          variant="outline"
          className="bg-white  sm:text-xl sm:px-8 sm:py-4 text-black cursor-pointer"
          onClick={onAdd}
        >
          Add
        </Button>
      </div>
      <div className="relative">
        {/* <div className="absolute top-2 left-2 bg-white px-3 py-1 font-bold border text-black rounded-lg z-10">
          {discount}
        </div> */}
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
        <Button
          className="text-lg p-5 bg-blue-600 hover:bg-blue-700"
          onClick={() =>
            onPurchase({
              title,
              price: `$${pricePerYear}/yearly`,
              originalPrice: `$${originalPrice}/year`,
              discount,
              imageSrc,
              imageAlt,
              pricePerYear,
              originalPriceValue: originalPrice,
            })
          }
        >
          Purchase
        </Button>
        <Button
          className="text-lg p-5"
          variant="outline"
          onClick={onOpenHowItWorks}
        >
          How it works?
        </Button>
      </div>
    </div>
  );
}

interface SubscriptionsDashProps {
  onOpenHowItWorks: () => void;
  onPurchase?: (productData: ProductData) => void;
}

export default function Missing({
  onOpenHowItWorks,
  onPurchase,
}: SubscriptionsDashProps) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [subscriptionsText, setSubscriptionsText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handlePurchase = (productData: ProductData) => {
    // If parent provided a custom onPurchase handler, use it.
    if (onPurchase) return onPurchase(productData);

    // Default behavior: store selected product and navigate to product page
    try {
      localStorage.setItem("selectedProduct", JSON.stringify(productData));
    } catch (e) {
      // ignore localStorage errors
    }
    router.push("/product");
  };
  return (
    <div className="h-auto pb-10   relative">
      <div className="w-full mt-10 pt-10 flex flex-col  items-center justify-center relative z-20">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-blue-800 font-semibold text-base">suggest</h1>
          <h2 className="text-black text-2xl font-bold ">
            Are your favorite subscription missing?
          </h2>
        </div>

        <div className="w-full  px-5 sm:px-16  sm:max-w-7xl lg:w-full">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 ">
            {platforms.map((p) => (
              <PlatformCard
                key={p.title}
                {...p}
                onOpenHowItWorks={onOpenHowItWorks}
                onPurchase={handlePurchase}
                onAdd={() => setShowForm(true)}
              />
            ))}
          </div>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50 p-4">
          <Card className="w-full max-w-md bg-white">
            <CardHeader>
              <CardTitle>Add subscriptions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorMsg && (
                <div className="text-sm text-red-600">{errorMsg}</div>
              )}
              {successMsg && (
                <div className="text-sm text-green-600">{successMsg}</div>
              )}
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Email {"(optional)"}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="to let you know once it’s available"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Desired subscriptions
                </label>
                <textarea
                  value={subscriptionsText}
                  onChange={(e) => setSubscriptionsText(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., YouTube Premium, Spotify Premium, Netflix Premium"
                />
              </div>
            </CardContent>
            <CardFooter className="gap-2 justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowForm(false);
                  setIsSubmitting(false);
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isSubmitting}
                onClick={async () => {
                  setErrorMsg(null);
                  setSuccessMsg(null);
                  if (!subscriptionsText.trim()) {
                    setErrorMsg("Please enter desired subscriptions.");
                    return;
                  }
                  try {
                    setIsSubmitting(true);
                    const resp = await fetch("/api/submit-subscriptions", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        email,
                        subscriptions: subscriptionsText,
                      }),
                    });
                    const data = await resp.json().catch(() => ({}));
                    if (!resp.ok) {
                      throw new Error(data?.error || "Unexpected error");
                    }
                    setSuccessMsg("Submitted successfully!");
                    setEmail("");
                    setSubscriptionsText("");
                    // Close after a brief delay
                    setTimeout(() => {
                      setShowForm(false);
                      setSuccessMsg(null);
                    }, 800);
                  } catch (e: unknown) {
                    let message = "Failed to submit. Please try again.";
                    if (e instanceof Error) {
                      message = e.message;
                    } else if (typeof e === "string") {
                      message = e;
                    }
                    setErrorMsg(message);
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
