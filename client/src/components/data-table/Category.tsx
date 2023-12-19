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
  return (
    <div className="w-24 ">
      <h1 className="text-base font-semibold">{name}</h1>
    </div>
  );
}

export default Cell;
