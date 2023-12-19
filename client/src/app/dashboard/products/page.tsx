"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useState } from "react";
import { Editor } from "novel";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import productOperations from "@/lib/graphql/operations/product";
import {
  CreateProductMutation,
  GetProducts,
  ProductStatus,
} from "@/utils/types";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { createFulfilledPromise } from "@apollo/client/utilities";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GridIcon, TableIcon } from "@radix-ui/react-icons";
import { DataTable } from "@/components/data-table/DataTable";
import { column } from "@/components/data-table/Columns";
import generateSKU from "@/utils/genSKU";
import Product from "@/components/Product";

type Props = {};

function Page({}: Props) {
  const [productStatus, setProductStatus] = useState("all");
  const router = useRouter();
  const { data } = useQuery<GetProducts>(productOperations.Query.getProducts);

  const products = data?.getProducts;
  generateSKU();
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
  console.log(filterProducts);

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
      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid grid-cols-2 w-28">
          <TabsTrigger value="grid">
            {/* <GridIcon className="w-4 h-4" /> */}
            Grid
          </TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className="container mx-auto py-10 px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
            {filterProducts?.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="table">
          {filterProducts && (
            <div className="container mx-auto py-10 px-0">
              <DataTable columns={column} data={filterProducts} />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Page;
