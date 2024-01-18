"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  category?: string;
  isAdmin?: boolean;
  products: number[];
};

function Products({ category, isAdmin, products }: Props) {
  return (
    <div>
      {category && (
        <div className="p-4">
          <h3 className="text-lg font-medium text-primary/70 capitalize">
            {category}
          </h3>
        </div>
      )}
      <div className="grid gap-4 sm:grid-cols-2  lg:grid-cols-3 px-4 pb-6">
        {products.map((item) => (
          <div
            key={item}
            className="bg-muted/40 border border-border/10 h-[60vh] flex relative items-center justify-center w-full"
          >
            <div className="space-y-5">
              <Link href={"/shop/category/product"}>
                <div className="hover:cursor-pointer relative border border-border/10 aspect-[1/1.2] w-full max-w-sm">
                  <Image
                    fill
                    src="/pin/2.jpg"
                    alt=""
                    className="object-cover rounded-sm"
                  />
                </div>
              </Link>
              <div className="flex flex-col items-center">
                <h3 className="font-semibold text-base text-primary/70">
                  Klinfolk
                </h3>
                <p className="text-sm text-primary/40">
                  Issue 31 -Architecture
                </p>
                <h4 className="text-base text-primary/60">$16.99</h4>
              </div>
            </div>
            <div className="absolute top-px right-px text-background p-2 bg-stone-400/50 backdrop-blur-3xl">
              <p className="text-sm">10% OFF</p>
            </div>
          </div>
        ))}

        {isAdmin && (
          <div className="bg-muted/10 border border-border/10 h-[60vh] flex relative items-center justify-center w-full">
            <div className="space-y-5 bg-muted/40 relatives w-full flex flex-col items-center">
              <div className="absolute z-50 inset-1/2 flex items-center justify-center">
                <div className="">
                  <Link href={`/author/create`} className={buttonVariants()}>
                    Submit a Publication
                  </Link>
                </div>
              </div>
              <div className="border opacity-0 bg-muted/60 rounded border-b  max-w-[8rem] flex items-center justify-center aspect-[1/1.2] w-full ">
                {/* <ImageIcon className="h-6 w-6" /> */}
              </div>

              <div className="flex flex-col opacity-0 items-center space-y-0.5">
                <div className="font-semibold text-base bg-muted/60 rounded border-b border">
                  <p className="text-muted/20 text-base leading-none">
                    Klinfolk
                  </p>
                </div>
                <div className="font-semibold text-base bg-muted/60 rounded border-b border">
                  <p className="text-muted/20 text-sm leading-none">
                    Issue 31 -Architecture
                  </p>
                </div>
                <div className="font-semibold text-base bg-muted/60 rounded border-b border">
                  <p className=" leading-none text-muted/20">$9,99</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
