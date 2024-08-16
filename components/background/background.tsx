"use client";

import Image from "next/image";
import background from "./background.svg";

export default function Background() {
    return <Image src={background} layout="fill" objectFit="cover" alt="background" className="absolute inset-0 -z-10" />;
}
