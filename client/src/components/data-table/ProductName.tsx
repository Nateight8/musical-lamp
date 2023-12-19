import productOperations from "@/lib/graphql/operations/product";
import { GetProducts } from "@/utils/types";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import React from "react";

type Props = {
  name: string;
};

function ProductName({ name }: Props) {
  const { data } = useQuery<GetProducts>(productOperations.Query.getProducts);

  const products = data?.getProducts;
  const product = products?.find((product) => product.product === name);

  return (
    <div className="flex items-center space-x-4 w-full overflow-hidden ">
      {product && (
        <div className="w-16 h-16 border bg-muted/10">
          {product.image && (
            <Image src={product.image} alt="" width={64} height={4} />
          )}
        </div>
      )}
      <div className="">
        <h1 className="whitespace-nowrap truncate w-[28rem] ">
          {product?.product ? product.product : "UNTITLED"}
        </h1>
        <p className="text-xs text-muted-foreground">SKU-1551</p>
      </div>
    </div>
  );
}

export default ProductName;
