"use client";

import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useSignIn } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState(searchParams.get("prefill_email") || "");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useQueryState<number>(
    "pending",
    parseAsInteger.withDefault(0)
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmailCode = async (email: string) => {
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        strategy: "email_code",
      });

      if (result.status === "needs_first_factor") {
        setPendingVerification(1);
      }
    } catch (err: any) {
      setError("Slanje koda nije uspjelo");
    }
  };

  const verifyCode = async () => {
    if (!setActive) return;

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "email_code",
        code,
      });

      if (result?.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/portal";
      } else {
        setError("Pogrešan kod");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      console.error(err);
      setError("Verifikacija koda nije uspjela");
      setIsSubmitting(false);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    if (email) {
      setError("");
      setEmail(email);
      sendEmailCode(email);
    }
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    verifyCode();
  };

  return (
    <div className="flex order-2 lg:order-1 w-full items-center justify-center">
      <div className="max-w-md rounded-lg bg-white shadow-lg overflow-hidden">
        <div className="p-8 md:p-12 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-serif text-4xl text-accent">Prijavi se</h1>
            {!pendingVerification && (
              <p className="text-center text-gray-500 text-md">
                Unesi svoju email adresu za pristup programu
              </p>
            )}
          </div>
          {pendingVerification > 0 ? (
            <form onSubmit={handleCodeSubmit}>
              <p className="text-gray-500 text-center">
                Unesi sigurnosni kod koji smo ti poslali na <strong>{email}</strong>
              </p>
              <div className="mb-4">
                <div className="flex flex-col justify-center items-center my-6">
                  <InputOTP maxLength={6} onChange={setCode} required>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button
                className="w-full rounded-md bg-primary py-2 px-4 text-white"
                type="submit"
                size="lg"
              >
                {isSubmitting && (
                  <svg
                    className="-ml-1 size-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
                <span>
                  {isSubmitting ? "Prijava u tijeku..." : "Prijavi se"}
                </span>
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email adresa
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded border border-gray-300 p-2 text-md focus:border-primary focus:outline-none"
                  placeholder="tvoj@email.com"
                  defaultValue={email}
                  required
                />
              </div>
              <Button
                className="w-full rounded-md bg-primary py-2 px-4 text-white"
                type="submit"
                size="lg"
              >
                <span>Pošalji OTP kod</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          )}
          {error && (
            <div className="text-red-500 mt-4 text-sm text-center">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
};
