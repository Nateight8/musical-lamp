"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

function AddToCart({}: Props) {
  const router = useRouter();

  return (
    <>
      <Button onClick={() => router.push("/bag")} className="w-full md:w-fit">
        ADD TO BAG
      </Button>
    </>
  );
}

export default AddToCart;
