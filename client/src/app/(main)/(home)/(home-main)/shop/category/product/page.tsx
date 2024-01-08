import React from "react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import AddToCart from "@/app/(main)/(home)/_components/AddToCart";

type Props = {};

function Page({}: Props) {
  return (
    <div className="lg:py-4 xl:py-6">
      <div className="lg:flex ">
        <div className="h-[60vh] lg:h-[80vh]  flex-1 w-full bg-muted/10 flex items-center justify-center">
          <div className="w-52 md:w-72  ">
            <AspectRatio ratio={1 / 1.5} className="relative w-full">
              <Image
                src="/pin/2.jpg"
                className="object-cover shadow-md shadow-slate-600"
                alt=""
                fill
              />
            </AspectRatio>
          </div>
        </div>
        <div className="pb-4 lg:p-6 flex-1 divide-y">
          <div className="p-4 lg:px-0 md:flex lg:block justify-between w-fit md:w-full">
            <div className="pb-4">
              <h3 className="text-2xl text-primary/80">Kinfolk</h3>
              <p className="text-base text-primary/40">
                Issue 31 -Architecture
              </p>
              <h3 className="text-lg text-primary/60 font-medium">$16,99</h3>
            </div>

            {/* ADD TO CART */}
            <AddToCart />
          </div>
          <div className="p-4 lg:px-0 flex items-center space-x-1.5">
            <div className="h-2 w-2 bg-stone-600 rounded-full" />
            <p className="text-stone-600 text-sm font-medium">
              Delivery to 28 countries
            </p>
          </div>
          <div className="space-y-4 p-4 lg:px-0 text-base text-primary/60">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              dolore, ex rem facere illum laborum atque voluptate dolorem? Ex
              repellendus eligendi provident obcaecati architecto eos minus quae
              rerum at impedit?
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              dolore, ex rem facere illum laborum atque voluptate dolorem? Ex
              repellendus eligendi provident obcaecati architecto eos minus quae
              rerum at impedit?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
