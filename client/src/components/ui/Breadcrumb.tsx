"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface BreadCrumb {
  label: string;
  href: string;
}

interface Props {
  breadCrumbs: BreadCrumb[];
}

function BreadCrumbs({}: Props) {
  const breadCrumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "shop",
      href: "/",
    },
    {
      label: "category",
      href: "/",
    },
  ];

  /*
  breadcrumbs is a collection of Links
  */

  return (
    <div className="h-8 sticky bg-background z-[99999] top-14 w-full border-b flex items-center justify-center">
      {/* so we put these links in an ordered list */}

      <ol className="flex items-center space-x-2">
        {/* and render them by mapping through the array of objects with corresponding hrefs and labels */}
        {breadCrumbs.map((breadCrumb, i) => {
          return (
            <li key={breadCrumb.label}>
              <div className="flex items-center text-sm">
                <Link
                  href={breadCrumb.label}
                  className={cn(
                    "font-medium capitalize text-sm text-primary/40 hover:text-primary/60"
                  )}
                >
                  {breadCrumb.label}
                </Link>

                {i !== breadCrumbs.length - 1 ? (
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

export default BreadCrumbs;
