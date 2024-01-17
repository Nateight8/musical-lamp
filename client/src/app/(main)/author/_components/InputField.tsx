"use client";

import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TitleProps {}

export default function InputField({}: TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle("UNTITLED");
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <>
      <div className="flex items-center gap-x-1 w-full mb-4 ">
        {isEditing ? (
          <Input
            ref={inputRef}
            onClick={enableInput}
            onBlur={disableInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={title}
            className="h-6 text-sm px-2 focus-visible:ring-transparent w-full"
          />
        ) : (
          <Button
            onClick={enableInput}
            variant="ghost"
            size="sm"
            className="font-normal h-6 text-sm p-1 w-full justify-start hover:bg-transparent hover:border border-input"
          >
            {title}
          </Button>
        )}
      </div>
    </>
  );
}
