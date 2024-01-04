import { cn } from "@/lib/utils";
import React, { PropsWithChildren, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

function MaxWidth({ children, className }: Props) {
  return (
    <div className={cn("mx-auto px-4 lg:px-10 xl:px-10 w-full", className)}>
      {children}
    </div>
  );
}

export default MaxWidth;
