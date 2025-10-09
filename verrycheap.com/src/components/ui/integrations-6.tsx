"use client";
import { Gemini, Replit, GooglePaLM } from "@/components/logos";
import { Icons } from "../icons/icons";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import useBreakpoint from "@/hooks/use-breakpoint";
import { Highlighter } from "@/components/ui/highlighter";

export default function IntegrationsSection() {
  const isSm = useBreakpoint();
  return (
    <section>
      <div className=" dark:bg-background pt-5 sm:py-10 relative z-10">
        <div className="mx-auto max-w-5xl px-0">
          <div className="mx-auto max-w-md sm:max-w-xl px-6 [mask-image:radial-gradient(ellipse_100%_100%_at_50%_0%,#000_70%,transparent_100%)]">
            <div className="bg-background dark:bg-muted/50 rounded-xl border px-6 pb-5 sm:pb-3  pt-3 shadow-xl">
              <Integration
                icon={<Icons.youtube />}
                name="$2.99/m"
                description="Youtube Premium"
              />
              <Integration
                icon={<Icons.netflix />}
                name="$5.99/m"
                description="Netflix Premium"
              />
              <Integration
                icon={<Icons.spotify />}
                name="$2.49/m"
                description="Spotify Premium"
              />
              {isSm && (
                <>
                  <Integration
                    icon={<Gemini />}
                    name="Youtube Individual"
                    description="The AI model that powers Google's search engine."
                  />
                  <Integration
                    icon={<GooglePaLM />}
                    name="Spotify Individual"
                    description="The AI model that powers Google's search engine."
                  />
                </>
              )}
            </div>
          </div>
          <div className="mx-auto mt-3 max-w-lg space-y-2 text-center">
            <h2 className="text-balance text-2xl font-semibold md:text-4xl lg:text-5xl">
              Save up to{" "}
              <Highlighter action="box" color="#818cf8">
                85%
              </Highlighter>{" "}
              on the same thing
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
      <div className="space-y-0.5 text-start">
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
