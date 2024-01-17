import Image from "next/image";
import React from "react";
import Products from "../../../_components/Products";

type Props = {};

function Page({}: Props) {
  const products = [1, 2, 3, 4];
  return (
    <div className="">
      <Products category="category" products={products} />
    </div>
  );
}

export default Page;
