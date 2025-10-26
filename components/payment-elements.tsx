"use client";

import { useEffectOnce } from "@/hooks/use-effect-once";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import PaymentForm from "./payment-form";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function PaymentElements({
  price,
}: {
  price?: number | undefined;
}) {
  const [clientSecret, setClientSecret] = useState<string>("");

  useEffectOnce(() => {
    // Create PaymentIntent as soon as the component loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ data: { amount: price } }),
    })
      .then((res) => res.text())
      .then((clientSecret) => setClientSecret(clientSecret));
  });

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div role="status" aria-label="loading">
          <svg
            className="w-10 h-10 stroke-gray-700 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_9023_61563)">
              <path
                d="M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444"
                stroke="stroke-current"
                strokeWidth="1.4"
                strokeLinecap="round"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_9023_61563">
                <rect width="24" height="24" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        fonts: [
          {
            cssSrc:
              "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap",
          },
        ],
        clientSecret,
        locale: "hr",
        appearance: {
          theme: "stripe",
          variables: {
            fontFamily: "Poppins, sans-serif",
            colorPrimary: "#374151",
          },
        },
      }}
    >
      <PaymentForm />
    </Elements>
  );
}
