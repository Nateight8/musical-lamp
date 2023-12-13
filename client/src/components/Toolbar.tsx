"use client";
import React from "react";
import { type Editor } from "@tiptap/react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
  Link1Icon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";

type Props = {
  editor: Editor | null;
};

function Toolbar({ editor }: Props) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b border-border mb-2">
      <Toggle
        // pressed={editor.isActive("bold")}
        onPresedChange={() => editor.chain().focus().toggleBold()}
        value="bold"
        aria-label="Toggle bold"
      >
        <FontBoldIcon className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={editor.isActive("italic")}
        onPresedChange={() => editor.chain().focus().toggleItalic()}
        value="italic"
        aria-label="Toggle italic"
      >
        <FontItalicIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("strike")}
        onPresedChange={() => editor.chain().focus().toggleStrike()}
        value="strikethrough"
        aria-label="Toggle strikethrough"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={editor.isActive("bullet list")}
        onPresedChange={() => editor.chain().focus().toggleBulletList()}
        value="list"
        aria-label="Toggle strikethrough"
      >
        <ListBulletIcon className="h-4 w-4" />
      </Toggle>
      <Toggle value="link" aria-label="Toggle strikethrough">
        <Link1Icon className="h-4 w-4" />
      </Toggle>
    </div>
  );
}

export default Toolbar;
