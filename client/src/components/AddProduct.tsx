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
import { ChangeEvent, useState } from "react";
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
import { ImageIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation, useQuery } from "@apollo/client";
import categoryOperations from "@/lib/graphql/operations/category";
import { Category, GetAllCategories, ProductById } from "@/utils/types";
import productOperations from "@/lib/graphql/operations/product";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { getSignedURL } from "@/utils/getSignedUrl";

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
  price: z.string().min(2, {
    message: "Product description is required.",
  }),

  image: z.string({
    required_error: "You need to select a notification type.",
  }),
});

interface Props {
  productId: string;
}

export function AddProduct({ productId }: Props) {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  // setting default values
  const { data: byId } = useQuery<ProductById>(
    productOperations.Query.getProductsById,
    {
      variables: { productId },
    }
  );

  const defaultValues = byId?.getProductById;
  const productName = defaultValues?.product;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      product: productName,
      description: "",
      category: "",
      // gender: "",
      price: "",
      image: "",
    },
  });

  // file upload
  const handleChange = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setImageFile(file);

    setImageUrl(url);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleChange,
  });

  const [updateProduct, { loading }] = useMutation(
    productOperations.Mutation.updateProduct
  );

  const { data } = useQuery<GetAllCategories>(
    categoryOperations.Query.getAllCategories
  );

  // productData?.getProductById
  // submit

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { category: categoryId, product } = data;

    if (!imageFile) {
      // Handle the case where imageFile is null (optional)
      console.error("No image selected");
      return;
    }
    // presignedUrl logic
    const signedUrl = await getSignedURL(imageFile.type, productId);
    // if (signedUrl) {
    if (!signedUrl) {
      return;
    }

    const url = signedUrl.success.url;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": imageFile.type,
      },
      body: imageFile,
    });
    const image = url.split("?")[0];

    await updateProduct({
      variables: { input: { product, categoryId, image, productId } },
    });
  }
  const categories = data?.getAllCategory;

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
                    {/* <Tiptap
                      description={field.value}
                      onChange={field.onChange}
                    /> */}
                    <Textarea
                      rows={5}
                      {...field}
                      placeholder="write a description"
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
                      {categories?.map(({ category, id }) => (
                        <SelectItem key={id} value={id}>
                          {category}
                        </SelectItem>
                      ))}
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

        {/* dropzone */}
        <div
          className="border-dashed hover:cursor-pointer rounded-md p-2 flex items-center relative justify-center border border-border h-56 w-full"
          {...getRootProps()}
        >
          <Input multiple type="file" {...getInputProps()} />

          {imageUrl ? (
            <div className="w-full h-full hover:bg-muted rounded-sm  relative">
              <div className=" h-full  flex relative group hover:cursor-pointer transition-all duration-1000 ease-in-out hover:bg-background/60 z-50 items-center justify-center">
                <div className="flex-col items-center flex opacity-0 group-hover:opacity-100 delay-200 transition-opacity duration-1000 ease-in-out">
                  <ImageIcon className="w-6 h-6 " />
                  <h1 className="text-center"> Click to replace cover image</h1>
                </div>
              </div>
              {/* {product && (
                <Image
                  fill
                  src={
                    "https://musical-lamb-local.s3.us-east-1.amazonaws.com/clq8vrv6j0000nsaay81lh5id"
                  }
                  alt=""
                  className="object-cover rounded-sm"
                />
              )} */}
            </div>
          ) : (
            <div className="h-full rounded-sm w-full hover:bg-muted/10 transition-all duration-1000 flex ease-in-out items-center justify-center">
              <div className=" max-w-[16rem] p-2  w-full flex flex-col items-center justify-center  space-y-4">
                <ImageIcon className="w-6 h-6" />
                <h1 className="text-center">
                  Drop Your Product Image here, or{" "}
                  <span className="bold">Click to Browse</span>
                </h1>
              </div>
            </div>
          )}
        </div>
        <Button type="submit">Sub</Button>
      </form>
    </Form>
  );
}
