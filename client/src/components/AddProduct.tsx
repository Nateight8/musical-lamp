"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Editor } from "novel";
import Tiptap from "./Tiptap";
import { PlusIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// const Editor = dynamic(() => import("./Editor"), { ssr: false });

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
  // gender: z.string().min(2, {
  //   message: "Product description is required.",
  // }),
  price: z.string().min(2, {
    message: "Product description is required.",
  }),

  gender: z.string({
    required_error: "You need to select a notification type.",
  }),
});

export function AddProduct() {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      product: "",
      description: "",
      category: "",
      gender: "",
      price: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  console.log(value);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  space-y-10"
      >
        {step === 1 && (
          <>
            {/* <div className="md:p-4 rounded-lg sm:border border-border/40 space-y-6"> */}
            <FormField
              control={form.control}
              name="product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name </FormLabel>
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description </FormLabel>
                  <FormControl>
                    <Tiptap
                      description={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            {/* </div> */}
          </>
        )}
        {step === 1 && (
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Category</FormLabel>
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
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="flex-[0.5]">
                  <FormLabel>Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="unisex">Unisex</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-[0.5]">
                  <FormLabel>Price</FormLabel>

                  <FormControl>
                    <Input placeholder="Price" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {step === 2 && (
          <div className="border border-border rounded-md p-4">
            <div className="border-b border-border pb-3">
              <h1>Pricing</h1>
            </div>
            <>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price </FormLabel>
                    <FormControl>
                      <Input placeholder="base price" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
        )}
        <Button type="submit">Submti</Button>
      </form>
    </Form>
  );
}
