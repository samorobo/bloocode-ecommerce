"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext"; // Import your theme hook

export default function Hero() {
  const { theme } = useTheme(); // Get the current theme

  return (
    <section className="mx-auto -mt-32 max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1
            className={`mb-4 text-4xl font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            } sm:text-5xl md:mb-8 md:text-6xl`}
          >
            Top Online store for a top price!
          </h1>
          <p
            className={`max-w-md leading-relaxed ${
              theme === "dark" ? "text-white" : "text-gray-500"
            } xl:text-lg`}
          >
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src="/HeroImages/Hero-image-2.webp"
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              priority
              width={500}
              height={500}
            />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src="/HeroImages/Hero-image-1.webp"
              alt="Great Photo"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
