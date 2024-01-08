import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  category?: string;
};

function Products({ category }: Props) {
  return (
    <div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-primary/70 capitalize">
          {category}
        </h3>
      </div>
      <div className="grid gap-4 sm:grid-cols-2  lg:grid-cols-3 px-4 pb-6">
        {[1, 2, 3, 4].map((item) => (
          <Link
            href={"/shop/category/product"}
            key={item}
            className="bg-muted/10 h-[60vh] flex relative items-center justify-center   w-full"
          >
            <div className="">
              <div className="w-44 md:w-52 h-64 md:h-72 border mb-6 relative shadow-md shadow-slate-600">
                <Image src="/pin/2.jpg" fill alt="" className="object-cover" />
              </div>
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
            <div className="absolute top-0 right-0 text-background p-2 bg-stone-400/50 backdrop-blur-3xl">
              <p className="text-sm">10% OFF</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
