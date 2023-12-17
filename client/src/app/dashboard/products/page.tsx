"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useState } from "react";
import { Editor } from "novel";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import productOperations from "@/lib/graphql/operations/product";
import {
  CreateProductMutation,
  GetProducts,
  Product,
  ProductStatus,
} from "@/utils/types";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { createFulfilledPromise } from "@apollo/client/utilities";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

function Page({}: Props) {
  const [productStatus, setProductStatus] = useState("all");
  const router = useRouter();
  const { data } = useQuery<GetProducts>(productOperations.Query.getProducts);

  const products = data?.getProducts;

  const filterProducts =
    productStatus === "all"
      ? products
      : products?.filter(
          (product) => product.status === productStatus.toUpperCase()
        );

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
      <div className="flex py-4 justify-between items-center w-full relative">
        <div className="">
          <Select
            onValueChange={(value) => {
              setProductStatus(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="ACTIVE">Live</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
                <SelectItem value="FEATURED">Featured</SelectItem>
                <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={createProduct} size={"sm"} variant="outline">
          New Product
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 my-4 border h-[75vh]">
        {filterProducts?.map(({ id, product, image, status }) => {
          return (
            <Link
              href={`/dashboard/products/create/${id}`}
              key={id}
              className="h-20 border border-border p-4 relative"
            >
              {status}
              {/* <Image alt="" src={image} fill className="object-cover" /> */}
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default Page;
