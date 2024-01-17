import * as React from "react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMediaQuery } from "@react-hook/media-query";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Counter from "./Counter";
import { UseFormReturn, useForm } from "react-hook-form";
import { useFormReturnTypes } from "@/utils/BookValidator";

interface StockProps {
  form: UseFormReturn<useFormReturnTypes>;
}

export default function Stock({ form }: StockProps) {
  const [open, setOpen] = React.useState(false);
  const [stock, setStock] = React.useState(350);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  form.setValue("stock", stock);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="py-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ">
            Enter Current Stock
          </button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Edit Stock</DialogTitle>
            <DialogDescription>
              Let users know how many books are up for delivery(hard copies).
              Minimum quantity is 10. Click save when you&rsquo;re done.
            </DialogDescription>
          </DialogHeader>
          <Counter count={stock} setCount={setStock} />
          <DialogFooter>
            <DialogClose className="w-full">
              <Button className="w-full" variant="outline">
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button className="py-4 md:p-6 text-left w-full text-foreground hover:text-muted-foreground  ">
          Enter Current Stock
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Stock</DrawerTitle>
          <DrawerDescription>
            Let users know how many books are up for delivery(hard copies).
            Minimum quantity is 10. Click save when you&rsquo;re done.
          </DrawerDescription>
        </DrawerHeader>
        <>
          <Counter count={stock} setCount={setStock} className="px-4" />
        </>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <button className={buttonVariants()}>Save</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
