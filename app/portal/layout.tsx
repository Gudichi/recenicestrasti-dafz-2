import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/sign-out-button";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  if (!user) {
    redirect("/prijava");
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#FFF5EE] to-[#FFEFEA]">
      <div className="w-full bg-white py-3 text-center text-white shadow-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <a
              href="/portal"
              className="flex items-center space-x-3 lg:space-x-6"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-serif text-lg md:text-2xl font-bold">
                  R
                </span>
              </div>
              <h1 className="font-serif text-xl md:text-3xl text-accent font-semibold tracking-tight">
                Rečenice Strasti
              </h1>
            </a>
            <SignOutButton />
          </div>
        </div>
      </div>

      <main className="container max-w-6xl mx-auto p-4">
        {/* Main Content */}
        {children}
      </main>
    </div>
  );
}
