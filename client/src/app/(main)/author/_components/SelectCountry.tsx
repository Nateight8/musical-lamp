import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { authors } from "@/utils/data";

import React, { Dispatch, SetStateAction, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@react-hook/media-query";
import { useFormReturnTypes } from "@/utils/BookValidator";

type Props = {
  getRoute: number;
  form: UseFormReturn<
    {
      countries: string[];
      date: Date;
      dimension: { height: string; width: string; breadth: string };
      file: string;
      stock: number;
      available?: boolean | undefined;
    },
    any,
    undefined
  >;
  setGetRoute: Dispatch<SetStateAction<string[] | undefined>>;
};

export default function SelectCountry({ getRoute, form, setGetRoute }: Props) {
  const [open, setOpen] = useState(false);
  // const watchCountries = 0 || form.watch("countries");

  const handleClick = () => {
    setGetRoute(form.getValues("countries"));
  };

  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <>
        <Dialog onOpenChange={setOpen} open={open}>
          <DialogTrigger asChild>
            {/* <button className="text-stone-600 text-left w-full whitespace-nowrap text-sm font-medium">
            
          </button> */}
            <button className="py-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ">
              {getRoute <= 0
                ? "Add Atlease One Country"
                : "You Can Add More Countries?"}{" "}
              <span className="font-normal text-primary/40">
                [ {getRoute === 0 ? "0" : getRoute} ]
              </span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Countries</DialogTitle>
              <DialogDescription>
                Select only countries where you can conviniently ship your book
                to or where they are available and easy to deliver.
              </DialogDescription>
            </DialogHeader>
            <>
              <SelectCountries form={form} />
            </>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant={"outline"}
                  onClick={handleClick}
                  className="w-full"
                >
                  Update
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="py-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ">
          Enter Countries
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Select Countries</DrawerTitle>
          <DrawerDescription>
            Select only countries where you can conviniently ship your book to
            or where they are available and easy to deliver.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <SelectCountries form={form} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button
              variant={"outline"}
              onClick={handleClick}
              className="w-full"
            >
              Update
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface SelectCountriesProps {
  className?: string;
  form: UseFormReturn<useFormReturnTypes>;
}

function SelectCountries({ form, className }: SelectCountriesProps) {
  return (
    <>
      {" "}
      <FormField
        control={form.control}
        name="countries"
        render={() => (
          <FormItem>
            <ScrollArea className="h-[40vh] w-full ">
              <div className="space-y-2">
                {authors.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="countries"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel
                            className={`text-sm font-normal ${
                              field.value?.includes(item.id)
                                ? "text-primary"
                                : ""
                            }`}
                          >
                            {item.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </ScrollArea>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
