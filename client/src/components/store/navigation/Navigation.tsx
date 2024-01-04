"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { BsBag } from "react-icons/bs";
import { cva } from "class-variance-authority";
import MaxWidth from "@/components/MaxWidth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/utils/AuthValidator";
import { Button, buttonVariants } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { RiUser6Line as UserIcon } from "react-icons/ri";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function Navigation() {
  const cart = [1, 2, 3];

  const pathname = usePathname();
  if (pathname === "/register") {
    return null;
  }
  return (
    <header className="flex bg-background sticky top-0 z-[99999] items-center justify-between h-14 w-full border-b border-border">
      <div className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Shop</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-screen h-screen">Shop</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>For Businesses</NavigationMenuTrigger>
              <NavigationMenuContent className="overflow-hidden">
                <div className={cn("h-screen w-[100vw]")}>For Business</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Search</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className={cn("h-screen w-[100vw]")}>Search</div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {/* mobile menu */}
      <div className="md:hidden w-fit px-4">
        <Button variant="ghost" size="icon">
          <HamburgerMenuIcon className="w-4 h-4" />
        </Button>
      </div>
      <Link href={"/"}>Disconnect</Link>

      {/* right nav */}

      <Menubar role="nav" className="pr-4 lg:pr-6 xl:pr-10">
        {/* modal for language and currency */}
        <Language />

        {/* help */}
        <MenubarMenu>
          <MenubarTrigger className="hidden md:block">Help</MenubarTrigger>

          <MenubarContent align="center" className="border-0 p-4 w-[22rem]  ">
            <h3 className="text-base capitalize">Customer support</h3>
            <p className="text-sm text-primary/40">
              Monday to Friday, 9am - 7pm(GMT+1) or send us an email
            </p>
          </MenubarContent>
        </MenubarMenu>

        {/* account */}
        <Account />

        {/* Bag */}
        <MenubarMenu>
          <MenubarTrigger>
            <span className="lg:block hidden">Bag ({cart.length})</span>
            <BsBag className="w-4 h-4 lg:hidden" />
          </MenubarTrigger>

          <MenubarContent align="end" className="border-0  ">
            <ScrollArea className="h-[60vh]">
              <div className="divide-y px-4">
                {cart.map((item) => (
                  <div key={item} className="w-full">
                    <div className="grid grid-cols-3 w-[24rem] py-4">
                      <div className="h-[10rem] bg-muted/20 p-4"></div>
                      <div className="col-start-2 col-span-full p-4 flex flex-col justify-between">
                        <div className="">
                          <h3 className="text-base capitalize">
                            Things fall apart
                          </h3>
                          <p className="text-sm text-primary/40">
                            Pete Edochie
                          </p>
                          <p className="text-sm text-primary/60">$77.99</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className=""></div>
                          <div className="">
                            <Button variant={"ghost"} size={"sm"}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <Button className="w-full">VIEW YOUR BAG</Button>
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </header>
  );
}

function Account() {
  const user = false;
  const form = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: TAuthCredentialsValidator) => {
    console.log(data);
  };

  return (
    <MenubarMenu>
      <MenubarTrigger>
        <span className="lg:block hidden">Account</span>
        <UserIcon className="w-4 h-4 lg:hidden" />
      </MenubarTrigger>
      {user ? (
        <MenubarContent sideOffset={14.5} className="border-0 ">
          <>
            <MenubarItem>Account details</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>My Orders</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Address Book</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Sign Out</MenubarItem>
          </>
        </MenubarContent>
      ) : (
        <MenubarContent
          align="end"
          alignOffset={-16}
          className="border-0 w-[24rem] p-4"
        >
          <>
            <div className=" py-2">
              <h3 className="pb-5">Sign In</h3>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full  space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email address </FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>

                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password </FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
                        </FormControl>

                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                  <Button size={"sm"} className="w-full tracking-wider">
                    LOGIN
                  </Button>
                </form>
              </Form>
            </div>

            <MenubarSeparator />
            <div className="py-2">
              <h3 className="pb-3 text-base text-primary">New Client?</h3>
              <p className="text-primary/40 text-sm pb-4">
                New client? Create your Discount account for faster checkot and
                much more!
              </p>
              <Link
                href="/register"
                className={buttonVariants({
                  size: "sm",
                  className: "w-full",
                })}
              >
                REGISTER
              </Link>
            </div>
          </>
        </MenubarContent>
      )}
    </MenubarMenu>
  );
}

function Language() {
  return (
    <>
      <Dialog>
        <DialogTrigger className="hidden md:block text-primary/40 py-2 px-4 text-sm hover:text-primary/60 tracking-widest">
          En/$
        </DialogTrigger>
        <DialogContent className="w-full max-w-3xl aspect-[16/6]">
          <DialogHeader>
            <DialogTitle className="text-center">
              Language & country selection
            </DialogTitle>
            <DialogDescription className="text-center max-w-lg mx-auto text-primary/60">
              Choose the language and country and then hit the submit button.
              Shipping charges, delays and taxes will automatically be updated
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
