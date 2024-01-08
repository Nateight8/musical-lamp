import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div className="bg-background pt-14 px-4">
      <div className=" grid grid-cols-2 gap-px bg-border mx-auto max-w-7xl">
        <div className=" bg-background">
          {/* <div className="flex items-center justify-between p-4">
          <div className="">
            <h1 className="text-lg">Current Order</h1>
            <p className="text-sm text-muted-foreground">5 items in the cart</p>
          </div>
          <div className="">
            <Button variant={"secondary"}>Cancel Order</Button>
          </div>
        </div> */}
          <ScrollArea className="h-[70vh] w-full">
            <div className="p-4 space-y-2 ">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <ProductCart key={item} />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="p-4 flex justify-end flex-col  bg-background">
          <div className="border border-b-transparent p-4 rounded-lg">
            <Tab label="Gross Total" value="24,548.34" />
            <Tab label="Line Discount" value="-260" />
            <Tab label="Promo Discount" value="600" />
            <Tab label="Subtotal" value="23,240" />
          </div>
          <div
            style={{
              borderStyle: "dashed solid solid solid",
            }}
            className="flex items-center justify-between border p-4 rounded-lg"
          >
            <p className="">Total Payable</p>
            <p>23,240</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

function ProductCart() {
  return (
    <div className="w-full grid grid-cols-5 p-4 border-b">
      <div className="col-span-1 bg-[#f7f7f7] relative overflow-hidden border">
        <Image
          alt=""
          src={"/images/12.webp"}
          fill
          className="object-contain rounded-md"
        />
      </div>
      <div className=" col-start-2 col-span-full  p-4">
        <div className="space-y-2">
          <h1 className="text-lg">
            Nike Men&rsquo;s Sportwear V-Neck Adjustable T-Shirt, Small
          </h1>
          <div className="flex items-center space-x-2">
            <Badge variant={"outline"}>sku</Badge>{" "}
            <p className="text-xs text-muted-foreground">KS93538TUT</p>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-xl">$24,00.00</h4>
            <div className="flex space-x-2">
              <p className="">1</p>
              <Button
                size={"icon"}
                variant={"outline"}
                className="rounded-full"
              >
                <PlusIcon />
              </Button>
              <Button
                size={"icon"}
                variant={"outline"}
                className="rounded-full"
              >
                <MinusIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TabProps {
  label: string;
  value: string;
}

function Tab({ label, value }: TabProps) {
  return (
    <div className="py-1 flex items-center justify-between">
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
}
