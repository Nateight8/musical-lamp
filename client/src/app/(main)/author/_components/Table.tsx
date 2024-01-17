"use client";
import { column } from "@/components/data-table/Columns";
import { DataTable } from "@/components/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus, PlusIcon } from "lucide-react";
import React from "react";
import AddBook from "./AddBook";

type Props = {};

function Table({}: Props) {
  const data = [
    {
      id: "string",
      product: "Things Fall apart...",
      sales: "3,275",
      status: "Unpublished",
      categoryId: "string",
      category: "Romance",
      price: "9.99",
      stock: 5,
      sku: "string",
      image: "s",
    },
    {
      id: "string",
      product: "Half of a yellow sun",
      sales: "4,257",
      status: "Active",
      categoryId: "string",
      category: "Fantacy",
      price: "18.65",
      stock: 5,
      sku: "string",
      image: "s",
    },
    {
      id: "string",
      product: "Black Lives Matters -Michael lives on",
      sales: "477",
      status: "Published",
      categoryId: "string",
      category: "Crime",
      price: "8.66",
      stock: 100,
      sku: "string",
      image: "s",
    },

    {
      id: "string",
      product: "Spider man -No Way Home",
      sales: "477",
      status: "Pending",
      categoryId: "string",
      category: "Comic",
      price: "8.66",
      stock: 100,
      sku: "string",
      image: "s",
    },
    {
      id: "string",
      product: "Black Lives Matters -Michael lives on",
      sales: "477",
      status: "Out of Stock",
      categoryId: "string",
      category: "Crime",
      price: "8.66",
      stock: 0,
      sku: "string",
      image: "s",
    },
  ];

  return (
    <div className="w-fit mx-auto">
      <div className="w-full p-4 flex justify-between items-center">
        <h3 className="text-lg font-semibold">Products</h3>
        <Button>Add Book</Button>
      </div>
      <DataTable columns={column} data={data} />
    </div>
  );
}

export default Table;
