"use client";
import { AddProduct } from "@/components/AddProduct";
import { AddAiProduct } from "@/components/aiText/AiTextEditor";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
interface Props {
  params: {
    product: string;
  };
}
const FormSchema = z.object({
  size: z.string().min(1),
  color: z.string().min(1),
});

function Page({ params }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      color: "",
      size: "",
    },
  });

  const [color, setColor] = useState("");
  const [size, setsize] = useState("");

  function onSubmit() {
    const formDataR = {
      color,
      size,
    };
    console.log(formDataR);
  }

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const colors = ["red", "blue", "pink", "black"];

  return (
    <div className="pt-20 px-4">
      <div className=" gap-4">
        <div className="grid grid-cols-2 px-4">
          <div className="border relative">
            {/* <AspectRatio ratio={1 / 1} className="relative w-full"> */}
            <Image
              src={"/images/12.webp"}
              fill
              alt="Image"
              className=" object-contain"
            />
            {/* </AspectRatio> */}
          </div>
          <div className="p-4 space-y-4 max-w-sm w-full">
            <div className="space-y-1">
              <p>Pull & Bear</p>
              <h1 className="text-2xl font-semibold">
                AC/DC North American Tour T-Shirt
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold">$199.99</h2>
              <h2 className="text-lg line-through text-muted-foreground">
                $299.99
              </h2>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full  space-y-10"
              >
                <FormItem className="mt-4">
                  <FormLabel>Color </FormLabel>

                  <ToggleGroup
                    onValueChange={(value) => setColor(value)}
                    variant="outline"
                    type="single"
                    className="grid grid-cols-5  gap-4"
                  >
                    {colors.map((size) => (
                      <ToggleGroupItem
                        key={size}
                        value={size}
                        aria-label="Toggle strikethrough"
                      >
                        <AspectRatio ratio={1 / 2} className="relative w-full">
                          <Image
                            src={"/images/12.webp"}
                            fill
                            alt="Image"
                            className=" object-cover"
                          />
                        </AspectRatio>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>

                  {/* <FormMessage /> */}
                </FormItem>

                <FormItem className="mt-4">
                  <FormLabel>Size </FormLabel>

                  <ToggleGroup
                    variant="outline"
                    type="single"
                    className="grid grid-cols-5  gap-4"
                    onValueChange={(value) => setsize(value)}
                  >
                    {sizes.map((size) => (
                      <ToggleGroupItem
                        key={size}
                        value={size}
                        aria-label="Toggle strikethrough"
                      >
                        <p className="font-bold text-muted-foreground">
                          {size}
                        </p>
                      </ToggleGroupItem>
                    ))}
                  </ToggleGroup>

                  {/* <FormMessage /> */}
                </FormItem>

                <Button
                  onClick={() => onSubmit()}
                  type="submit"
                  className="w-full"
                >
                  ADD TO BAG
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
}

export default Page;
