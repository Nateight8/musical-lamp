"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MinusIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  XCircle,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { authors } from "@/utils/data";
import { useMediaQuery } from "@react-hook/media-query";
import Stock from "./Stock";
import Counter from "./Counter";
import SelectCountry from "./SelectCountry";
import { useStep } from "@/lib/hooks/use-steps";

type Props = {};
const FormSchema = z.object({
  available: z.boolean().default(false).optional(),
  countries: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one country.",
  }),
  dimension: z.object({
    height: z.string(),
    width: z.string(),
    breadth: z.string(),
  }),
  file: z.string(),
  date: z.date(),
  stock: z.number(),
});

export default function Shipping({}: Props) {
  const products = [1];
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDimension, setIsOpenDimension] = useState(false);
  const [count, setCount] = useState(350);
  const [getRoute, setGetRoute] = useState<string[]>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      available: false,
      countries: [],
      dimension: {
        breadth: "",
        height: "",
        width: "",
      },
      file: "",
      date: undefined,
      stock: 0,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  const watchAvailability = form.watch("available");
  // form.setValue("date", date);
  const firstId = getRoute ? getRoute[0] : null;
  const date = form.getValues("date");

  const getFirstSelected = authors.find((author) => author.id === firstId);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <div className="w-full flex-1 px-4 flex flex-col lg:flex-row  md:divide-x divide-border/30">
        <div className="h-[40vh]">
          <ScrollArea className="w-full max-h-[85vh] h-full">
            <div className=" divide-y divide-border border-b border-border">
              {products.map((pdct) => (
                <li className=" w-full p-4 flex relative " key={pdct}>
                  <div className="p-4 bg-muted/10 border border-border/10 md:p-8">
                    <div className="w-16 sm:w-24 md:w-28 ">
                      <AspectRatio ratio={1 / 1.5} className="relative w-full">
                        <Image
                          src="/pin/2.jpg"
                          className="object-cover shadow-md shadow-background"
                          alt=""
                          fill
                        />
                      </AspectRatio>
                    </div>
                  </div>
                  <div className="p-4 md:p-8 flex-1 flex flex-col justify-between">
                    <div className="w-full space-y-1">
                      <h3 className="font-semibold text-primary/70 capitalize text-base md:text-lg">
                        Things fall apart
                      </h3>
                      <p className="text-primary/60 text-sm">Chinua Achebe</p>
                      <p className="text-primary/70 text-sm">$21.99</p>
                    </div>

                    {getRoute && getRoute.length !== 0 && (
                      <Counter count={count} setCount={setCount} />
                    )}
                  </div>
                  <button className="absolute top-4 right-4 sm:hidden">
                    <XCircle className="w-5 h-5 text-primary/30" />
                  </button>
                </li>
              ))}
            </div>
          </ScrollArea>
        </div>

        <section className="lg:flex-1 ">
          <>
            <ScrollArea className="h-[calc(100vh-49px)] w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 lg:mt-0 divide-y divide-border/30 md:p-0 w-full"
                >
                  <FormField
                    control={form.control}
                    name="available"
                    render={({ field }) => (
                      <FormItem className="flex w-full  max-w-none items-center justify-between py-4 md:p-6 ">
                        <FormLabel className="text-left  text-foreground hover:text-muted-foreground  ">
                          <>
                            Available in Hard copies?{" "}
                            <span className="font-normal text-primary/40">
                              [{" "}
                              {watchAvailability && isDesktop
                                ? "yes, hard copies are up for grabs"
                                : watchAvailability
                                ? "Yes"
                                : "only soft copy"}{" "}
                              ]
                            </span>
                          </>
                        </FormLabel>

                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            aria-readonly
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {watchAvailability && (
                    <SelectCountry
                      form={form}
                      setGetRoute={setGetRoute}
                      getRoute={getRoute === undefined ? 0 : getRoute.length}
                    />
                  )}

                  {watchAvailability && getRoute && getRoute.length !== 0 && (
                    <Stock form={form} />
                  )}

                  {watchAvailability && getRoute && getRoute.length !== 0 ? (
                    <Collapsible
                      open={isOpenDimension}
                      onOpenChange={setIsOpenDimension}
                      className={`w-full  ${
                        isOpenDimension
                          ? "md:hover:bg-transparent"
                          : "md:hover:bg-muted"
                      }`}
                    >
                      <CollapsibleTrigger asChild>
                        <button className="py-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ">
                          Enter Dimension
                        </button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="w-full pb-4 px-4 md:px-6">
                        <div className="w-full grid gap-4 grid-cols-3">
                          <FormField
                            control={form.control}
                            name={`dimension.height`}
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-left  text-foreground hover:text-muted-foreground  ">
                                  Height
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter Height"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`dimension.width`}
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-left  text-foreground hover:text-muted-foreground  ">
                                  Width
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter Height"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`dimension.breadth`}
                            render={({ field }) => (
                              <FormItem className="">
                                <FormLabel className="text-left  text-foreground hover:text-muted-foreground  ">
                                  Breadth
                                </FormLabel>

                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="Enter Height"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : null}

                  <Collapsible
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    className={`w-full  ${
                      isOpen ? "md:hover:bg-transparent" : "md:hover:bg-muted"
                    }`}
                  >
                    <CollapsibleTrigger asChild>
                      <button className="py-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ">
                        Upload Your Book in PDF
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="w-full pb-4 px-4 md:px-6">
                      <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                          <FormItem className="">
                            {/* <FormLabel className="text-left  text-foreground hover:text-muted-foreground  ">
                          Upload Your Book in PDF
                        </FormLabel> */}

                            <FormControl>
                              <Input
                                // type="file"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </CollapsibleContent>
                  </Collapsible>

                  {/* DATE PICKER */}
                  <div className="">
                    <Popover>
                      <PopoverTrigger className="p-0" asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-start border-none font-normal py-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Select Publication Date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        {form.getValues("date") && (
                          <Calendar
                            mode="single"
                            selected={form.getValues("date")}
                            onSelect={(value) => form.setValue("date", value)}
                            initialFocus
                          />
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="py-4 md:p-6  grid  ">
                    <Button className="rounded-none">PUBLISH</Button>
                  </div>
                  <div className="p-4 sm:p-4  border-b">
                    {getRoute && getRoute?.length !== 0 && (
                      <div className="text-muted-foreground text-sm items-center flex space-x-1.5">
                        <div className="h-2 w-2 bg-stone-600 rounded-full" />
                        <p>
                          Delivery to {getFirstSelected?.name} and{" "}
                          {getRoute.length - 1} other countries
                        </p>
                      </div>
                    )}
                  </div>
                </form>
              </Form>
            </ScrollArea>
          </>
        </section>
      </div>
    </>
  );
}
