"use client";

import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

function Page({}: Props) {
  const breadCrumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/",
    },
  ];

  const pathname = usePathname();

  const pathnameArray = pathname.split("/");

  console.log("pathname", pathname.slice(0, 2));
  console.log("path-array", pathnameArray.slice(0, 3).join("/"));

  return (
    <div className="h-screen w-full bg-secondary flex items-center justify-center"></div>
  );
}

export default Page;
