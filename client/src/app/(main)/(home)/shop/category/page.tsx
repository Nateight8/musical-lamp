import Image from "next/image";
import React from "react";

type Props = {};

function Page({}: Props) {
  return (
    <div className="px-4">
      <div className="py-4">
        <h3 className="text-lg text-primary/60">Category</h3>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-muted/20 aspect-[3/3.2] flex flex-col items-center justify-center"
          >
            <div className="bg-primary w-44 aspect-[2.5/3] shadow-sm relative">
              <Image src="/images/3.jpg" alt="" fill />
            </div>
            <div className="flex items-center flex-col py-6">
              <h3 className="text-base text-primary font-semibold">Kinfolk</h3>
              <p className="text-sm text-primary/40">Issue 31 - Architecture</p>
              <h3 className="text-base text-primary/60 font-semibold">
                $16,99
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
