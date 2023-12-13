import { ScrollArea } from "@/components/ui/scroll-area";
import { Editor } from "novel";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <ScrollArea className="h-[80vh] w-full border border-border">
      <Editor className="bg-background border border-border" />
    </ScrollArea>
  );
}

export default Page;
