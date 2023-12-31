import Image from "next/image";
import React from "react";

type Props = {};

function Hero({}: Props) {
  return (
    <div className="relative h-screen w-full">
      <Image
        priority
        className="object-cover"
        fill
        quality={"100"}
        src="/images/10.jpg"
        alt=""
      />
    </div>
  );
}

export default Hero;
