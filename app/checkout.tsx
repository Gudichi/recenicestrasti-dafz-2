"use client";

import PaymentElements from "@/components/payment-elements";
import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import { FAQList } from "./faq";

export const PRICE = 47;

export const ProgressBar = () => {
  const [spotCount, setSpotCount] = useState<number>(44);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpotCount((prev) => {
        if (prev >= 49) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 15000); // every 15 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm text-gray-700 mb-2">
        <span>{spotCount}/50 mjesta popunjeno</span>
        <span>{Math.round((spotCount / 50) * 100)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`bg-[#1C7C7D] h-3 rounded-full transition-all duration-500 animate-pulse`}
          style={{ width: `${(spotCount / 50) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  return (
    <div id="checkout-section" className="max-w-7xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 md:p-8">
        {/* Progress Indicator */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4 mb-4">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">
                  ✓
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600 hidden sm:inline">
                Video pogledano
              </span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 bg-green-500"></div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">
                  ✓
                </span>
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-600 hidden sm:inline">
                Ponuda odabrana
              </span>
            </div>
            <div className="w-4 sm:w-8 h-0.5 bg-[#1C7C7D]"></div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-2 md:mr-0">
                <span className="text-white text-xs sm:text-sm font-bold">
                  →
                </span>
              </div>
              <span className="text-xs sm:text-sm font-bold text-[#1C7C7D]">
                Završi kupovinu (3/3)
              </span>
            </div>
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-accent mb-4">
            🎉 Odlično! Evo što dobivaš ODMAH:
          </h2>
        </div>

        {/* Enhanced Order Recap */}
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 border-2 border-gray-200">
          <div className="space-y-4">
            {/* Main Program */}
            <div>
              <h3 className="font-sans text-accent text-xl font-bold mb-4">
                Program "Rečenice Strasti"
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Program "Rečenice Strasti"
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Timing master guide
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    WhatsApp script kolekcija
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700 font-medium">
                    Psihologija povratka
                  </p>
                </div>
              </div>
            </div>

            {/* Bonus 1 */}
            <div className="flex items-start">
              <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white text-sm font-bold">🎁</span>
              </div>
              <div className="text-left">
                <p className="font-sans text-accent text-lg font-bold">
                  BONUS 1: "Znakovi Strasti"
                </p>
                <p className="text-sm text-gray-600">
                  Vrijednost: 53€ →{" "}
                  <span className="font-bold text-green-600">BESPLATNO</span>
                </p>
              </div>
            </div>

            {/* Bonus 2 */}
            <div className="flex items-start">
              <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white text-sm font-bold">🎁</span>
              </div>
              <div className="text-left">
                <p className="font-sans text-accent text-lg font-bold">
                  BONUS 2: Knjiga "Muški Um"
                </p>
                <p className="text-sm text-gray-600">
                  Vrijednost: 73€ →{" "}
                  <span className="font-bold text-green-600">BESPLATNO</span>
                </p>
              </div>
            </div>

            {/* Bonus 3 */}
            <div className="flex items-start">
              <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                <span className="text-white text-sm font-bold">🎁</span>
              </div>
              <div className="text-left">
                <p className="font-sans text-accent text-lg font-bold">
                  BONUS 3: Seksualna Opsjednutost
                </p>
                <p className="text-sm text-gray-600">
                  Vrijednost: 107€ →{" "}
                  <span className="font-bold text-green-600">BESPLATNO</span>
                </p>
              </div>
            </div>

            {/* Price Summary */}
            <div className="border-t-2 border-gray-300 pt-6 mt-6">
              <div className="text-center">
                <div className="text-gray-500 mb-2">
                  <span className="line-through text-lg">
                    Ukupna vrijednost: 283€
                  </span>
                </div>
                <div className="text-2xl font-bold text-[#1C7C7D] mb-2">
                  Tvoja cijena danas: {PRICE}€
                </div>
                <div className="text-lg font-bold text-green-600">
                  (UŠTEDA 83%)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Payment Box */}
            <div className="border-2 border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50 shadow-sm">
              {/* Payment Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-4 text-left">
                  Odaberite način plaćanja
                </label>

                {/* Credit Card Option */}
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <input
                        type="radio"
                        id="card-payment"
                        name="payment-method"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="w-4 h-4 text-[#1C7C7D] border-gray-300 focus:ring-[#1C7C7D]"
                      />
                      <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                      <span className="font-medium text-gray-900 text-sm sm:text-base">
                        Kartica
                      </span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <img
                        src="/Visa.png"
                        alt="Visa"
                        className="h-3 w-auto sm:h-4"
                      />
                      <img
                        src="/MasterCard.png"
                        alt="Mastercard"
                        className="h-3 w-auto sm:h-4"
                      />
                      <img
                        src="/AmericanExpress.png"
                        alt="American Express"
                        className="h-3 w-auto sm:h-4"
                      />
                    </div>
                  </div>
                </div>

                {/* PayPal Option */}
                <div className="border border-gray-300 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <input
                        type="radio"
                        id="paypal-payment"
                        name="payment-method"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="w-4 h-4 text-[#1C7C7D] border-gray-300 focus:ring-[#1C7C7D]"
                      />
                      <img
                        src="/PayPall.png"
                        alt="PayPal"
                        className="w-10 h-5 sm:w-10 sm:h-6"
                      />
                      <span className="font-medium text-gray-900 text-sm sm:text-base">
                        PayPal
                      </span>
                    </div>
                    <div className="text-gray-400">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Content */}
              {paymentMethod === "card" && <PaymentElements price={PRICE} />}

              {paymentMethod === "paypal" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Plati sa PayPal računom:
                  </label>
                  <button
                    type="button"
                    disabled
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <img
                      src="/PayPall.png"
                      alt="PayPal"
                      className="w-12 h-6 mr-2"
                    />
                    Brza naplata sa PayPal
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    PayPal opcija će biti dostupna uskoro
                  </p>
                </div>
              )}
            </div>

            {/* Content outside payment box */}
            <div className="mt-6">
              {/* Guarantee Text */}
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                <p className="text-sm text-gray-700 text-center leading-relaxed">
                  Imaš 60 dana da testiraš Rečenice Strasti. Ukoliko iz bilo
                  kojeg razloga ne vidiš rezultate ili ne budeš zadovoljna, samo
                  mi pošalji email s tekstom "želim povrat novca" i bez puno
                  pitanja ti vraćam puni iznos preko WIRE Transfera na tvoj
                  bankovni račun.
                </p>
              </div>

              {/* Social Proof Text */}
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">
                  Do sada je 11 od 1800+ polaznica tražilo povrat novca
                </p>
              </div>

              {/* Availability with Progress Bar */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 sm:p-4 mb-6">
                <p className="text-sm text-orange-700 text-center mb-3">
                  Program i besplatni bonusi dostupni su do 1.11.2025. ili dok
                  se ne popuni 50 mjesta
                </p>

                {/* Progress Bar */}
                <ProgressBar />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - Independent from form */}
        <div className="mt-6">
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6">
            <h4 className="font-serif font-semibold text-gray-800 mb-4 text-center">
              Često postavljana pitanja:
            </h4>
            <FAQList
              data={[
                {
                  question: "Kada dobijem pristup?",
                  answer: "Odmah nakon plaćanja!",
                },
                {
                  question: "Je li ovo jednokratna naplata?",
                  answer: "Da, nema skrivenih troškova.",
                },
                {
                  question: "Mogu li koristiti više rečenica odjednom?",
                  answer: "Da, program te uči strategiji 'layering'.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
