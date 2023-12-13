"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface Props {
  description: string;
  onChange: (richText: string | undefined) => void;
}

const Tiptap = ({ description, onChange }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit.configure()],
    content: description,
    editorProps: {
      attributes: {
        class: "h-[200px]",
        // "flex mt-1 min-h-[250px] w-full rounded-md bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col w-full justify-stretch min-h-[250px] border border-border p-3 rounded-md">
      <Toolbar editor={editor} />

      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
