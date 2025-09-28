import { Gemini, Replit, GooglePaLM } from "@/components/logos";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function IntegrationsSection() {
  return (
    <section>
      <div className=" dark:bg-background py-14 md:py-32">
        <div className="mx-auto max-w-5xl px-0">
          <div className="mx-auto max-w-md px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
            <div className="bg-background dark:bg-muted/50 rounded-xl border px-6 pb-12 pt-3 shadow-xl">
              <Integration
                icon={<Gemini />}
                name="Youtube Individual"
                description="The AI model that powers Google's search engine."
              />
              <Integration
                icon={<Replit />}
                name="Netflix Premium"
                description="The AI model that powers Google's search engine."
              />
              <Integration
                icon={<GooglePaLM />}
                name="Spotify Individual"
                description="The AI model that powers Google's search engine."
              />
            </div>
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
}: {
  icon: React.ReactNode;
  name: string;
  description: string;
}) => {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-dashed py-3 last:border-b-0">
      <div className="bg-muted border-foreground/5 flex size-12 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <div className="space-y-0.5">
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-muted-foreground line-clamp-1 text-sm">
          {description}
        </p>
      </div>
      <Button variant="outline" size="icon" aria-label="Add integration">
        <Plus className="size-4" />
      </Button>
    </div>
  );
};
