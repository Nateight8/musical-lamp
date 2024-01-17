import Image from "next/image";
import React from "react";

type Props = {
  name: string;
};

function ProductName({ name }: Props) {
  return (
    <div className="flex items-center space-x-4 w-full overflow-hidden ">
      <div className="w-14 h-16 border bg-muted/10">
        <Image src={"/pin/2.jpg"} alt="" width={64} height={4} />
      </div>

      <div className="">
        <h1 className="whitespace-nowrap truncate w-[28rem] capitalize ">
          {name}
        </h1>
        <p className="text-xs text-muted-foreground">SKU-1551</p>
      </div>
    </div>
  );
}

export default ProductName;
