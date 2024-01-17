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
import { ChangeEvent, FocusEventHandler, useState } from "react";
import dynamic from "next/dynamic";
import { Editor } from "novel";
import { ImageIcon } from "@radix-ui/react-icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Category, GetAllCategories, ProductById } from "@/utils/types";
import productOperations from "@/lib/graphql/operations/product";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { getSignedURL } from "@/utils/getSignedUrl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  BookValidator,
  TBookValidator,
  bookDefaultValues,
} from "@/utils/BookValidator";

interface Props {
  productId: string;
}

export function BookForm({ productId }: Props) {
  const [step, setStep] = useState(1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File>();
  // setting default values

  const form = useForm<TBookValidator>({
    resolver: zodResolver(BookValidator),
    defaultValues: bookDefaultValues,
  });

  // file upload preview
  const handleChange = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImageFile(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleChange,
  });

  async function onSubmit(data: TBookValidator) {
    console.log(data);

    // const { category: categoryId, product, price } = data;
    // if (!imageFile) {
    //   // Handle the case where imageFile is null (optional)
    //   console.error("No image selected");
    //   return;
    // }
    // // presignedUrl logic
    // const signedUrl = await getSignedURL(imageFile.type, productId);
    // // if (signedUrl) {
    // if (!signedUrl) {
    //   return;
    // }
    // const url = signedUrl.success.url;
    // await fetch(url, {
    //   method: "PUT",
    //   headers: {
    //     "Content-type": imageFile.type,
    //   },
    //   body: imageFile,
    // });
    // const image = url.split("?")[0];
    // await updateProduct({
    //   variables: {
    //     input: { product, categoryId, image, productId, price: Number(price) },
    //   },
    // });
  }

  const categories = [
    {
      category: "Thriller",
      id: "thr",
    },
    {
      category: "Fantasy",
      id: "fant",
    },
    {
      category: "Romance",
      id: "rom",
    },
  ];

  const fileFormat = [
    {
      id: "1",
      format: "Book is only available in PDF",
    },
    {
      id: "2",
      format: "PDF & Hard-copy ",
    },
  ];
  const authors = [
    {
      id: "chinu",
      author: "Chinu Achebe",
    },
    {
      id: "chima",
      author: "Chimamanda Adache",
    },
    {
      id: "mike",
      author: "Michael Learns",
    },
  ];

  const languages = [
    {
      id: "eng",
      language: "English",
    },
    {
      id: "afr",
      language: "Arikaan",
    },
    {
      id: "frn",
      language: "French",
    },
  ];

  const handleNext = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };
  const handleCurrent = (index: number) => {
    setStep(index + 1);
  };

  const hardcopy = true;
  const [focus, setFocus] = useState(false);
  //   const [value, setValue] = useState();

  //   console.log(value);

  return (
    <>
      <div className="h-14 bg-background z-[99999] w-full sticky top-0 flex items-center gap-1 px-4">
        {[1, 2, 3].map((item, index) => (
          <button
            onClick={() => handleCurrent(index)}
            className={`flex-1 h-2 , ${
              step >= index + 1
                ? "rounded-full bg-primary"
                : "bg-muted rounded-full"
            }`}
            key={item}
          ></button>
        ))}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  space-y-6 min-h-[calc(100vh-56px)] p-4 relative"
        >
          {step === 1 && (
            // basic info
            <div>
              <h3 className="text-xl pb-4">Basic Information</h3>
              <div className=" space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title </FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                          <h1 className="text-center">
                            {" "}
                            Click to replace cover image
                          </h1>
                        </div>
                      </div>
                      {imageUrl && (
                        <Image
                          fill
                          src={imageUrl}
                          alt=""
                          className="object-cover rounded-sm"
                        />
                      )}
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
                <div className="grid grid-cols-4 gap-4">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="What Genre does your piece belong?" />
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
                    name="author"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Author</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Author of the Book?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors?.map(({ author, id }) => (
                              <SelectItem key={id} value={id}>
                                {author}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <>
              <h3 className="text-xl pb-4">Description & Details</h3>{" "}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="pb-4 ">
                    <FormLabel>Book Description </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={7}
                        {...field}
                        placeholder="write a description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="pdf"
                  render={({ field }) => (
                    <FormItem className="col-span-full md:col-span-2">
                      <FormLabel>Upload PDF </FormLabel>
                      <FormControl>
                        <Input
                          //   type="file"
                          placeholder=""
                          className="rounded-md flex-1"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem className="col-span-full md:col-span-1">
                      <FormLabel>Language</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="What language?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {languages?.map(({ language, id }) => (
                            <SelectItem key={id} value={id}>
                              {language}
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
                  name="date"
                  render={({ field }) => (
                    <FormItem className="col-span-full md:col-span-1">
                      <FormLabel>Publication Date</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Sku"
                          className="rounded-md"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="pb-4">
                <h3 className="text-xl pb-4">Pricing & Availability</h3>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <FormField
                    control={form.control}
                    name="price_digital"
                    render={({ field }) => (
                      <FormItem className="col-span-full md:col-span-1 ">
                        <FormLabel>Price</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Price"
                            className="rounded-md"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem className="col-span-full md:col-span-1">
                        <FormLabel>Available on:</FormLabel>
                        <Select
                          //   onValueChange={field.onChange}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Is this edition ready?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent
                            onChange={(value) => {
                              console.log("value:", value);
                            }}
                          >
                            <SelectItem value={"order"}>Order</SelectItem>
                            <SelectItem value={"pre_order"}>
                              Pre-order
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {}

                  <FormField
                    control={form.control}
                    name="price_hard"
                    render={({ field }) => (
                      <FormItem className="col-span-full md:col-span-1">
                        <FormLabel>Pre-order discount </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="in percentage"
                            className="rounded-md"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {hardcopy && (
                    <>
                      <FormField
                        control={form.control}
                        name="price_hard"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel>Price (hard copy)</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Price per unit"
                                className="rounded-md"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="stock"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel>Stock</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="Stock"
                                className="rounded-md"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="col-span-full md:col-span-2 flex gap-2 items-end">
                        <FormField
                          control={form.control}
                          name="sku"
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormLabel>Sku</FormLabel>

                              <FormControl>
                                <div
                                  className={`w-full border border-input rounded-md h-9 p-1 flex placeholder:text-muted-foreground , ${
                                    focus ? "outline-none ring-1 ring-ring" : ""
                                  }`}
                                >
                                  <input
                                    placeholder="Sku"
                                    className="flex-1 bg-transparent px-2 py-1 text-sm outline-none"
                                    {...field}
                                    onFocus={() => {
                                      setFocus(true);
                                    }}
                                  />
                                  <button
                                    type="button"
                                    className="bg-secondary text-sm px-2 rounded hover:bg-secondary/60 h-full"
                                  >
                                    Generate sku
                                  </button>
                                </div>
                              </FormControl>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="w-full h-px bg-border my-4" />
              {hardcopy && (
                <>
                  <div className="pt-4">
                    <h3 className="text-xl pb-4">Shipping & Delivery Cost</h3>
                    <div className="grid grid-cols-4 gap-4">
                      <FormField
                        control={form.control}
                        name="dimension"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel>Dimension</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="in inches"
                                className="rounded-md"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel>Weight</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="in kg"
                                className="rounded-md"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="shipping"
                        render={({ field }) => (
                          <FormItem className="col-span-full md:col-span-1">
                            <FormLabel>Shipping Cost</FormLabel>

                            <FormControl>
                              <Input
                                placeholder="in USD"
                                className="rounded-md"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className="grid grid-cols- gap-4 absolute bottom-0 p-4 left-0 right-0">
            {step === 3 ? (
              <Button type="submit" className="w-full rounded-full">
                Publish
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full rounded-full"
                onClick={handleNext}
              >
                Continue
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
