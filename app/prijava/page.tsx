import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const user = await currentUser();

  if (user) {
    redirect("/portal");
  }

  return (
    <div className="min-h-screen bg-[#FFF5EE]">
      <div className="w-full bg-white py-3 text-center text-white shadow-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex items-center space-x-3 lg:space-x-6">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-serif text-lg md:text-2xl font-bold">
                R
              </span>
            </div>
            <h1 className="font-serif text-xl md:text-3xl text-accent font-semibold tracking-tight">
              Rečenice Strasti
            </h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Form */}
            <LoginForm />

            {/* Right Side - Visual */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h2 className="font-serif text-4xl lg:text-5xl text-[#8B4566] leading-relaxed mb-6">
                Dobrodošla u{" "}
                <span className="text-[#FF6B9D]">Rečenice Strasti</span>
              </h2>
              <p className="font-body text-lg lg:text-xl text-gray-800 max-w-lg mx-auto lg:mx-0 leading-relaxed mb-8">
                Otkrij snagu riječi u intimnosti i transformiraj svoju vezu kroz
                sofisticirane komunikacijske tehnike.
              </p>
              <div className="text-[#FF6B9D] text-4xl mb-6">💞</div>
              <p className="font-serif text-2xl lg:text-3xl text-[#8B4566] italic max-w-lg mx-auto lg:mx-0">
                &ldquo;Riječi su most između dva srca&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
