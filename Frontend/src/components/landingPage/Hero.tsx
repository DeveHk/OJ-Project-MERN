import React from "react";
import AnimatedCanvasLight from "./AnimatedCanvasLight";
import AnimatedCanvasDark from "./AmimatedCanvas";

const Hero = () => {
  return (
    <section className="h-screen py-12 md:py-24 lg:py-32 xl:py-48 ">
      {<AnimatedCanvasDark />}
      <div className=" h-full flex flex-col justify-center items-center  px-4 md:px-6">
        <div className="flex max-w-[300px] sm:max-w-[400px]  space-y-4 md:max-w-[600px] flex-col justify-center">
          <div className="space-y-3 justify-center flex-col items-center">
            <div className="text-2xl sm:text-3xl text-white tracking-wider md:text-5xl xl:text-6xl/none">
              Conquer Coding Challenges, Elevate Your Skills
            </div>
            <p className="text-sm text-slate-300 md:text-xl dark:text-slate-200">
              Online Judge is your ultimate platform for honing your
              problem-solving abilities and mastering coding concepts. Dive into
              a vast collection of challenges, compete with a thriving
              community, and unlock your full potential as a developer.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <a
              className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Start Coding
            </a>
            <a
              className="inline-flex h-8 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
{
  /* <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          {/*<Image
            alt="Hero"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            height="550"
            src="/placeholder.svg"
            width="550"
  />}
          
        </div>*/
}
