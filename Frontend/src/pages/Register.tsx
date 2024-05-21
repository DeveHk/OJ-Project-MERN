import RegisterFrom from "@/components/Authentication/RegisterFrom";
import RegisterHeader from "@/components/Authentication/RegisterHeader";
import Footer from "@/components/Commons/Footer";
import Navbar from "@/components/Commons/Navbar";

export default function Register() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-md space-y-6">
        <RegisterHeader />
        <RegisterFrom />
      </div>
      <Footer />
    </>
  );
}
