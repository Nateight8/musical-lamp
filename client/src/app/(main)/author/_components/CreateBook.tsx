"use client";
import React, { useRef, useState } from "react";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Textarea } from "@/components/ui/textarea";
import InputField from "./InputField";
import Price from "./Price";
import Stock from "./Stock";
import { useStep } from "@/lib/hooks/use-steps";

type Props = {};

function CreateBook({}: Props) {
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
  const [editing, setEditing] = useState(false);
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
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("");
  const enableEditing = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(event.target.value);
  };

  const disableInput = () => {
    setEditing(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  const { nextStep, prevStep } = useStep();
  return (
    <>
      <div className="lg:py-4 xl:py-6">
        <div className="lg:flex ">
          <div className="h-[60vh] lg:h-[80vh]  flex-1 w-full bg-muted/10 flex items-center justify-center">
            <div className="w-52 md:w-72  ">
              <>
                <div
                  className="border-dashed hover:cursor-pointer p-2 flex items-center relative justify-center border border-border aspect-[1/1.2] w-full max-w-sm mx-auto"
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
          </div>
          <div className=" lg:p-6 flex-1 divide-y divide-border">
            <div className="p-4 space-y-4 lg:px-0 md:flex lg:block justify-between w-fit md:w-full lg:w-full">
              <div className="w-full flex flex-col items-start">
                {editing ? (
                  <Textarea
                    rows={1}
                    ref={inputRef}
                    placeholder="UNTITLED BOOK"
                    onBlur={disableInput}
                    onKeyDown={onKeyDown}
                    onChange={onChange}
                    value={title}
                    className="w-full text-2xl h-fit text-primary/60 p-0 focus-visible:ring-0 border-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={enableEditing}
                    className="text-2xl text-primary/80"
                  >
                    {title || "UNTITLED BOOK"}
                  </button>
                )}

                <p className="text-base text-primary/40">
                  Issue 31 -Architecture
                </p>
                <Price />
                {/*stock or preorder indicator */}
              </div>

              {/* ADD TO CART */}
              <Button className="w-full">ADD TO CART</Button>
            </div>
            <div className="p-4 lg:px-0 flex items-center space-x-1.5">
              <div className="h-1 w-1 bg-stone-600 rounded-full" />
              {/* Delivery to countries */}
              <h3 className="text-primary/60 text-sm font-medium">
                Delivery to 0 countries{" "}
                <span className="font-normal text-primary/40">
                  [update in next slide]
                </span>
              </h3>
            </div>
            <div className="py-4 lg:px-0">
              <div className="flex flex-col items-center">
                <ScrollArea className="w-full  h-[32vh] border border-border/30">
                  <Editor className="w-full" />
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBook;
