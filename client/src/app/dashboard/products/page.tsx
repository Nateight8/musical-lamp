import { Button } from "@/components/ui/button";
import React from "react";
import { Editor } from "novel";

type Props = {};

function Page({}: Props) {
  return (
    <>
      <div className="flex justify-end">
        <div>
          <Button size={"sm"} variant="outline">
            New Product
          </Button>
        </div>
      </div>
    </>
  );
}

export default Page;
