"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { RadioGroupItem } from "@radix-ui/react-radio-group";
import React from "react";

type Props = {};

function BasicInfo({}: Props) {
  return (
    <div className="h-screen w-full max-w-4xl mx-auto flex flex-col">
      <div className="h-14"></div>
      <div className="flex-1 w-full  border-y  p-4 grid grid-cols-3 divide-x">
        <div className="px-4">
          <h3 className="text-lg">Author</h3>
          <></>
        </div>
        <div className="px-4">
          <h3 className="text-lg">Genre</h3>
        </div>
        <div className="px-4">
          <div className="h-24">
            <h3 className="text-lg">Language</h3>
          </div>
          <div className="">
            <h3 className="text-lg">Availability</h3>
          </div>
        </div>
      </div>
      <div className="py-2 flex justify-end">
        <Button size="sm">Save & continue</Button>
      </div>
    </div>
  );
}

export default BasicInfo;
