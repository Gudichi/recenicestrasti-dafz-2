"use client";

import { Heart, Lock, Mail } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Checkout, PRICE, ProgressBar } from "./checkout";
import { FAQList } from "./faq";
import { event } from "@/lib/pixel";

const formatTime = (time: number) => time.toString().padStart(2, "0");

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 19,
    minutes: 27,
    seconds: 0,
  });
  const [checkoutExpanded, setCheckoutExpanded] = useState(false);

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
    }

    setCheckoutExpanded(true);
    setTimeout(() => scrollToSection("checkout-section"), 100);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev; // Stop at 00:00:00
        }

        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }

        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-12">
        {/* Main Headline */}
        <h1 className="font-serif text-3xl md:text-6xl font-bold text-accent text-center mb-4 md:mb-8 leading-tight">
          Postoji Jedna Rečenica Od 6 Riječi Koja Počinje Slovom 'F' koja čini
          da se muškarac ludo zaljubi u tebe I Briše Svaku Drugu Ženu Iz
          Njegovog Uma
        </h1>

        {/* Sub-headline */}
        <h2 className="font-serif text-lg md:text-2xl text-accent text-center mb-4 md:mb-8 leading-relaxed max-w-3xl mx-auto font-semibold">
          Ako se udaljio, postao hladan ili 'trebate razmotriti odnos' -
          zaboravite na 'razgovore o odnosu' koji ga tjeraju da bježi. Pošaljite
          mu WhatsApp poruku s ovom rečenicom danas navečer i za 24 sata padat
          će na koljena pred vašim vratima
        </h2>

        {/* Wistia Video Section */}
        <div className="mb-6 flex justify-center">
          <div
            className="wistia-wrapper"
            style={{ position: "relative", maxWidth: "900px", width: "100%" }}
          >
            <div
              className="wistia_embed wistia_async_w91eh5o6nn"
              style={{ aspectRatio: "16/9" }}
            ></div>
          </div>
        </div>

        {/* Sub-sub headline */}
        <h3 className="font-sans text-base md:text-xl text-primary text-center mb-6 md:mb-12 font-medium">
          Pogledajte kratki video poviše da saznaš koja je to točno rečenica i
          kako je poslati da postigne maksimalni učinak u 24 sata 🎯
        </h3>

        {/* Social Proof Image */}
        <div className="mb-6 flex justify-center">
          <img
            src="/SocialProof.png"
            alt="Social Proof - Ljudi koji su već dobili rezultate"
            className="w-full max-w-lg md:max-w-md h-auto"
          />
        </div>
      </div>

      {/* All-in-One Offer Section - TEST PAGE: Always visible */}
      {/* CTA Button below video - TEST PAGE: Always visible */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="text-center">
          <button
            onClick={() => scrollToSection("offer-section")}
            className="bg-[#1C7C7D] hover:bg-[#165a5c] text-white font-sans font-bold text-lg px-8 py-4 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-md"
          >
            Želim pristupiti programu Rečenice Strasti i osigurati svoje mjesto
            prije nego što ponuda istekne
          </button>

          {/* Social Proof Image */}
          <div className="mt-6 flex justify-center">
            <img
              src="/SocialProof.png"
              alt="Rečenice strasti - Social proof"
              className="w-full max-w-xl md:max-w-lg h-auto"
            />
          </div>
        </div>
      </div>

      <div id="offer-section" className="max-w-4xl mx-auto px-4 py-16">
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
                  src="/PRODUCT.png"
                  alt="Program Rečenice Strasti - Product Mockup"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Value Stack - Main Program Items */}
            <div className="text-left max-w-3xl mx-auto mb-12">
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

                <div className="flex items-start mt-8">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>3 EKSKLUZIVNA BONUSA</strong> – svaki bonus sam
                    dodao da ti ukloni sve prepreke između tebe i savršene veze:
                  </p>
                </div>

                <div className="flex items-start ml-8">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>
                      BONUS 1: "Znakovi strasti" trening (vrijednost 53€)
                    </strong>{" "}
                    – kako prepoznati je li stvarno zaljubljen ili se samo igra
                    s tobom
                  </p>
                </div>

                <div className="flex items-start ml-8">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>
                      BONUS 2: Knjiga "Razotkrivanje muškog uma" (vrijednost
                      73€)
                    </strong>{" "}
                    – bestseller koji objašnjava sve tajne muškaraca
                  </p>
                </div>

                <div className="flex items-start ml-8">
                  <div className="w-6 h-6 bg-[#1C7C7D] rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="font-sans text-accent text-lg leading-relaxed">
                    <strong>
                      BONUS 3: "Seksualna opsjednutost" program (vrijednost
                      107€)
                    </strong>{" "}
                    – kako da bude seksualno opsjednut samo tobom
                  </p>
                </div>
              </div>
            </div>

            {/* Guarantee */}
            <div className="mb-12">
              <div className="flex justify-center">
                <img
                  src="/Garancija-60d.png"
                  alt="60-dnevna garancija - 100% povrat novca"
                  className="w-80 h-auto"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-4 max-w-2xl mx-auto">
                Zakon o zaštiti potrošača garantira ti 7 dana. Ali pošto je 1847
                žena već dobilo rezultate uz Rečenice strasti, ja ti dajem punu
                60-dnevnu garanciju.
                <br />
                <br />
                Toliko sam siguran da će program raditi da produžavam garanciju
                8 puta.
                <br />
                <br />
                Primijeni tehnike, ako ne vidiš promjenu u njegovom ponašanju -
                vraćam ti 100% novca i zadržavaš pristup programu. Sve je na
                meni. Ništa na tebi.
              </p>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              {/* Original Value */}
              <p className="text-red-500 text-lg mb-2">
                <span className="line-through">UKUPNA VRIJEDNOST: 283€</span>
              </p>

              {/* Crossed out price */}
              <p className="font-sans text-xl font-bold text-accent mb-4">
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
              mjesto prije nego što ponuda istekne
            </button>

            {checkoutExpanded && <Checkout />}

            {/* Payment Icons */}
            <div className="mb-6">
              <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                <img src="/Visa.png" alt="Visa" className="h-8 w-auto" />
                <img
                  src="/MasterCard.png"
                  alt="Mastercard"
                  className="h-8 w-auto"
                />
                <img
                  src="/AmericanExpress.png"
                  alt="American Express"
                  className="h-8 w-auto"
                />
                <img
                  src="/GooglePay.png"
                  alt="Google Pay"
                  className="h-8 w-auto"
                />
                <img
                  src="/Applepay.png"
                  alt="Apple Pay"
                  className="h-8 w-auto"
                />
                <img src="/PayPall.png" alt="PayPal" className="h-8 w-auto" />
                <img
                  src="/RevolutPay.png"
                  alt="Revolut Pay"
                  className="h-8 w-auto"
                />
                <img src="/stripe.png" alt="Stripe" className="h-8 w-auto" />
              </div>
            </div>

            {/* Social Proof */}
            <div className="text-center">
              <img
                src="/SocialProof.png"
                alt="Social Proof - 1800+ zadovoljnih kupaca"
                className="w-full max-w-sm mx-auto h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Section Title */}
          <h2 className="font-sans text-2xl md:text-3xl font-bold text-[#64113F] text-center mb-12">
            Evo što su polaznice s prošlog mjeseca rekle o programu Rečenice
            Strasti:
          </h2>

          {/* Heart Pattern Background */}
          <div className="relative">
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 32 }).map((_, i) => (
                  <Heart key={i} className="w-4 h-4 text-[#F7A9A8]" />
                ))}
              </div>
            </div>

            {/* Testimonials Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
              {/* Testimonial 1 */}
              <div>
                <img
                  src="/Testm1 copy.png"
                  alt="Testimonial Tea Mandić - Facebook post i WhatsApp poruke"
                  className="w-full h-auto"
                />
              </div>

              {/* Testimonial 2 */}
              <div>
                <img
                  src="/testm2 copy.png"
                  alt="Testimonial Emanuela Radan i Milena Jukic - WhatsApp razgovori"
                  className="w-full h-auto"
                />
              </div>

              {/* Testimonial 3 */}
              <div>
                <img
                  src="/testm3 copy.png"
                  alt="Testimonial Silvija Kovač i Tihana Zagar - Facebook post i WhatsApp"
                  className="w-full h-auto"
                />
              </div>

              {/* Testimonial 4 */}
              <div>
                <img
                  src="/testm4 copy.png"
                  alt="Testimonial Dora Mamut i Luna Vukanović - WhatsApp i Facebook"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Trust Elements */}
          <div id="counter-section" className="text-center mb-8">
            <p className="font-sans text-lg font-bold text-[#64113F] mb-2">
              ⚠️ SAMO 50 MJESTA MJESEČNO DOSTUPNO
            </p>
            <p className="text-gray-600 mb-4">
              Razlog: Osobno odgovaram na sva pitanja
            </p>

            {/* Progress Bar */}
            <div className="max-w-2xl mx-auto">
              <ProgressBar />
            </div>
          </div>

          {/* Guarantee */}
          <div className="text-center mb-8">
            <div className="border border-gray-300 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="font-sans text-lg font-semibold text-accent">
                🔒 60-DNEVNA GARANCIJA – Ako ne vidiš rezultate → 100% povrat
                novca
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mb-6">
            <button
              onClick={expandCheckout}
              className="bg-[#1C7C7D] hover:bg-[#165a5c] text-white font-sans font-bold text-xl px-12 py-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 w-full max-w-2xl mx-auto"
            >
              OSIGURAJ SVOJE MJESTO – {PRICE}€
            </button>
          </div>

          {/* Payment Icons */}
          <div className="mb-8">
            <div className="grid grid-cols-4 md:grid-cols-8 max-w-2xl mx-auto gap-2">
              <img src="/Visa.png" alt="Visa" className="h-8 w-auto" />
              <img
                src="/MasterCard.png"
                alt="Mastercard"
                className="h-8 w-auto"
              />
              <img
                src="/AmericanExpress.png"
                alt="American Express"
                className="h-8 w-auto"
              />
              <img
                src="/GooglePay.png"
                alt="Google Pay"
                className="h-8 w-auto"
              />
              <img src="/Applepay.png" alt="Apple Pay" className="h-8 w-auto" />
              <img src="/PayPall.png" alt="PayPal" className="h-8 w-auto" />
              <img
                src="/RevolutPay.png"
                alt="Revolut Pay"
                className="h-8 w-auto"
              />
              <img src="/stripe.png" alt="Stripe" className="h-8 w-auto" />
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="text-center">
            <p className="font-sans text-gray-600 mb-4">
              ⏰ OSTALO TI JE SAMO:
            </p>
            <div className="inline-block border-2 border-green-300 text-gray-800 px-6 py-3 rounded-lg">
              <div className="text-2xl font-bold font-mono">
                {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:
                {formatTime(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <FAQList />
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-white py-16">
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
          <div className="mt-6 flex justify-center">
            <img
              src="/SocialProof.png"
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
                  <img src="/PayPall.png" alt="PayPal" className="h-6 w-auto" />
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
    </div>
  );
}
