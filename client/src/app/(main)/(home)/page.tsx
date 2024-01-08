import BreadCrumb from "@/components/BreadCrumb";
import MaxWidth from "@/components/MaxWidth";
import Product from "@/components/Product";
import WithNavigation from "@/components/store/navigation/Navigation";
import { buttonVariants } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Products from "./_components/Products";

type Props = {};

function Page({}: Props) {
  const categories = ["All", "Magazine", "Novel"];
  const lastChild = categories.length;
  return (
    <>
      <Products />
    </>
  );
}

export default Page;
