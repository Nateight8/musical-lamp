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

import { useState } from "react";
import { SizeIcon } from "@radix-ui/react-icons";

const FormSchema = z.object({
  variants: z.array(
    z.object({
      sku: z.string(),
      size: z.string(),
    })
  ),
});

export function AddAiProduct() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      variants: [
        {
          sku: "",
          size: "",
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    name: "variants",
    control: form.control,
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-8"
      >
        {fields.map((field, index) => (
          <div className="flex space-x-4" key={field.id}>
            <FormField
              key={field.id}
              control={form.control}
              name={`variants.${index}.sku`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU </FormLabel>
                  <FormControl className="w-28">
                    <Input placeholder="sku" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              key={field.id}
              control={form.control}
              name={`variants.${index}.sku`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <FormControl className="w-28">
                    <Input placeholder="size" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              key={field.id}
              control={form.control}
              name={`variants.${index}.sku`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color </FormLabel>
                  <FormControl className="w-28">
                    <Input placeholder="color" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              key={field.id}
              control={form.control}
              name={`variants.${index}.sku`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Quantity </FormLabel>
                  <FormControl className="w-28">
                    <Input placeholder="quantity" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button onClick={() => append({ sku: "", size: "" })}>Add</Button>
        <Button type="submit">Submti</Button>
        <SizeIcon />
      </form>
    </Form>
  );
}
