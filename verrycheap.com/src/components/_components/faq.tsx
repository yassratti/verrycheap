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
    title: "Is this legal?",
    content:
      "Yes. We don’t sell hacked or shared accounts  we simply help you purchase subscriptions from regions where prices are lower due to local pricing policies. You get your own access, legally and safely.",
  },
  {
    id: "2",
    title: "Will I get the same service as usual?",
    content: `
      Absolutely.
It’s the exact same plan, same features, and same experience you’d have if you paid full price in your country the only difference is what you pay.
      `,
  },
  {
    id: "3",
    title: "How do I know my account is safe?",
    content: `Your privacy comes first.
We never ask for your personal passwords, and all transactions are handled securely through trusted payment systems.
No risks, no hidden tricks.`,
  },
  {
    id: "4",
    title: "What happens if something goes wrong?",
    content: `
      We’ve got you covered.
If your subscription doesn’t work or you have any issues, our team will fix it or refund you — no questions asked.
      `,
  },
  {
    id: "5",
    title: "How do I get my premium plan?",
    content: `
    There are two ways to do it. We can create a completely new account for you, activate the premium plan, and then send you the login details so you can change the password and any info you want. Or, if you prefer, you can give us access to your existing account we’ll only activate the plan, and once it’s done, you can update all your details right after. Either way, your account stays fully yours.
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
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-2"
            defaultValue="3"
          >
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
