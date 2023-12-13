"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Editor } from "novel";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import productOperations from "@/lib/graphql/operations/product";
import { GetProducts } from "@/utils/types";

type Props = {};

function Page({}: Props) {
  const { data } = useQuery<GetProducts>(productOperations.Query.getProducts);

  const products = data?.getProducts;

  return (
    <>
      <div className="flex justify-end">
        <div>
          <Button size={"sm"} variant="outline">
            New Product
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 my-4">
        {products?.map(({ id, product }) => (
          <div key={id} className="h-20 border border-border p-4">
            {product}
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
