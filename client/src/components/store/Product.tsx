import Image from "next/image";
import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

function Product({}: Props) {
  const href = `/product`;
  return (
    <Link href={href} className="w-full space-y-3 hover:cursor-pointer">
      <AspectRatio ratio={5 / 6} className="relative w-full bg-[#f1f1f3]">
        <Image
          src={"/images/11.jpg"}
          fill
          alt="Image"
          className=" object-contain"
        />
      </AspectRatio>
      <p className="text-center">Leather Motor Jacket</p>
      <Button variant={"outline"} className="rounded-none w-full">
        ADD TO BAG -N25,000
      </Button>
    </Link>
  );
}

export default Product;
