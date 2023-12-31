"use client";
import Image from "next/image";
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
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import Hero from "@/components/store/Hero";
import Product from "@/components/store/Product";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <Product key={item} />
        ))}
      </div>
    </main>
  );
}
