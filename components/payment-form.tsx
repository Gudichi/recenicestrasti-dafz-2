import { event } from "@/lib/pixel";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerEmail, setCustomerEmail] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        payment_method_data: {
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
        return_url: `${window.location.origin}/hvala?redirect_status=succeeded`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {/* <LinkAuthenticationElement id="link-authentication-element" /> */}
        {/* Customer Information Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Ime i prezime*
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Vaše ime i prezime"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C7C7D] focus:border-transparent text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
              Email adresa*
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="vaš@email.com"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1C7C7D] focus:border-transparent text-sm sm:text-base"
              required
            />
          </div>
        </div>
        <div className="md:p-4 md:bg-white md:border md:border-gray-300 md:rounded-md">
          <h4 className="font-serif text-sm font-medium text-gray-700 mb-3">
            Podaci za plaćanje
          </h4>
          <PaymentElement
            id="payment-element"
            options={{
              layout: {
                type: "tabs",
                defaultCollapsed: false,
              },
            }}
          />
        </div>
        <button
          className="w-full bg-[#1C7C7D] hover:bg-[#165a5c] text-white py-4 px-4 sm:py-8 sm:px-8 rounded-lg font-bold text-lg sm:text-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
          type="submit"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          {isLoading ? (
            <svg
              className="mr-2 sm:mr-3 size-5 animate-spin text-white"
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
          ) : (
            <ArrowRight className="w-8 h-8 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
          )}
          <span className="text-center">
            {isLoading
              ? "Plaćanje u tijeku..."
              : "Plati SAD, i pristupi programu ODMAH"}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </div>
    </form>
  );
}
