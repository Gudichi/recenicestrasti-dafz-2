"use client";

import PaymentElements from "@/components/payment-elements";
import { RefreshCcw, ShieldCheck } from "lucide-react";

export const PRICE = 47;

export const Checkout2 = () => {
  return (
    <div id="checkout-section" className="max-w-7xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 py-6 p-4 md:p-8">
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
                Video pogledan
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

        <div className="text-center mb-6 sm:mb-8 space-y-4">
          <h2 className="font-serif italic text-primary text-xl font-medium text-pretty">
            Zadnji Korak Do Novog Ljubavnog Života
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent leading-normal mb-4">
            ZADNJI KORAK - PLAĆANJE
          </h2>
          <p className="text-lg text-accent">Instant pristup u 10 sekundi</p>
        </div>

        {/* Checkout Form */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {/* Payment Box */}
            <div className="border-2 border-gray-200 rounded-lg bg-gray-50 shadow-sm overflow-hidden">
              <div className="flex items-center justify-center py-2 bg-gray-100 border-b-2 border-gray-200 px-4 sm:px-6">
                <ShieldCheck className="mr-2 w-6 h-6 text-green-600 flex-shrink-0" />
                <div className="text-sm">
                  Stripe <strong>sigurno</strong> plaćanje
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <PaymentElements price={PRICE} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <div className="flex flex-1 items-center justify-center">
                <ShieldCheck className="mr-2 w-6 h-6 text-green-600 flex-shrink-0" />
                <div className="text-xs md:text-sm text-left">
                  100% <strong>sigurno</strong> plaćanje
                </div>
              </div>
              <div className="flex flex-1 items-center justify-center">
                <RefreshCcw className="mr-2 w-6 h-6 text-primary flex-shrink-0" />
                <div className="text-xs md:text-sm text-left">
                  <strong>60-dana</strong> garancija
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
