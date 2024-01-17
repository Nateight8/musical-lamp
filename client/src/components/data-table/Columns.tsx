"use client";

import { Product } from "@/utils/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import ProductName from "./ProductName";
import { Button } from "../ui/button";
import Cell from "./Cell";
import { cn } from "@/lib/utils";

const width = "w-24";

export const column: ColumnDef<Product>[] = [
  {
    id: "select",
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      const id = row.getValue("select");

      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
  },
  {
    accessorKey: "product",
    header: "Book Name",
    cell: ({ row }) => {
      const value = row.getValue("product") as string;

      return <ProductName name={value} />;
    },
  },
  {
    accessorKey: "sales",
    header: "Sales",
    cell: ({ row }) => {
      const value = row.getValue("sales") as string;
      return (
        <div className="w-24">
          <p className="text-base font-semibold">{value}</p>
          <p className="text-muted-foreground text-xs">Sales</p>
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    header: "Qty",
    cell: ({ row }) => {
      const value = row.getValue("stock") as string;

      return (
        <div className={cn(width)}>
          <p className="text-base font-semibold">{value}</p>
          <p className="text-muted-foreground text-xs">Qty</p>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("price"));
      const amount = value ? value : 0;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className={cn(width)}>
          <p className="text-base font-semibold">{formatted}</p>
          <p className="text-muted-foreground text-xs">Unit Price</p>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const value = row.getValue("category") as string;

      return (
        <div className={cn(width)}>
          <p className="text-base font-semibold">{value}</p>
          <p className="text-muted-foreground text-xs">Category</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const value = row.getValue("status") as string;

      return (
        <div className={cn(width)}>
          <p className="text-base font-semibold">{value}</p>
          <p className="text-muted-foreground text-xs">Status</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem>Delete</DropdownMenuItem>
            <DropdownMenuItem>Hide</DropdownMenuItem>
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
