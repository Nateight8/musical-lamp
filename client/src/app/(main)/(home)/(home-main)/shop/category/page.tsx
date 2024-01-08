import Image from "next/image";
import React from "react";
import Products from "../../../_components/Products";

type Props = {};

function Page({}: Props) {
  return (
    <div className="">
      <Products category="category" />
    </div>
  );
}

export default Page;
