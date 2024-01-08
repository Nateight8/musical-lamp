"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function BreadCrumb() {
  //step 1
  const pathname = usePathname(); //<== Get the current pathname.

  //step 2
  //   return an array of pathnames
  const pathnames = pathname.split("/").filter((path) => path); //<== return an array of strings by splitting every occurance where / is found e.g localHost:3000/shop/category becomes ["shop", "category"]

  //step 3
  return (
    <div className="h-8 sticky bg-background z-[99999] top-14 w-full border-b flex items-center justify-center">
      <ol className="flex items-center space-x-2">
        <li key={pathname}>
          <div className="flex items-center text-sm">
            <Link
              href={"/"}
              className="font-medium capitalize text-sm text-primary/40 hover:text-primary/60"
            >
              home
            </Link>

            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
            >
              <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
            </svg>
          </div>
        </li>
        {pathnames.map((label, i) => {
          //step 3.5
          const href = `/${pathnames.slice(0, i + 1).join("/")}`; //<== Return a copy of a section of an array and join with /. e.g at i = 0 for ["shop", "category"] becomes /shop/

          return (
            <li key={label}>
              <div className="flex items-center text-sm">
                <Link
                  href={href}
                  className={cn(
                    "font-medium capitalize text-sm text-primary/40 hover:text-primary/60",
                    { "text-primary/80": pathname === href } //<== style active link separately
                  )}
                >
                  {label}
                </Link>

                {i !== pathnames.length - 1 ? ( //<== we dont want the last Link to have this icon
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default BreadCrumb;
