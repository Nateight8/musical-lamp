import productOperations from "@/lib/graphql/operations/product";
import { GetProducts } from "@/utils/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";

type Props = {
  name: string;
  price?: boolean;
  stock?: boolean;
  label: string;
};

function Cell({ name, price, stock, label }: Props) {
  const { data } = useQuery<GetProducts>(productOperations.Query.getProducts);

  const products = data?.getProducts;
  const product = products?.find((product) => product.product === name);

  const key = price ? `${product?.price}` : stock ? product?.stock : "";

  return (
    <div className="w-24 ">
      <h1 className="text-base font-semibold">{key ? key : 0}</h1>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default Cell;
