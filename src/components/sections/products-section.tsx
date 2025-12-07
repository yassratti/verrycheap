"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icons } from "../_components/icons";
import ProductsContent from "../_components/products-content";
/**
 * Products section component with its own header and content
 * You can customize the header with action buttons specific to products
 */

export function ProductsSection() {
  return (
    <>
      <div>
        {/* Header específico para la sección de Products */}
        <header className="flex h-12 shrink-0 items-center gap-2 border-b">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <p className="text-sm">Products</p>

            {/* Botones de acción específicos para Products */}
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" className="cursor-pointer">
                <Icons.plus className="mr-1 h-4 w-4" />
                Add Product
              </Button>
            </div>
          </div>
        </header>
        <ProductsContent />
      </div>
    </>
  );
}
