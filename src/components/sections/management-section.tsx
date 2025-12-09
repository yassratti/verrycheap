"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

/**
 * management section component with its own header and content
 * You can customize the header with action buttons specific to management
 */
export function ManagementSection() {
  return (
    <>
      {/* Header específico para la sección de management */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex w-full items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Seller Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Management</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

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
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="bg-muted/50 flex min-h-[100vh] flex-1 items-center justify-center rounded-xl md:min-h-min">
          <p className="text-muted-foreground text-lg">
            Management Section - Configure your preferences
          </p>
        </div>
      </div>
    </>
  );
}
