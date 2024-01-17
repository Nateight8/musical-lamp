"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStep } from "@/lib/hooks/use-steps";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { nextStep, prevStep } = useStep();
  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <div className="h-12 bg-background sticky z-50 top-0 w-full border-border border-b flex justify-between items-center">
          <button
            onClick={prevStep}
            type="submit"
            className="flex items-center text-sm"
          >
            <ChevronLeft className=" w-4 h-4 mr-1.5" />
            BACK
          </button>
          <button
            onClick={nextStep}
            type="submit"
            className="flex items-center text-sm"
          >
            save & continue
            <ChevronRight className=" w-4 h-4 ml-1.5" />
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
