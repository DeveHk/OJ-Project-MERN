import Navbar from "@/components/Commons/Navbar";
import Footer from "@/components/Commons/Footer";
import ProblemPage from "@/components/Problem/ProblemPage";
import { useParams } from "react-router-dom";
export default function Problem() {
  const { problemId } = useParams();
  return (
    <div className="min-h-screen flex justify-between w-full flex-col">
      <Navbar />
      <div className="h-full w-full flex flex-col justify-center items-center  space-y-6"></div>
      {problemId && <ProblemPage problemId={problemId} />}
      <Footer />
    </div>
  );
}
