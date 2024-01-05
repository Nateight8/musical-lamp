"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BreadCrumb {
  label: string;
  href: string;
}

interface Props {
  // breadCrumbs: BreadCrumb[];
}

function BreadCrumb({}: Props) {
  const pathname = usePathname();

  //   return an array of pathnames
  const pathnames = pathname.split("/").filter((path) => path);

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
          const href = `/${pathnames.slice(0, i + 1).join("/")}`;

          return (
            <li key={label}>
              <div className="flex items-center text-sm">
                <Link
                  href={href}
                  className={cn(
                    "font-medium capitalize text-sm text-primary/40 hover:text-primary/60",
                    { "text-primary/80": pathname === href }
                  )}
                >
                  {label}
                </Link>

                {i !== pathnames.length - 1 ? (
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
