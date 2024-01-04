"use client";
import React from "react";
import MaxWidth from "../MaxWidth";
import { usePathname } from "next/navigation";

type Props = {};

function Footer({}: Props) {
  const pathname = usePathname();

  if (pathname === "/register") {
    return null;
  }

  return (
    <footer className="bg-primary text-primary-foreground h-24 w-full">
      <MaxWidth>footer</MaxWidth>
    </footer>
  );
}

export default Footer;
