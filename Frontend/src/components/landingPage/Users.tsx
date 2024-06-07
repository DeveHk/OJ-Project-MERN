import { GoLaw } from "react-icons/go";

const Users = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
      <div className="container px-4 md:space-y-8 lg:space-y-10 md:px-6 max-w-[300px] sm:max-w-[400px]   space-y-4 md:max-w-[600px] lg:max-w-[1000px] ">
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl dark:text-white text-blacktracking-wider md:text-5xl xl:text-6xl/none">
            Trusted by Leading Law Firms
          </h2>
          <div className="grid  w-full  md:grid-cols-2 ">
            <p className="text-sm text-slate-600 md:text-xl  md:max-w-[300px] lg:max-w-[500px] text-left dark:text-slate-200">
              LegalAI has helped law firms of all sizes streamline their
              workflows and deliver exceptional client service.
            </p>
            <div className="grid md:gap-6 gap-4 grid-cols-5 md:grid-cols-3 lg:grid-cols-4 md:py-0 py-6 lg:pl-10 md:px-4  w-full">
              <GoLaw className="md:p-2 w-full h-full" />
              <GoLaw className="md:p-2 w-full h-full" />
              <GoLaw className="md:p-2 w-full h-full" />
              <GoLaw className="md:p-2 w-full h-full" />
              <GoLaw className="md:p-2 w-full h-full" />
              <GoLaw className="md:p-2 w-full h-full" />
              <GoLaw className="md:p-2 w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Users;
