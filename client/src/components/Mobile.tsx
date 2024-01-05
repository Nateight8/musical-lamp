import { Button } from "./ui/button";
import { BsBag as Bag } from "react-icons/bs";

interface Props {}

export default function MobileNav() {
  return (
    <nav className="h-14 w-full border px-4 sticky top-0 bg-background z-[99999]">
      <div className="w-full h-full items-center flex  justify-between">
        <button className="px-0">
          <svg
            stroke-width="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <h3 className="text-xl">Disconnect</h3>
        <button className="px-0">
          <Bag className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}
