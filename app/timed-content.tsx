"use client";
import React, { useCallback, useEffect, useState } from "react";

import scrollDown from "@/app/anim/scroll-down.json";
import PaymentIcons from "@/components/payment-icons";
import { ProgressBar } from "@/components/progress-bar";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { event } from "@/lib/pixel";
import Lottie from "lottie-react";
import { Check, Lock, Mail, TriangleAlert } from "lucide-react";
import posthog from "posthog-js";
import { Checkout, PRICE } from "./checkout";
import { Checkout2 } from "./checkout2";
import { FAQList } from "./faq";

export const TimedContent = ({
  checkoutVersion,
}: {
  checkoutVersion: number;
}) => {
  const [checkoutExpanded, setCheckoutExpanded] = useState(false);

  // Read variant from URL directly
  const variantKey = typeof window !== "undefined" 
    ? new URLSearchParams(window.location.search).get("v") || "a"
    : "a";

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const expandCheckout = () => {
    if (!checkoutExpanded) {
      event("InitiateCheckout", { value: PRICE, currency: "EUR" });
      posthog.capture("checkout_intent", { value: PRICE, currency: "EUR" });
    }

    setCheckoutExpanded(true);
    setTimeout(() => scrollToSection("checkout-section"), 100);
  };

  useEffectOnce(() => {
    event("ViewContent");
  });

  // IntersectionObserver for offer_seen, checkout_seen, view_content
  useEffect(() => {
    const observe = (id: string, eventName: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio >= 0.5) {
              if (!sessionStorage.getItem(eventName)) {
                sessionStorage.setItem(eventName, "1");
                posthog.capture(eventName);
              }
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
    };

    observe("offer-section", "offer_seen");
    observe("checkout-section", "checkout_seen");
    observe("testimonial-section", "view_content");
  }, []);

  // Checkout abandon tracking
  useEffect(() => {
    const handler = () => {
      if (
        checkoutExpanded &&
        !sessionStorage.getItem("ph_purchased")
      ) {
        posthog.capture("checkout_abandon");
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [checkoutExpanded]);

  return (
    <React.Fragment>
      {variantKey !== "b" && (
        <div className="flex justify-center items-center relative py-8">
          <Lottie
            className="absolute w-40 h-40 z-10"
            loop={true}
            animationData={scrollDown}
          />
        </div>
      )}

      {variantKey !== "b" && (
        <div
          id="pre-testimonial-section"
          className="max-w-4xl mx-auto px-4 py-8 md:py-16"
        >
          <h3 className="text-2xl text-accent text-center mb-6 md:mb-10 font-bold leading-relaxed">
            Prije nego odustaneš i pomisliš: "ovo nije za mene", pogledaj što su
            postigle žene koje su bile u ISTOJ situaciji kao ti...
          </h3>

          <div className="grid grid-cols-1 gap-6 md:gap-8 w-full mb-12">
            {[...Array(3)].map((_, index) => (
              <img
                key={index}
                src={`testem-pre-${index + 1}-min.png`}
                alt={`Žena ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <div id="offer-section" className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="bg-white rounded-2xl md:shadow-lg md:border border-gray-100 p-0 md:p-8">
          <div className="text-center">
            {/* Main Title - Combination of fonts */}
            <div className="mb-4">
              <span className="font-sans text-3xl md:text-4xl font-bold text-accent uppercase tracking-wide">
                PROGRAM{" "}
              </span>
              <span className="font-serif text-3xl md:text-4xl font-bold text-primary italic">
                Rečenice Strasti
              </span>
            </div>

            {/* Subtitle */}
            <p className="font-serif text-xl md:text-2xl italic text-gray-600 mb-8">
              21 rečenica koje čine muškarca opsjednutim tobom
            </p>

            {/* Big Title */}
            <h2 className="font-sans text-2xl md:text-3xl font-bold text-accent uppercase text-center mb-12 leading-tight">
              EVO ŠTO ĆEŠ DOBITI AKO DANAS ODLUČIŠ TRANSFORMIRATI SVOJ LJUBAVNI
              ŽIVOT I PRISTUPITI PROGRAMU "REČENICE STRASTI":
            </h2>

            {/* Product Mockup */}
            <div className="mb-12 flex justify-center">
              <div className="max-w-md w-full">
                <img
                  src="/product-min.png"
                  alt="Program Rečenice Strasti - Product Mockup"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Value Stack - Main Program Items */}
            <div className="text-left max-w-3xl mx-auto mb-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>Program "Rečenice Strasti"</strong> – kompletna
                    formula od 21 "Sjeme dopamina" rečenice koje će učiniti da
                    muškarac postane potpuno opsjednut tobom (bez manipulacije -
                    samo čista psihologija)
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>Timing master guide</strong> – kako da znaš TOČNO
                    kada izgovoriti koju rečenicu za maksimalni učinak (ovo je
                    ključ uspjeha)
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>WhatsApp script kolekcija</strong> – gotove poruke
                    koje možeš kopirati i poslati da ga natjeraš da trči za
                    tobom
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>Psihologija povratka</strong> – kako da bivši
                    partner poželi vratiti vezu, čak i kad je rekao da je
                    "gotovo zauvijek"
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">🎁</span>
                  </div>
                  <div className="flex flex-col font-sans text-accent text-lg leading-relaxed">
                    <strong>
                      BONUS 1: "Znakovi strasti" trening (Vrijednost 53€) →
                      BESPLATNO DANAS
                    </strong>
                    <p>
                      Kako prepoznati je li STVARNO zaljubljen ili se samo igra
                      s tobom? Naučit ćeš čitati 7 nesvjesnih znakova koji
                      otkrivaju njegovu pravu namjeru (prestani pogađati - ZNAT
                      ĆEŠ sa sigurnošću)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">🎁</span>
                  </div>
                  <div className="flex flex-col font-sans text-accent text-lg leading-relaxed">
                    <strong>
                      BONUS 2: Knjiga "Razotkrivanje muškog uma" (Vrijednost
                      73€) → BESPLATNO DANAS
                    </strong>
                    <p>
                      Moj bestseller koji otkriva SVE tajne kako muškarci
                      razmišljaju, donose odluke i zašto rade ono što rade.
                      (1,200+ primjeraka prodano - sada tvoj BESPLATNO)
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">🎁</span>
                  </div>
                  <div className="flex flex-col font-sans text-accent text-lg leading-relaxed">
                    <strong>
                      BONUS 3: "Seksualna opsjednutost" Program (Vrijednost
                      107€) → BESPLATNO DANAS
                    </strong>
                    <p>
                      Kako da postaneš JEDINA žena o kojoj fantazira - čak i ako
                      je prije gledao druge žene. Naučit češ tehnike koje ga
                      čine seksualno opsjednutim SAMO tobom (bez manipulacije -
                      samo čista psihologija privlačnosti).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mb-12">
              <div className="flex flex-col justify-center items-center mb-6">
                <img
                  src="/Garancija-60d-eu.png"
                  alt="60-dnevna garancija - 100% povrat novca"
                  className="w-80 h-auto"
                />
                <p className="text-center text-base font-semibold text-accent mt-4 max-w-2xl mx-auto text-pretty leading-relaxed">
                  TROSTRUKA GARANCIJA
                </p>
              </div>
              <p className="text-center text-base text-accent mt-4 max-w-2xl mx-auto text-pretty leading-relaxed">
                EU Zakon o zaštiti potrošača garantira ti 7 dana. Ali pošto je
                1,800+ žena već dobilo rezultate uz program, ja sam toliko
                siguran da radi da sam PROŠIRIO garanciju na 60 dana (8x duže od
                zakonskog).
              </p>

              <ul className="list-none list-inside mt-6 max-w-xl mx-auto text-left text-base text-accent space-y-4">
                <li>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">1</span>
                    </div>
                    <div className="text-left leading-relaxed">
                      <strong>60-dnevni povrat novca</strong> - Nisi zadovoljna?
                      Napišeš "REFUND" na recenicestrasti@gmail.com i vraćam ti
                      100% novca.
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">2</span>
                    </div>
                    <div className="text-left leading-relaxed">
                      <strong>Rezultat ili coaching</strong> - Primijenila si
                      tehnike i nema rezultata? Dobijaš besplatnu 1-na-1
                      coaching sesiju direktno sa mnom (197€ vrijednosti).
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex gap-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">3</span>
                    </div>
                    <div className="text-left leading-relaxed">
                      <strong>Zadržavaš pristup</strong> čak i ako tražiš
                      refund, zadržavaš program + sve bonuse te moju ispriku što
                      nije bilo za tebe.
                    </div>
                  </div>
                </li>
              </ul>

              <p className="font-serif italic text-center font-bold text-xl text-primary mt-8 max-w-2xl mx-auto text-pretty">
                Shvaćaš što ovo znači?
              </p>

              <p className="text-center text-base text-accent mt-4 max-w-2xl mx-auto text-pretty">
                NAJBOLJI scenarij → Program radi, muškarac postane opsjednut
                tobom
              </p>
              <p className="text-center text-base text-accent mt-4 max-w-2xl mx-auto text-pretty">
                NAJGORI scenarij → Vraćam ti novac, zadržavaš pristup programu i
                bonusima, dobiješ besplatni coaching
              </p>

              <p className="text-center text-base text-accent mt-4 max-w-2xl mx-auto text-pretty">
                Sav rizik je na <strong>meni</strong>. Ništa na tebi.
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <p className="font-sans text-xl font-bold text-accent mb-4">
                UKUPNA VRIJEDNOST PAKETA (Sve Što Dobivaš):
              </p>

              <div className="flex flex-col mb-8 space-y-4">
                <ul className="list-none list-inside max-w-2xl mx-auto space-y-3">
                  {[
                    "Program Rečenice Strasti = Vrijednost 147€",
                    "BONUS 1: Znakovi Strasti = Vrijednost 53€",
                    "BONUS 2: Knjiga Muški Um = Vrijednost 73€",
                    "BONUS 3: Seksualna Opsj. = Vrijednost 107€",
                  ].map((value, index) => (
                    <li key={index} className="text-accent leading-relaxed">
                      <div className="flex gap-3 items-center">
                        <div className="flex justify-center items-center bg-teal-600 w-6 h-6 flex-shrink-0 rounded-full">
                          <Check className="text-white w-4 h-4" />
                        </div>
                        <div
                          className="text-sm md:text-base text-left"
                          dangerouslySetInnerHTML={{ __html: value }}
                        ></div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Original Value */}
                <p className="text-red-500 text-base">
                  <span className="line-through">UKUPNA VRIJEDNOST: 380€</span>
                </p>
              </div>

              {/* Crossed out price */}
              <p className="font-sans text-2xl font-bold text-accent mb-4">
                TVOJA CIJENA DANAS:
              </p>

              {/* Big Price */}
              <div className="text-6xl md:text-8xl font-bold text-[#1C7C7D] mb-8">
                {PRICE}€
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={expandCheckout}
              className="bg-[#1C7C7D] hover:bg-[#165a5c] text-white font-sans font-bold text-lg px-8 py-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-3xl mx-auto mb-6"
            >
              Želim pristupiti programu Rečenice Strasti i osigurati svoje
              mjesto prije nego što ponuda istekne - {PRICE} EUR
            </button>

            {checkoutExpanded ? (
              checkoutVersion == 1 ? (
                <Checkout />
              ) : (
                <Checkout2 />
              )
            ) : null}

            {/* Payment Icons */}
            <div className="mb-12">
              <PaymentIcons />
            </div>

            {/* Trust Elements */}
            <div
              id="counter-section"
              className="space-y-4 py-4 leading-relaxed text-gray-600"
            >
              <p className="text-center text-xl font-bold text-primary mb-2">
                <TriangleAlert className="inline-block mb-1 mr-1" /> NIKAD VIŠE
                PO OVOJ CIJENI
              </p>
              <p>
                Nakon 50. pristupa, cijena raste na <strong>97€</strong>!
              </p>

              <p>
                Mogu podržati maksimalno <strong>50 novih korisnica</strong>{" "}
                mjesečno zbog personalizirane e-mail podrške.
              </p>

              <p>
                Nažalost, nakon što popunimo ovaj ciklus,{" "}
                <strong>zbog velikog broja upita svakog mjeseca</strong>{" "}
                proširit ćemo broj mjesta, ali ćemo morati i{" "}
                <strong>povećati cijenu</strong> zbog većih troškova. U
                sljedećem ciklusu, koji počinje u prosincu, cijena će iznositi{" "}
                <strong>97€</strong>, a besplatni bonusi postat će plaćeni
                dodaci po stvarnoj vrijednosti navedenoj iznad.
              </p>

              <p>
                Ispod se nalazi brojač koji u stvarnom vremenu prikazuje{" "}
                <strong>broj preostalih mjesta</strong>.
              </p>

              <div className="py-4 max-w-sm mx-auto">
                <ProgressBar />
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center py-4">
            <img
              src="/SocialProof-min.png"
              alt="Social Proof - 1800+ zadovoljnih kupaca"
              className="w-full max-w-sm mx-auto h-auto rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div id="testimonial-section" className="bg-white py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Title */}
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#64113F] text-center mb-12">
            Evo što su polaznice s prošlog mjeseca rekle o programu Rečenice
            Strasti:
          </h2>

          <div className="grid grid-cols-1 gap-6 md:gap-8 w-full mb-12">
            {[...Array(6)].map((_, index) => (
              <img
                key={index}
                src={`testem-${index + 1}-min.png`}
                alt={`Žena ${index + 1}`}
              />
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mb-4">
            <button
              onClick={expandCheckout}
              className="bg-[#1C7C7D] hover:bg-[#165a5c] text-white font-sans font-bold text-xl px-12 py-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-2xl mx-auto"
            >
              OSIGURAJ SVOJE MJESTO – {PRICE}€
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <FAQList />
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-white py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-accent mb-8">
            Spremna za transformaciju svog ljubavnog života?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Pridruži se tisućama žena koje su već promijenile svoje odnose s
            ovom moćnom formulom.
          </p>
          <button
            onClick={expandCheckout}
            className="bg-[#1C7C7D] hover:bg-[#165a5c] text-white font-sans font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-md"
          >
            DA, želim pogledati video prije nego što istekne vrijeme!
          </button>

          {/* Social Proof Image */}
          <div className="my-8 flex justify-center">
            <img
              src="/SocialProof-min.png"
              alt="Rečenice strasti - Social proof"
              className="w-full max-w-xl md:max-w-lg h-auto"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-accent text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">
                Rečenice Strasti
              </h3>
              <p className="text-gray-300 mb-4">
                Transformiraj svoj ljubavni život s najmoćnijim psihološkim
                tehnikama za privlačenje i zadržavanje muškarca.
              </p>
              <div className="flex items-center text-sm text-gray-300">
                <Lock className="w-4 h-4 mr-2" />
                <span>🔒 Sigurna naplata – 256-bit SSL enkripcija</span>
              </div>
            </div>

            {/* Important Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Važni linkovi</h4>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politika privatnosti
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Uvjeti korištenja
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Politika povrata
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Kontakt</h4>
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>recenicestrasti@gmail.com</span>
                </div>
              </div>

              {/* Payment Icons */}
              <div className="mt-6">
                <p className="text-sm text-gray-300 mb-3">Prihvaćamo:</p>
                <div className="flex items-center space-x-2 opacity-70">
                  <img src="/Visa.png" alt="Visa" className="h-6 w-auto" />
                  <img
                    src="/MasterCard.png"
                    alt="Mastercard"
                    className="h-6 w-auto"
                  />
                  <img src="/PayPal.png" alt="PayPal" className="h-6 w-auto" />
                  <img src="/stripe.png" alt="Stripe" className="h-6 w-auto" />
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Rečenice Strasti. Sva prava pridržana.</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};
