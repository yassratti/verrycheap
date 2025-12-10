"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

import { SectionCards } from "@/components/_components/_components/section-card";
import { ChartAreaInteractive } from "../_components/_components/chart-area-interactive";
import { DataTable } from "../_components/_components/data-table";

import data from "../_components/_components/data.json";
export function ManagementSection() {
  return (
    <>
      {/* Header específico para la sección de management */}
      <header className="flex h-12 shrink-0 items-center gap-2 border-b">
        <div className="flex w-full items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <p className="text-sm">Management</p>

          {/* Botones de acción específicos para management */}
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline">
              Reset
            </Button>
            <Button size="sm">
              <Save className="mr-1 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido de la sección management */}
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
