"use client";
import { AddCategory } from "@/components/AddCaegory";
import { AddProduct } from "@/components/AddProduct";
import { AddAiProduct } from "@/components/aiText/AiTextEditor";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";
interface Props {
  params: {
    productId: string;
  };
}

function Page({ params }: Props) {
  const { productId } = params;
  const [step, setStep] = useState(1);
  const next = () => {
    setStep((p) => p + 1);
  };

  const prev = () => {
    setStep((p) => p - 1);
  };

  return (
    <div>
      <div className="flex space-x-4 items-center pb-10">
        <div className="">
          <Button variant="outline" size="icon">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="">
          <p className="text-muted-foreground text-xs">Back to product list</p>
          <h4 className="text-base font-medium">Add New Product</h4>
        </div>
      </div>

      <AddCategory />
    </div>
  );
}

export default Page;
