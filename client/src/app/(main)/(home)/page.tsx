import BreadCrumb from "@/components/BreadCrumb";
import MaxWidth from "@/components/MaxWidth";
import Product from "@/components/Product";
import Products from "@/components/store/ProductReel";
import WithNavigation from "@/components/store/navigation/Navigation";
import { buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function Page({}: Props) {
  const categories = ["All", "Magazine", "Novel"];
  const lastChild = categories.length;
  return (
    <>
      <div className="h-[60vh] w-full  relative">
        <Image src="/slider/3.jpg" className="object-cover" fill alt="" />
      </div>
      {/* 
      

      <MaxWidth>
        <div className="border-y h-10 w-full my-4 flex items-center space-x-3">
          <ul className=" flex">
            {categories.map((link, i) => (
              <>
                <li key={link} className="flex items-center">
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      className: "text-primary/60",
                    })}
                    href="/"
                  >
                    {link}
                  </Link>
                  {i != categories.length - 1 ? (
                    <div className="h-[20%] w-px bg-border" />
                  ) : null}
                </li>
              </>
            ))}
          </ul>
        </div>
      </MaxWidth>
      <Products />

      <MaxWidth>
        <div className="h-screen w-full flex items-center">
          <div className="">
            <div className="h-10 w-20 bg-primary text-background">primary</div>
            <div className="h-10 w-20 bg-primary-foreground text-background">
              p-foreg
            </div>
            <div className="h-10 w-20 bg-secondary text-background">sec</div>
            <div className="h-10 w-20 bg-secondary-foreground text-background">
              sec-for
            </div>
          </div>
        </div>
      </MaxWidth> */}
    </>
  );
}

export default Page;

// " "
