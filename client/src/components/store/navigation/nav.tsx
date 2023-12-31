import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavMenu } from "./RightNav";
import { Button } from "@/components/ui/button";
import { LeftNav } from "./LeftNav";
import { MobileNav } from "./mobileNav";

type Props = {};

function NavBar({}: Props) {
  return (
    <nav className="px-4 z-50  fixed top-0 w-full bg-primary">
      <div className="flex items-center justify-between h-12 w-full">
        <div className="">
          {/* <LeftNav /> */}

          <div className="hidden md:block">
            {["Shop", "Collections", "Brands"].map((item) => (
              <button className="bg-transparent px-4 text-white" key={item}>
                {item}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-bold text-primary-foreground text-base text-center tracking-wider">
            Reign
          </h1>
        </div>
        <div className="flex space-x-2 items-center">
          <NavMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
