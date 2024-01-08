"use client";
import React from "react";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthRegisterationValidator,
  TAuthRegisterationValidator,
} from "@/utils/AuthValidator";
import Image from "next/image";

type Props = {};

function Page({}: Props) {
  const form = useForm<TAuthRegisterationValidator>({
    resolver: zodResolver(AuthRegisterationValidator),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: TAuthRegisterationValidator) {
    console.log(data);
  }

  return (
    <main className="p-2 flex min-h-screen">
      <div className="flex-1 relative hidden lg:block">
        <>
          <Image alt="" src="/slider/2.jpg" fill />
        </>
      </div>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className=" w-full max-w-md">
          <div className="pb-4">
            <h3 className="text-3xl text-primary font-bold lg:text-center">
              Create an account
            </h3>
            <p className="text-sm  lg:text-center text-primary/40">
              Enter your details and enjoy the best of both worlds
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email </FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>

                    <FormMessage />
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

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-4 w-full">
                <Button type="submit" className="w-full">
                  Sign up
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
}

export default Page;
