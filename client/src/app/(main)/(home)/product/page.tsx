"use client";
import BreadCrumb from "@/components/BreadCrumb";
import MaxWidth from "@/components/MaxWidth";
import Products from "@/components/store/ProductReel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";
// import { HeartIcon } from "@radix-ui/react-icons";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  const breadCrumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "product",
      href: "/",
    },
    {
      label: "things fall apart",
      href: "/",
    },
  ];

  return (
    <>
      <BreadCrumb breadCrumbs={breadCrumbs} />

      <MaxWidth>
        <section className="lg:flex min-h-[80vh] lg:py-4 ">
          <div className="bg-muted/10 flex-1  sm:p-6 flex items-center justify-center">
            <div className="w-full  lg:w-1/2 border">
              <AspectRatio ratio={2.5 / 3} className="relative w-full">
                <Image
                  src="/images/3.jpg"
                  className="object-cover md:shadow-md shadow-slate-600"
                  alt=""
                  fill
                />
              </AspectRatio>
            </div>
          </div>
          <div className="flex-1 px-4 sm:p-6 lg:p-8 divide-y divide-border/30">
            <div className="w-full lg:w-fit py-4">
              <div className="pb-4">
                <h3 className="capitalize text-xl font-medium sm:text-2xl pb-1">
                  things fall apart and your friends for real
                </h3>
                <p className="capitalize text-sm lg:text-base text-muted-foreground">
                  chinu Achebe
                </p>
                <p className="capitalize text-base lg:text-base font-medium text-foreground">
                  $16.99
                </p>
              </div>

              <div className="w-full pb-4">
                <Button
                  onClick={() => router.push("/bag")}
                  className="w-full rounded-none "
                >
                  ADD TO BAG
                </Button>
              </div>
            </div>
            <div className="py-4">
              <p className="text-muted-foreground text-sm items-center flex space-x-1.5">
                <div className="h-1 w-1 rounded-full bg-orange-600" />{" "}
                <span className="text-orange-600">
                  {" "}
                  Delivery to 28 countries
                </span>
              </p>
            </div>
            <div className="py-4">
              <ScrollArea className="md:h-[40vh]">
                <div className="text-muted-foreground text-sm">
                  <p className="pb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi eius cumque eos distinctio. Totam, eaque vero
                    fugit velit nesciunt eius itaque, vitae ipsam culpa maxime
                    iste magnam suscipit voluptatum accusamus!
                  </p>
                  <p className="pb-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi eius cumque eos distinctio. Totam, eaque vero
                    fugit velit nesciunt eius itaque, vitae ipsam culpa maxime
                    iste magnam suscipit voluptatum accusamus!
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Excepturi eius cumque eos distinctio. Totam, eaque vero
                    fugit velit nesciunt eius itaque, vitae ipsam culpa maxime
                    iste magnam suscipit voluptatum accusamus!
                  </p>
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>
      </MaxWidth>
      {/* <Products heading="Related Books" /> */}
    </>
  );
}

export default Page;
