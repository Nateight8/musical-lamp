import BreadCrumb from "@/components/BreadCrumb";
import React, { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <BreadCrumb />
      <main className="min-h-screen w-full">{children}</main>
    </>
  );
}

export default Layout;
