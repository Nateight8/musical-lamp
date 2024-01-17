"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  authors,
  availablility,
  bookGenres,
  languages,
  preoder,
} from "@/utils/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDropzone } from "react-dropzone";
import { useStep } from "@/lib/hooks/use-steps";
import { useMediaQuery } from "@react-hook/media-query";

const authorsNames = authors.map(({ id }) => id);
const bookGenre = bookGenres.map(({ value }) => value);

const FormSchema = z.object({
  author: z.enum(["", ...authorsNames], {
    required_error: "required",
  }),
  genre: z.enum(["", ...bookGenre], {
    required_error: "required",
  }),
  language: z.enum(["dutch", "eng", "french", "german"], {
    required_error: "required",
  }),
  discount: z.enum(["0", "10", "20", "30"], {
    required_error: "required",
  }),
  availability: z.enum(["in-stock", "preorder"], {
    required_error: "required",
  }),
  file: z.string(),
});

export default function Radio() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      author: undefined,
      genre: undefined,
      language: undefined,
      discount: undefined,
      availability: undefined,
      file: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
  }

  const availabilityStatus = form.watch("availability");
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // onDrop: handleChange,
  });
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!isDesktop) {
    return (
      <div className="h-[calc(100vh-60px)] flex items-center justify-center w-full">
        <div className="">
          <h1 className="text-center mb-3 capitalize text-primary font-bold text-4xl">
            Not optimized for mobile
          </h1>
          <p className="text-center capitalize max-w-prose text-xl font-semibold">
            Sack the product designer
          </p>
          <p className="text-center capitalize text-xl font-semibold">
            Not the dev
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex-1 px-4 w-full max-w-5xl mx-auto "
        >
          <div className="w-full grid  md:grid-cols-3 py-4 divide-x divide-border divide-dashed">
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <>
                  <FormItem className="space-y-3 w-full ">
                    <FormLabel>Select Author</FormLabel>
                    <ScrollArea className="h-fit max-h-[70vh] w-full ">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          {authors.map(({ id, name }) => (
                            <FormItem
                              key={id}
                              className="flex items-center space-x-3 space-y-0"
                            >
                              <FormControl>
                                <RadioGroupItem value={id} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {name}
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </ScrollArea>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem className="space-y-3 px-4">
                  <FormLabel>Select Genre</FormLabel>
                  <FormControl>
                    <ScrollArea className="h-[70vh]">
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        {bookGenres.map(({ id, label, value }) => (
                          <FormItem
                            key={id}
                            className="flex items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <RadioGroupItem value={value} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </ScrollArea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="">
              <ScrollArea className="h-[75vh]">
                <div className="space-y-6 px-4">
                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem className="space-y-3 ">
                        <FormLabel>Availability</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {availablility.map(({ id, label, value }) => (
                              <FormItem
                                key={id}
                                className="flex items-center space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <RadioGroupItem value={value} />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {label}
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {availabilityStatus === "preorder" && (
                    <FormField
                      control={form.control}
                      name="discount"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Discount (Preoder)</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {preoder.map(({ label, value }) => (
                                <FormItem
                                  key={value}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={value} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {availabilityStatus ? (
                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem className="space-y-3 ">
                          <FormLabel>Language</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              {languages.map(({ label, value }) => (
                                <FormItem
                                  key={value}
                                  className="flex items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <RadioGroupItem value={value} />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {label}
                                  </FormLabel>
                                </FormItem>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ) : null}
                </div>
              </ScrollArea>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
