import LoginFrom from "@/components/AuthenticationPages/LoginFrom";
import LoginHeader from "@/components/AuthenticationPages/LoginHeader";
import Footer from "@/components/Commons/Footer";
import Navbar from "@/components/Commons/Navbar";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-md space-y-6">
        <LoginHeader />
        <LoginFrom />
      </div>
      <Footer />
    </>
  );
}
