"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Icons } from "../_components/icons";
import ProductsContent from "../_components/products-content";
import { AddProduct } from "../_components/products-content";



export function ProductsSection() {
  return (
    <>
      <div>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b">
          <div className="flex w-full items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <p className="text-sm">Products</p>

            <div className="ml-auto flex items-center gap-2">
              <AddProduct
                trigger={
                  <Button size="sm" className="cursor-pointer">
                    <Icons.plus className="mr-1 h-4 w-4" />
                    Add Product
                  </Button>
                }
              />
            </div>
          </div>
        </header>
        <ProductsContent />
      </div>
    </>
  );
}
