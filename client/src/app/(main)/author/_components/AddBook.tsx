import { buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

function AddBook({}: Props) {
  return (
    <>
      <Link
        href="/author/create"
        className={buttonVariants({
          variant: "outline",
          size: "sm",
          className: "rounded-full",
        })}
      >
        Add New Book <PlusIcon className="w-4 h-4  ml-1.5" />
      </Link>
    </>
  );
}

export default AddBook;
