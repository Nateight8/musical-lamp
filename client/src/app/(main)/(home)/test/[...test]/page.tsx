"use client";
import BreadCrumb from "@/components/BreadCrumb";
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
    <div className="h-screen w-full bg-secondary flex items-center justify-center">
      <BreadCrumb breadCrumbs={breadCrumbs} />
    </div>
  );
}

export default Page;
