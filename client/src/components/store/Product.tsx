import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

function Product({}: Props) {
  const isLoading = true;

  return (
    <>
      <Placeholder />
    </>
  );
}

function Placeholder() {
  return <Skeleton className="w-full h-10 rounded-md" />;
}

export default Product;
