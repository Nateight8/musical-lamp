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

import Tiptap from "./Tiptap";
import { useMutation } from "@apollo/client";
import categoryOperations from "@/lib/graphql/operations/category";

// const Editor = dynamic(() => import("./Editor"), { ssr: false });

const FormSchema = z.object({
  category: z.string().min(2, {
    message: "Category name is required.",
  }),
  description: z.string().min(2, {
    message: "Category description is required.",
  }),
});

export function AddCategory() {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: "",
      description: "",
    },
  });

  const [createCategory, { data }] = useMutation<{ category: string }>(
    categoryOperations.Mutation.CreateCategory
  );

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { category } = data;
    console.log(data);
    await createCategory({
      variables: { category },
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full  space-y-10"
      >
        <>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category </FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Best seller" {...field} />
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
                  <Textarea {...field} rows={4} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </>

        <Button type="submit">Submti</Button>
      </form>
    </Form>
  );
}
