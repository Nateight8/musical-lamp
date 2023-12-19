import { Product } from "@/utils/types";
import React from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";
import Link from "next/link";

type Props = {
  product: Product;
};

function Product({ product }: Props) {
  const { image, product: name, price, stock, category, id } = product;

  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price));
  const href = `/dashboard/products/create/${id}`;

  const available = stock === 0 ? "out of stock" : stock;
  return (
    <Link
      href={href}
      className="w-full hover:cursor-pointer hover:animate-pulse hover:border-primary/70 transition-all duration-1000 ease-in-out border rounded-md relative overflow-hidden"
    >
      <div className="w-full">
        <AspectRatio ratio={16 / 9} className="relative">
          {image && (
            <Image src={image} fill alt="Image" className=" object-cover" />
          )}
        </AspectRatio>
      </div>
      <div className="py-2 px-4">
        <h3 className="text-base font-medium w-full truncate">
          {name ? name : "UNTITLED"}
        </h3>
        <p className="text-sm text-muted-foreground">{amount}</p>
      </div>
      <div className="px-4 pb-4">
        <p className="text-muted-foreground text-sm">
          Stock <span className="font-medium text-primary">{available}</span>
        </p>
      </div>
      <Badge className="absolute top-4 right-4">{category}</Badge>
    </Link>
  );
}

export default Product;
