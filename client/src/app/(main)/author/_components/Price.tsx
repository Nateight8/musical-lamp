import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMediaQuery } from "@react-hook/media-query";
import React, { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};
const FormSchema = z.object({
  discount: z.object({
    type: z.enum(["none", "perc", "fixed"], {
      required_error: "required",
    }),
    price: z
      .string()
      .min(1, {
        message: "Product name is required.",
      })
      .default("0"),
  }),

  basePrice: z.string().min(2, {
    message: "Product name is required.",
  }),
});

export default function Price({}: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      discount: {
        price: "",
        type: undefined,
      },
      basePrice: "",
    },
  });

  const type = form.watch("discount.type");
  const price = form.getValues("basePrice");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    handleOpen();
  }

  if (isDesktop) {
    return (
      <>
        <Dialog onOpenChange={handleOpen} open={open}>
          <DialogTrigger asChild>
            <button className="text-lg text-primary/60 font-medium">
              {price ? "$" + price : "Enter Price"}
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Price</DialogTitle>
              <DialogDescription>
                Customers are purchasing both hard and soft copy at this price
                if the book is available in hard copy
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <PriceForm form={form} type={type} />
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="text-lg text-primary/60 font-medium">
          {price ? "$" + price : "Enter Price"}
        </button>
      </DrawerTrigger>
      <DrawerContent draggable>
        <DrawerHeader className="text-left">
          <DrawerTitle>Set Price</DrawerTitle>
          <DrawerDescription>
            Customers are purchasing both hard and soft copy at this price if
            the book is available in hard copy
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 ">
            <PriceForm form={form} type={type} className="px-4" />
          </form>
        </Form>
        <DrawerFooter className="pt-2">
          {/* <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

interface PriceProps {
  form: UseFormReturn;
  className?: string;
  type: string;
}

function PriceForm({ className, form, type }: PriceProps) {
  const discount = [
    {
      value: "none",
      label: "No Discount",
    },
    {
      value: "perc",
      label: "Percentage",
    },
    {
      value: "fixed",
      label: "Fixed",
    },
  ];

  return (
    <div className={cn("w-full space-y-4", className)}>
      <FormField
        control={form.control}
        name="basePrice"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormLabel>Base Price</FormLabel>
            <FormControl>
              <Input placeholder="Enter Base Price" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <>
        <>
          <FormField
            control={form.control}
            name={`discount.type`}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Discount type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={"none"}
                    className="grid grid-cols-3 gap-3"
                  >
                    {discount.map(({ label, value }) => (
                      <FormItem
                        key={value}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={value} />
                        </FormControl>
                        <FormLabel className="font-normal">{label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </>
      </>

      <div className="w-full">
        {type === "fixed" ? (
          <div className="w-full">
            <FormField
              control={form.control}
              name={`discount.price`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Discount Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Fixed Discount Price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : type === "perc" ? (
          <div className="w-full">
            <FormField
              control={form.control}
              name={`discount.price`}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Discount Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Percentage Discount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <div className="w-full space-y-2">
            <FormLabel>No Discount Price</FormLabel>
            <Input disabled placeholder="No Discount" />
          </div>
        )}
      </div>

      <>
        <button
          //  type=""
          className={buttonVariants({
            className: "w-full mt-6",
          })}
        >
          Update Price
        </button>
      </>
    </div>
  );
}
