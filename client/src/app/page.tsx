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

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const fileList: FileList | null = e.target.files;

    if (fileList) {
      const urls = Array.from(fileList).map((file) =>
        URL.createObjectURL(file)
      );

      setImageUrl((prevFiles) => [...prevFiles, ...urls]);
    }
  };

  return (
    <main className="flex-col flex min-h-screen items-center justify-center ">
      <form className="w-full max-w-md space-y-10">
        <Input type="file" multiple onChange={handleChange} />
      </form>
      <div className="grid grid-cols-4 w-full gap-2">
        {imageUrl &&
          imageUrl.map((url, index) => (
            <div key={index} className="h-40 w-full relative">
              <Image alt="" src={url} fill />
            </div>
          ))}
      </div>
    </main>
  );
}
