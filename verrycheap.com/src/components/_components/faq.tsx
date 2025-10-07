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
    title: "What makes Origin UI different?",
    content:
      "Origin UI focuses on developer experience and performance. Built with TypeScript, it offers excellent type safety, follows accessibility standards, and provides comprehensive documentation with regular updates.",
  },
  {
    id: "2",
    title: "How can I customize the components?",
    content:
      "Use our CSS variables for global styling, or className and style props for component-specific changes. We support CSS modules, Tailwind, and dark mode out of the box.",
  },
  {
    id: "3",
    title: "Is Origin UI optimized for performance?",
    content:
      "Yes, with tree-shaking, code splitting, and minimal runtime overhead. Most components are under 5KB gzipped.",
  },
  {
    id: "4",
    title: "How accessible are the components?",
    content:
      "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
  },
  {
    id: "5",
    title: "How accessible are the components?",
    content:
      "All components follow WAI-ARIA standards, featuring proper ARIA attributes, keyboard navigation, and screen reader support. Regular testing ensures compatibility with NVDA, VoiceOver, and JAWS.",
  },
];

// Renderizado del acordeón se hará dentro de Unknows()

export default function Unknows() {
  return (
    <div className="h-auto pb-10 w-full relative">
      <div className="w-full mt-10 pt-10 flex flex-col items-center justify-center relative z-20">
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-blue-800 font-semibold text-base">FAQs</h1>
          <h2 className="text-black text-2xl font-bold ">
            just in case you&apos;re still not sure
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
