import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Subscribe = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6 max-w-[300px] sm:max-w-[400px]   space-y-4 md:max-w-[600px] lg:max-w-[1000px] ">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <h2 className="text-xl sm:text-2xl text-white text-blacktracking-wider md:text-3xl xl:text-4xl/none ">
            Take Your Legal Practice to the Next Level
          </h2>
          <div className="flex w-full items-center flex-col  justify-between">
            <p className="text-sm md:max-w-[300px] lg:max-w-[500px] text-left text-slate-300 md:text-xl dark:text-slate-200">
              Sign up for LegalAI and start streamlining your workflows today.
            </p>
            <div className="mt-3 flex flex-col gap-2  lg:flex-row sm:flex-row">
              <Input
                className="inline-flex h-8 items-center justify-center rounded-md border border-gray-200  bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50  dark:bg-gray-200 dark:hover:bg-gray-300 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                placeholder="Enter your email"
                type="email"
              />
              <Button
                className="inline-flex h-8 items-center justify-center rounded-md bg-gray-900 px-8  md:font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:hover:bg-gray-800/90 dark:focus-visible:ring-gray-800"
                type="submit"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
