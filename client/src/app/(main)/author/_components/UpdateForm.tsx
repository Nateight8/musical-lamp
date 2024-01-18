"use client";
import React, { useState } from "react";
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
  FieldSchema,
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
import { authors, languages } from "@/utils/data";

type Props = {};

function UpdateForm({}: Props) {
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

  const bookTitle = "Things Fall Apart";
  const category = (value: string, fields: FieldSchema[]) => {
    const field = fields.find(({ id }) => id === value);

    return field?.value;
  };

  return (
    <div className=" h-screen w-full mx-auto pb-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "h-full relative overflow-hidden w-full mx-auto flex items-center justify-center flex-col max-w-5xl",
            step === 6 && "max-w-5xl"
          )}
        >
          <div className="absolute top-0 left-0 w-full flex py-4 justify-between items-center">
            <button
              disabled={step <= 1}
              onClick={handlePrev}
              className="text-border hover:text-primary disabled:text-border"
              // variant={"ghost"}
              // size="icon"
            >
              <ChevronLeft className="w-5 h-5 mr-1.5" />
            </button>
            {step === 5 && (
              <Button onClick={handleNext} variant={"outline"}>
                save and continue
              </Button>
            )}
          </div>
          {step === 5 && (
            <ScrollArea className="w-full h-[80vh]  sm:p-4 border border-border/30">
              <Editor className="w-full" />
            </ScrollArea>
          )}

          {step === 2 && (
            <div className="w-full  h-full grid sm:grid-cols-2 py-8">
              <div className="flex pb-4 sm:pb-0 items-center justify-center h-full">
                <>
                  <div
                    className="border-dashed hover:cursor-pointer rounded-md p-2 flex items-center relative justify-center border border-border aspect-[1/1.1] w-full max-w-sm mx-auto"
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
              <div className="h-full flex items-center justify-center sm:p-4 pb-8">
                <div className="w-full space-y-4 sm:space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className={cn()}>
                          What&rsquo;s the title of the Book?{" "}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter title Here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {availability === "order" && (
                    <FormField
                      control={form.control}
                      name="pdf"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Upload PDF</FormLabel>

                          <FormControl>
                            <Input type="file" placeholder="pdf" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {availability === "preorder" && (
                    <FormField
                      control={form.control}
                      name="pdf"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormLabel>Preorder discount</FormLabel>

                          <FormControl>
                            <Input placeholder="in percentage" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Author</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={`Select Author`} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {authors?.map(({ name, id }) => (
                              <SelectItem key={id} value={id}>
                                {name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="h-full w-full  grid grid-cols-2 py-12">
              <div className="border bg-muted/10 border-border flex items-center justify-center">
                <div className="w-full ">
                  <div className=" h-[60vh] flex relative items-center justify-center   w-full">
                    <div className="">
                      <div className="w-44 md:w-52 h-64 md:h-72 border mb-6 relative shadow-md">
                        <Image
                          src="/pin/2.jpg"
                          fill
                          alt=""
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <h3 className="font-semibold text-base text-primary/70">
                          Klinfolk
                        </h3>
                        <p className="text-sm text-primary/40">Chinu Achebe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border border-border flex items-center justify-center">
                <div className="w-full p-4 space-y-4 sm:space-y-6">
                  <FormField
                    control={form.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem className="col-span-full md:col-span-1">
                        <FormLabel>Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="What language?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {languages?.map(({ value }) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Publication Date</FormLabel>

                        <FormControl>
                          <Input placeholder="" className="" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price_digital"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Base price</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="how much is soft copy?"
                            className=""
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price_hard"
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Hard copy price</FormLabel>

                        <FormControl>
                          <Input
                            placeholder="how much is the hard copy?"
                            className=""
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="grid grid-cols-2 h-full w-full py-12">
              <div className="border border-border flex items-center justify-center">
                Shipping
              </div>
              <div className="border border-border p-4"></div>
            </div>
          )}
          {/* "ring-2 ring-muted/60 ring-offset-2 ring-offset-background", */}
          {step === 1 && (
            <div className="w-full max-w-2xl mx-auto">
              <FormLabel>This issue is:</FormLabel>
              <ToggleGroup
                className="grid sm:grid-cols-2 my-4 gap-4 w-full scale-[1] -rota12"
                type="single"
                variant="outline"
                size="lg"
                onValueChange={(value) => setAvailability(value)}
              >
                <ToggleGroupItem value="order" className="">
                  Available on demand(published)
                </ToggleGroupItem>
                <ToggleGroupItem value="preorder">
                  Only on Preorder(WIP)
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          )}

          {step === 20 && (
            <>
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className={formLabel}>
                      Upload the digital copy of your masterpiece
                    </FormLabel>
                    <FormControl>
                      <Input type="file" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {step === 8 && (
            <>
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className={formLabel}>
                      What language is the book written in?
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={"Me"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`What Genre does your piece belong?`}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages?.map(({ value }) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
          {step === 9 && (
            <>
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className={formLabel}>
                      When was it published?
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={"Me"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={`What Genre does your piece belong?`}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages?.map(({ value }) => (
                          <SelectItem key={value} value={value}>
                            {value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {/* {step === 3 && (
            <div className="h-full w-full max-w-md mx-auto py-10 flex items-center justify-center">
              <div className="w-full border border-border">
                <div className="bg-muted/10 h-[60vh] flex relative items-center justify-center   w-full">
                  <div className="">
                    <div className="w-44 md:w-52 h-64 md:h-72 border mb-6 relative shadow-md">
                      <Image
                        src="/pin/2.jpg"
                        fill
                        alt=""
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-base text-primary/70">
                        Klinfolk
                      </h3>
                      <p className="text-sm text-primary/40">Chinu Achebe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )} */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl border">
            {step !== 5 && (
              <Button
                disabled={!availability}
                onClick={handleNext}
                className="w-full"
              >
                Continue...
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UpdateForm;
