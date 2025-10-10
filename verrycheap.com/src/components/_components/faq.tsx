"use client";
import { PlusIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items: { id: string; title: string; content: string }[] = [
  {
    id: "1",
    title: "What is VeryCheap?",
    content:
      "VeryCheap makes it easy to get subscriptions from regions where they cost less",
  },
  {
    id: "2",
    title: "Is this legal?",
    content: `
      Yes, it’s completely legal. We simply take advantage of the regional pricing that platforms already set
      `,
  },
  {
    id: "3",
    title: "How do I get the premium plan?",
    content: `You can choose: we can create a new account with the plan active, or use your account to pay for it in a cheaper region`,
  },
  {
    id: "4",
    title: "What happens if something goes wrong?",
    content: `
      We’ll fix it as quickly as possible, or refund you if it can’t be resolved.
      `,
  },
  {
    id: "5",
    title: "Will I get the same service?",
    content: `
    Exactly the same. The only difference is the country from which the subscription is paid.
     `,
  },
];

// Renderizado del acordeón se hará dentro de Unknows()

export default function Faqs() {
  return (
    <div className="h-auto pb-10 w-full relative">
      <div className="w-full mt-10 pt-10 flex flex-col items-center justify-center relative z-20">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-blue-800 font-semibold text-base">FAQs</h1>
          <h2 className="text-black text-2xl font-bold ">
            Still got questions? We&apos;ve got answers
          </h2>
        </div>

        <div className="w-full max-w-3xl px-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {items.map((item) => (
              <AccordionItem
                value={item.id}
                key={item.id}
                className="bg-background rounded-md border px-4 py-1 outline-none last:border-b focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50"
              >
                <AccordionTrigger className="focus-visible:ring-0 flex w-full items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none [&>svg>path:last-child]:origin-center [&>svg>path:last-child]:transition-all [&>svg>path:last-child]:duration-200 data-[state=open]:[&>svg]:rotate-180">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-2">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
