"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("./Editor"), { ssr: false });

const FormSchema = z.object({
  product: z.string().min(2, {
    message: "Product name is required.",
  }),
  description: z.string().min(2, {
    message: "Product description is required.",
  }),
  category: z.string().min(2, {
    message: "Product description is required.",
  }),
});

export function AddProduct() {
  const [step, setStep] = useState(1);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      product: "",
      description: "",
      category: "",
    },
  });

  const next = () => {
    setStep((p) => p + 1);
  };

  const prev = () => {
    setStep((p) => p - 1);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-xl">
        <div className="min-h-[55vh] my-6 relative  ">
          <div className="absolute top-1/2 w-full max-w-xl  -translate-y-1/2">
            {/* product name */}
            {step === 1 && (
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the Product Name </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Gucci Leather Crossbody Bag"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {/* description */}
            {step === 2 && (
              <FormField
                control={form.control}
                name="product"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the Product Description </FormLabel>
                    <FormControl>
                      {/* <Textarea
                        rows={10}
                        placeholder="Describe"
                        className="resize-none"
                        {...field}
                      /> */}
                      <Editor />
                    </FormControl>

                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />
            )}
            {/* category */}
            {step === 3 && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose Categories</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose atleast one category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="m@example.com">
                          m@example.com
                        </SelectItem>
                        <SelectItem value="m@google.com">
                          m@google.com
                        </SelectItem>
                        <SelectItem value="m@support.com">
                          m@support.com
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {step === 4 && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inventory</FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {step === 5 && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping and Delivery</FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {step === 6 && (
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing</FormLabel>

                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <div className="space-x-3">
            <Button disabled={step === 1} variant={"outline"} onClick={prev}>
              Previous
            </Button>
            <Button disabled={step === 6} variant={"secondary"} onClick={next}>
              Next
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
