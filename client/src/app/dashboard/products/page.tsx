"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { Editor } from "novel";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import productOperations from "@/lib/graphql/operations/product";
import { CreateProductMutation, GetProducts } from "@/utils/types";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { createFulfilledPromise } from "@apollo/client/utilities";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

function Page({}: Props) {
  const router = useRouter();
  const { data } = useQuery<GetProducts>(productOperations.Query.getProducts);

  const products = data?.getProducts;

  const [createProductMutation, { loading }] =
    useMutation<CreateProductMutation>(
      productOperations.Mutation.createProduct
    );

  const createProduct = async () => {
    const { data } = await createProductMutation();

    const productId = data?.createProduct.productId;
    router.push(`/dashboard/products/create/${productId}`);
  };

  return (
    <>
      <div className="flex justify-end">
        <div>
          <Button onClick={createProduct} size={"sm"} variant="outline">
            New Product
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 my-4">
        {products?.map(({ id, product, image }) => (
          <Link
            href={`/dashboard/products/create/${id}`}
            key={id}
            className="h-20 border border-border p-4 relative"
          >
            <Image alt="" src={image} fill className="object-cover" />
          </Link>
        ))}
      </div>
    </>
  );
}

export default Page;
