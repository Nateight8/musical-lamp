"use client";
import React, { useState } from "react";
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
import { useForm } from "react-hook-form";
import {
  BookValidator,
  FieldSchema,
  TBookValidator,
  bookDefaultValues,
} from "@/utils/BookValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  ArrowRightLeft,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Info,
} from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Editor } from "novel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cva } from "class-variance-authority";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { authors, languages } from "@/utils/data";

type Props = {};

function Book({}: Props) {
  const form = useForm<TBookValidator>({
    resolver: zodResolver(BookValidator),
    defaultValues: bookDefaultValues,
  });

  //   states
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File>();

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

  const onSubmit = (data: TBookValidator) => {};
  const formLabel = "text-lg md:text-2xl";
  const [step, setStep] = useState(1);
  const [availability, setAvailability] = useState("");

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

  const inputVariant = cva(
    "p-0 border-0 border-b focus-visible:border-0 focus-visible:border-b focus-visible:ring-0 focus:ring-0 focus-visible:border-ring"
  );

  return (
    <div className="h-screen w-full p-4">
      <div className="mx-auto w-full max-w-5xl h-full flex flex-col">
        <div className=" h-10 mb-1 w-full">
          <button>
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 relative">
          <>
            <button
              onClick={handleNext}
              className="flex items-center absolute right-0 bottom-0"
            >
              Next <ChevronRight className="w-5 h-5 ml-1.5" />
            </button>
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center absolute left-0 bottom-0 disabled:text-muted-foreground"
            >
              <ChevronLeft className="w-5 h-5 mr-1.5" /> Prev
            </button>
          </>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full w-full borr"
            >
              <div className="w-full h-full grid grid-cols-2 divide-x divide-dashed">
                {step === 1 && (
                  <>
                    <div className="flex items-center justify-center h-full">
                      <>
                        <div
                          className="border-dashed hover:cursor-pointer p-2 flex items-center relative justify-center border border-border aspect-[1/1.1] w-full max-w-sm mx-auto"
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
                                  Drop the Cover Image here, or{" "}
                                  <span className="bold">Click to Browse</span>
                                </h1>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    </div>
                    <div className="flex items-center justify-center h-full">
                      <div className="w-full max-w-sm space-y-4 sm:space-y-10">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel className={cn()}>
                                What&rsquo;s the title of the Book?{" "}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className={inputVariant()}
                                  placeholder="eg Shalock Holmes"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="author"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Author</FormLabel>
                              <Select onValueChange={field.onChange}>
                                <FormControl>
                                  <SelectTrigger className={inputVariant()}>
                                    <SelectValue
                                      placeholder={`Select Author`}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {authors?.map(({ id, name }) => (
                                    <SelectItem key={id} value={id}>
                                      {name}
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
                          name="pdf"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Upload PDF</FormLabel>

                              <FormControl>
                                <Input
                                  className={inputVariant({
                                    className: "text-white",
                                  })}
                                  type="file"
                                  placeholder="pdf"
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

                {step === 2 && (
                  <>
                    <div className="flex items-center">
                      <ScrollArea className="w-full h-[80vh]  sm:p-4 border border-border/30">
                        <Editor className="w-full" />
                      </ScrollArea>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className=" w-full max-w-sm space-y-4 sm:space-y-10">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Publication date</FormLabel>

                              <FormControl>
                                <Input
                                  className={inputVariant()}
                                  placeholder="Choose date"
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
                                  <SelectTrigger className={inputVariant()}>
                                    <SelectValue placeholder="What language?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {languages?.map(({ value, label }) => (
                                    <SelectItem key={value} value={value}>
                                      {value}
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
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className=""></div>
                    <div className="flex items-center justify-center">
                      <div className="max-w-sm w-full space-y-8">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <div className="w-full flex items-center justify-between">
                                <FormLabel>Price</FormLabel>
                                <button>
                                  <InfoCircledIcon className="w-4 h-4 text-muted" />
                                </button>
                              </div>

                              <FormControl>
                                <Input
                                  className={inputVariant()}
                                  placeholder="How much does your book cost?"
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
                              <FormLabel>Availability</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  setAvailability(value);
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className={inputVariant()}>
                                    <SelectValue placeholder="Your Book is Available in?" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="stock">
                                    In Stock
                                  </SelectItem>
                                  <SelectItem value="pre-order">
                                    Pre-order
                                  </SelectItem>
                                </SelectContent>
                              </Select>

                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        {availability === "pre-order" ? (
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Discount on preorder</FormLabel>

                                <FormControl>
                                  <Input
                                    className={inputVariant()}
                                    placeholder="Discount is in percentage"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : availability === "stock" ? (
                          <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Quantity in Stock</FormLabel>

                                <FormControl>
                                  <Input
                                    className={inputVariant()}
                                    placeholder="How many Books are ready to be shipped"
                                    {...field}
                                  />
                                </FormControl>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        ) : null}
                      </div>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <div className=""></div>
                    <div className=""></div>
                  </>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Book;
