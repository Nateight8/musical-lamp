"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { ProfilerProps, PropsWithChildren } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

type Props = {};

function Page({}: Props) {
  const products = [1, 2, 3];
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <div className="h-10 p-4">
        <h3 className="text-lg">{products.length}</h3>
      </div>
      <main className="w-full border-t lg:flex  divide-x divide-border/30">
        <div className="lg:h-screen flex-1">
          <ScrollArea className="w-full lg:h-[85vh]">
            <div className=" divide-y divide-border/30 border-b">
              {products.map((pdct) => (
                <li className=" w-full p-4 flex " key={pdct}>
                  <div className="p-4 bg-muted/10 border border-border/10 md:p-8">
                    <div className="w-16 sm:w-24 md:w-28 ">
                      <AspectRatio ratio={1 / 1.5} className="relative w-full">
                        <Image
                          src="/images/3.jpg"
                          className="object-cover shadow-md shadow-slate-600"
                          alt=""
                          fill
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="p-4 md:p-8 flex-1 flex flex-col justify-between">
                    <div className="w-full space-y-1">
                      <h3 className="font-semibold text-foreground/90 capitalize text-base md:text-lg">
                        Things fall apart
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Chinua Achebe
                      </p>
                      <p className="text-foreground/90 text-sm">$21.99</p>
                    </div>

                    <div className="flex justify-between">
                      <div className="space-x-2 flex border border-border/10">
                        <Button
                          className="h-8 rounded-none"
                          variant={"ghost"}
                          size={"icon"}
                        >
                          <PlusIcon className="h-4 w-4" />
                        </Button>
                        <div className="h-8 w-8 items-center justify-center flex">
                          <p className="text-muted-foreground text-base">1</p>
                        </div>
                        <Button
                          className="h-8 rounded-none"
                          variant={"ghost"}
                          size={"icon"}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="">
                        <Button
                          className="text-muted-foreground"
                          variant={"ghost"}
                          size={"sm"}
                        >
                          <TrashIcon className="h-4 w-4 mr-1" /> Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ScrollArea>
        </div>

        <section className="lg:flex-1 mt-6 lg:mt-0 divide-y divide-border/30 md:p-0">
          <SumaryInfo label="Subtotal" price="$34.00" />

          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full hover:bg-muted/10"
          >
            <CollapsibleTrigger asChild>
              <button className="p-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ">
                Do you have a discont code?
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent className="w-full pb-4 px-4 md:px-6">
              <div className="flex  w-full items-center space-x-2">
                <Input
                  className="rounded-none"
                  placeholder="Enter discount code"
                />
                <Button
                  variant={"outline"}
                  className="rounded-none"
                  type="submit"
                >
                  Apply
                </Button>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <SumaryInfo label="Estimated delivery" price="$7.99" />
          <SumaryInfo total label="TOTAL" price="48.99" />
          <div className="p-4 md:p-6  grid md:grid-cols-2 gap-4 ">
            <Button
              className="rounded-none md:block hidden"
              variant={"outline"}
            >
              Continue shopping
            </Button>
            <Button className="rounded-none">CHECKOUT</Button>
          </div>
          <div className="py-4 sm:p-4 grid sm:grid-cols-2 gap-4 border-b">
            <p className="text-muted-foreground text-sm items-center flex space-x-1.5">
              <div className="h-1 w-1 rounded-full bg-orange-600" />{" "}
              <span className="text-orange-600"> Delivery to 28 countries</span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

interface SumaryInfoProps {
  label: string;
  price: string;
  total?: boolean;
}

function SumaryInfo({ label, price, total }: SumaryInfoProps) {
  return (
    <div className="p-4 md:p-6 justify-between flex">
      <p
        className={cn("text-muted-foreground text-sm", {
          "text-base text-foreground font-medium": total,
        })}
      >
        {label}
      </p>
      <p
        className={cn("text-muted-foreground text-sm", {
          "text-base text-foreground font-medium": total,
        })}
      >
        {price}
      </p>
    </div>
  );
}

export default Page;
