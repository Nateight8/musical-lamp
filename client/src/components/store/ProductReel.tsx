"use client";

import Link from "next/link";
import Product from "./Product";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

type Props = {
  heading?: string;
};

export default function Products({ heading }: Props) {
  return (
    <div className="px-4 lg:px-10">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-3xl pb-4">
        {heading}
      </h1>
      <div className="w-full sm:grid-cols-2  lg:grid-cols-3 grid gap-6 ">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div
            key={item}
            className="border p-14 xl:p-24 bg-muted/30 border-border/10 flex items-center justify-center"
          >
            <div className="w-full">
              <Link href="/product" className="w-full">
                <AspectRatio ratio={2.5 / 3.5} className="w-full mb-8">
                  <Image
                    src="/images/3.jpg"
                    className="object-cover shadow-md hover:cursor-pointer shadow-slate-600"
                    alt=""
                    fill
                  />
                </AspectRatio>
              </Link>
              <div className="w-full flex flex-col items-center">
                <h3 className="capitalize text-base text-foreground/70 font-semibold text-center">
                  Things fall apart
                </h3>
                <p className="capitalize text-sm text-muted-foreground/70 text-center">
                  chinu achebe
                </p>
                <p className="text-sm text-center">$9.99</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Placeholder() {
  return (
    <>
      <>
        <div className="w-1/2">
          <AspectRatio ratio={2.5 / 3.5} className="w-full mb-8">
            <Skeleton className="w-full h-full" />
          </AspectRatio>
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton className="w-[10ch] h-2" />
            <Skeleton className="w-[8ch] h-2" />
            <Skeleton className="w-[6ch] h-2" />
          </div>
        </div>
      </>
    </>
  );
}
