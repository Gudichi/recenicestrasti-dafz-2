import { ClientEvent } from "@/components/client-event";
import { PostHogThankYouTracker } from "@/components/posthog-thank-you-tracker";
import { clerkClient } from "@clerk/nextjs/server";
import { AppWindow, CheckCircle, LogIn } from "lucide-react";
import Stripe from "stripe";

export type SearchParams = {
  payment_intent: string;
  payment_intent_client_secret: string;
  redirect_status: string;
};

const createUserOnClerk = async (email: string) => {
  const clerk = await clerkClient();
  const userList = await clerk.users.getUserList({ emailAddress: [email] });
  if (userList.totalCount > 0) {
    console.log("Korisnik već postoji:", email);
    return;
  }
  const user = await clerk.users.createUser({
    emailAddress: [email],
  });
  return user;
};

const processPaymentIntent = async (paymentIntentId: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId, {
    expand: ["latest_charge"],
  });

  if (paymentIntent?.status !== "succeeded") {
    return null;
  }

  console.log("Plaćanje uspješno");
  const charge = paymentIntent.latest_charge as Stripe.Charge;
  if (!charge) {
    return null;
  }
  if (!charge.billing_details?.email) {
    return null;
  }

  try {
    await createUserOnClerk(charge.billing_details.email);
  } catch (error) {
    console.error("Greška kod kreiranja korisnika:", error);
  }

  return paymentIntent;
};

export default async function CompletionPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { payment_intent, redirect_status } = await searchParams;
  let successful = false;
  let paymentIntent = null;

  if (redirect_status === "succeeded") {
    try {
      paymentIntent = await processPaymentIntent(payment_intent);
      successful = true;
    } catch (error) {
      console.error("Greška kod obrade plaćanja:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-serif text-[#64113F] mb-4">
            Čestitamo! Plaćanje je uspješno!
          </h1>

          <p className="text-lg text-[#64113F] opacity-80">
            Vaša kupovina programa "Rečenice Strasti" je uspješno završena!
          </p>

          {paymentIntent && (
            <div className="p-4 rounded-md">
              <p className="text-sm text-gray-600">
                ID transakcije:{" "}
                <span className="font-mono text-xs">{paymentIntent.id}</span>
              </p>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-gray-50 rounded-lg p-6 mt-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-[#64113F] mb-4 text-center">
              Što sada?
            </h2>

            <div className="space-y-6">
              <div className="flex items-start">
                <AppWindow className="w-5 h-5 text-[#EF798A] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-[#64113F]">
                    Pristupite web aplikaciji
                  </h3>
                  <p className="text-sm text-gray-600">
                    Klikom na gumb ispod pristupite našoj web aplikaciji.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <LogIn className="w-5 h-5 text-[#EF798A] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-[#64113F]">
                    Prijavite se na svoj račun
                  </h3>
                  <p className="text-sm text-gray-600">
                    Prijavite se koristeći email adresu koju ste koristili
                    prilikom kupovine programa.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-[#EF798A] mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-[#64113F]">
                    Počnite koristiti
                  </h3>
                  <p className="text-sm text-gray-600">
                    Počnite koristiti vaše nove materijale odmah!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-8">
              Imate pitanja? Kontaktirajte nas na recenicestrasti@gmail.com
            </p>

            <a
              href="/prijava"
              className="bg-[#EF798A] hover:bg-[#e06b7a] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Prijava u web aplikaciju →
            </a>
          </div>
        </div>
      </div>
      {successful && paymentIntent && (
        <ClientEvent
          eventCode="Purchase"
          options={{ value: paymentIntent.amount / 100, currency: "EUR" }}
        />
      )}
      <PostHogThankYouTracker
        amount={paymentIntent?.amount ? paymentIntent.amount / 100 : 47}
        currency={(paymentIntent?.currency || "eur").toUpperCase()}
      />
    </div>
  );
}
