"use client";

import React, { useCallback, useEffect, useState } from "react";
import PaymentIcons from "@/components/payment-icons";
import { useEffectOnce } from "@/hooks/use-effect-once";
import { event } from "@/lib/pixel";
import {
  Check,
  Lock,
  Mail,
  Brain,
  Clock,
  MessageSquare,
  Heart,
  Sparkles,
  Shield,
  Users,
  Award,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import posthog from "posthog-js";
import { Checkout, PRICE } from "../checkout";

export default function BrendPage() {
  const [checkoutExpanded, setCheckoutExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setMobileMenuOpen(false);
  }, []);

  const expandCheckout = () => {
    if (!checkoutExpanded) {
      event("InitiateCheckout", { value: PRICE, currency: "EUR" });
      posthog.capture("checkout_intent", { value: PRICE, currency: "EUR" });
    }
    setCheckoutExpanded(true);
    setTimeout(() => scrollToSection("checkout-section"), 150);
  };

  useEffectOnce(() => {
    event("ViewContent");
  });

  // IntersectionObserver for tracking
  useEffect(() => {
    const setup = (id: string, eventName: string) => {
      const el = document.getElementById(id);
      if (!el) {
        console.warn(`PostHog: element "${id}" not found, skipping ${eventName}`);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !sessionStorage.getItem(eventName)) {
              sessionStorage.setItem(eventName, "1");
              posthog.capture(eventName);
            }
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -120px 0px" }
      );

      observer.observe(el);
    };

    setup("why-it-works", "offer_seen");
    setup("checkout-section", "checkout_seen");
    setup("proof-section", "view_content");
  }, []);

  // Checkout abandon tracking
  useEffect(() => {
    const handler = () => {
      if (checkoutExpanded && !sessionStorage.getItem("ph_purchased")) {
        posthog.capture("checkout_abandon");
      }
    };

    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [checkoutExpanded]);

  // Add Inter font via useEffect
  useEffect(() => {
    if (!document.querySelector('link[href*="fonts.googleapis.com/css2?family=Inter"]')) {
      const link = document.createElement("link");
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F1EC]" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E9C9C3]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="font-serif text-2xl font-bold text-[#1A1412]">
                Rečenice Strasti
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("why-it-works")}
                className="text-[#1A1412] hover:text-[#C24858] transition-colors text-sm font-medium"
              >
                Zašto djeluje
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-[#1A1412] hover:text-[#C24858] transition-colors text-sm font-medium"
              >
                Kako funkcionira
              </button>
              <button
                onClick={() => scrollToSection("proof-section")}
                className="text-[#1A1412] hover:text-[#C24858] transition-colors text-sm font-medium"
              >
                Dojmovi
              </button>
              <button
                onClick={() => scrollToSection("pricing-section")}
                className="text-[#1A1412] hover:text-[#C24858] transition-colors text-sm font-medium"
              >
                Cijena
              </button>
              <button
                onClick={expandCheckout}
                className="bg-[#C24858] hover:bg-[#B03E4D] text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                Prijava
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#1A1412]"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4 border-t border-[#E9C9C3]/30">
              <button
                onClick={() => scrollToSection("why-it-works")}
                className="block w-full text-left text-[#1A1412] hover:text-[#C24858] transition-colors py-2"
              >
                Zašto djeluje
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="block w-full text-left text-[#1A1412] hover:text-[#C24858] transition-colors py-2"
              >
                Kako funkcionira
              </button>
              <button
                onClick={() => scrollToSection("proof-section")}
                className="block w-full text-left text-[#1A1412] hover:text-[#C24858] transition-colors py-2"
              >
                Dojmovi
              </button>
              <button
                onClick={() => scrollToSection("pricing-section")}
                className="block w-full text-left text-[#1A1412] hover:text-[#C24858] transition-colors py-2"
              >
                Cijena
              </button>
              <button
                onClick={expandCheckout}
                className="block w-full bg-[#C24858] hover:bg-[#B03E4D] text-white px-6 py-3 rounded-full font-medium text-center transition-all"
              >
                Prijava
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1412] mb-6 leading-tight">
              Reci prave riječi u pravo vrijeme.
            </h1>
            <p className="text-xl md:text-2xl text-[#1A1412]/80 mb-8 leading-relaxed max-w-3xl mx-auto">
              Psihološki vođene poruke i mentorstvo koje vraća pažnju, strast i
              sigurnost — bez igara.
            </p>

            {/* Bullets */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C24858] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white w-4 h-4" />
                </div>
                <p className="text-left text-[#1A1412] text-base leading-relaxed">
                  7 putanja za tvoju točnu situaciju
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C24858] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white w-4 h-4" />
                </div>
                <p className="text-left text-[#1A1412] text-base leading-relaxed">
                  Točno što reći i kada
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#C24858] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-white w-4 h-4" />
                </div>
                <p className="text-left text-[#1A1412] text-base leading-relaxed">
                  Mentori odgovaraju u 24h
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={expandCheckout}
                className="bg-[#C24858] hover:bg-[#B03E4D] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 transform hover:scale-105 hover:shadow-xl w-full sm:w-auto"
              >
                Želim svoj plan
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="border-2 border-[#C24858] text-[#C24858] hover:bg-[#C24858] hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 w-full sm:w-auto"
              >
                Pogledaj kako radi
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Works Section */}
      <section
        id="why-it-works"
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1412] text-center mb-12">
              Zašto to funkcionira
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Card 1 */}
              <div className="bg-[#F6F1EC] rounded-2xl p-8 border border-[#E9C9C3]/30">
                <div className="w-12 h-12 bg-[#C24858] rounded-full flex items-center justify-center mb-6">
                  <Brain className="text-white w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1412] mb-3">
                  Muški mozak & dopamin
                </h3>
                <p className="text-[#1A1412]/80 leading-relaxed">
                  Učimo te rečenice koje aktiviraju želju i fokus.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#F6F1EC] rounded-2xl p-8 border border-[#E9C9C3]/30">
                <div className="w-12 h-12 bg-[#C24858] rounded-full flex items-center justify-center mb-6">
                  <Clock className="text-white w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1412] mb-3">
                  Tajming
                </h3>
                <p className="text-[#1A1412]/80 leading-relaxed">
                  Ista rečenica u krivom trenutku = problem. Dajemo precizan
                  ritam.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#F6F1EC] rounded-2xl p-8 border border-[#E9C9C3]/30">
                <div className="w-12 h-12 bg-[#C24858] rounded-full flex items-center justify-center mb-6">
                  <MessageSquare className="text-white w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1A1412] mb-3">
                  Mentorski feedback
                </h3>
                <p className="text-[#1A1412]/80 leading-relaxed">
                  Pošalješ što si slala — dobiješ upute što dalje.
                </p>
              </div>
            </div>

            {/* Quote Strip */}
            <div className="bg-[#F6F1EC] rounded-2xl p-8 md:p-12 border-l-4 border-[#C24858]">
              <p className="font-serif text-xl md:text-2xl italic text-[#1A1412] text-center leading-relaxed">
                "Radimo zajedno s tobom tako da svaki muškarac osjeti da si žena
                koju ne želi izgubiti."
              </p>
              <p className="text-center mt-4 text-[#1A1412]/60 font-medium">
                — Bono Akrapović
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-[#F6F1EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1412] text-center mb-4">
              Kako to funkcionira
            </h2>
            <p className="text-center text-[#1A1412]/80 mb-12 text-lg leading-relaxed">
              Program počinje tako što popuniš kratku formu i podneseš prijavu.
            </p>

            {/* Steps */}
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E9C9C3]/30 shadow-sm">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#C24858] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1A1412] mb-4">
                      Uđi u aplikaciju, otvori 7 situacijskih putanja i odaberi
                      onu koja opisuje tvoju vezu
                    </h3>
                    <p className="text-[#1A1412]/80 mb-4 leading-relaxed">
                      Gotovo za manje od minutu nakon prijave
                    </p>
                    <div className="bg-[#F6F1EC] rounded-xl p-6 border-l-4 border-[#D2A95B]">
                      <p className="text-[#1A1412] leading-relaxed mb-3">
                        <strong>Program je podijeljen u 7 putanja jer... tvoja situacija NIJE ista kao ____</strong>
                      </p>
                      <p className="text-[#1A1412]/80 leading-relaxed mb-3">
                        Ako te bivši ignorira već 3 mjeseca... NE trebaš iste
                        rečenice kao cura kojoj je momak tek prije tjedan dana
                        postao hladan.
                      </p>
                      <p className="text-[#1A1412]/80 leading-relaxed mb-3">
                        Ako si u braku gdje nema kemije... NE trebaš iste
                        rečenice kao cura kojoj se simpatija ne javlja.
                      </p>
                      <p className="text-[#1A1412] leading-relaxed font-medium">
                        Zato smo sve razbili u 7 jasnih putanja.
                      </p>
                      <p className="text-[#1A1412] leading-relaxed font-medium mt-2">
                        Odabereš svoju → Sve ostalo je već planirano.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E9C9C3]/30 shadow-sm">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#C24858] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1A1412] mb-4">
                      Testiraj "Rečenice Strasti"
                    </h3>
                    <p className="text-[#1A1412]/80 mb-4 leading-relaxed">
                      Gotovo za 5 minuta nakon prijave u program
                    </p>
                    <div className="space-y-4 text-[#1A1412]/80 leading-relaxed">
                      <p>
                        Zamisli da imaš male čarobne rečenice koje kad ih kažeš
                        muškarcu, njegov mozak se upali kao lampice na božićnom
                        drvcu — i odjednom mu postaneš najdraže biće na svijetu.
                      </p>
                      <p>
                        <strong className="text-[#1A1412]">To su "Rečenice Strasti"</strong>
                      </p>
                      <p>
                        One mu ne "prave pritisak" i ne mole ga za ljubav — nego
                        mu pokreću osjećaj: "Ona je posebna. Ja je želim. Moram
                        biti blizu nje."
                      </p>
                      <p>
                        Nisu trikovi, ni manipulacija — to je kao kad mu daš mali
                        slatkiš za dušu.
                      </p>
                      <p>
                        I onda on počne trčati za tobom… jer mu je s tobom
                        lijepo, zanimljivo i ne može te izbaciti iz glave.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E9C9C3]/30 shadow-sm">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#C24858] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1A1412] mb-4">
                      Javi mentorima rezultate ili pitaj što te muči
                    </h3>
                    <p className="text-[#1A1412]/80 mb-4 leading-relaxed">
                      Gotovo za 1 minuta nakon što pošalješ rečenice
                    </p>
                    <p className="text-[#1A1412]/80 leading-relaxed">
                      Kod svake rečenice imaš polje gdje možeš pisati: "Evo što
                      sam mu poslala", "ovo mi je odgovorio", "što da sad?", ili
                      jednostavno: "Pomoć, ne želim zeznuti ovo!"
                    </p>
                    <p className="text-[#1A1412]/80 leading-relaxed mt-4">
                      Ti napišeš — mentori odgovore u roku 24 sata.
                    </p>
                    <p className="text-[#1A1412] leading-relaxed mt-4 font-medium">
                      Mi smo tu da te držimo za ruku dok tvoj odnos cvjeta. 🌸✨
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-2xl p-8 md:p-12 border border-[#E9C9C3]/30 shadow-sm">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-[#C24858] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-[#1A1412] mb-4">
                      Uživaj u BONUSIMA koje smo ti pripremili
                    </h3>
                    <p className="text-[#1A1412]/80 mb-6 leading-relaxed">
                      Uz glavni program, dobit ćeš i nekoliko poklona koji ti
                      olakšavaju cijeli proces — od prve poruke do povratka
                      povezanosti.
                    </p>
                    <div className="space-y-4">
                      {[
                        {
                          emoji: "🎁",
                          title: '"Znakovi strasti" trening',
                          desc: "— kako prepoznati da te još voli i kada reagirati.",
                        },
                        {
                          emoji: "🎁",
                          title: 'Knjiga "Razotkrivanje muškog uma"',
                          desc: "— vodič kroz to kako muškarci razmišljaju i zašto se povlače.",
                        },
                        {
                          emoji: "🎁",
                          title:
                            'Program "Kako muškarca učiniti seksualno opsjednutim"',
                          desc: "— što ga emocionalno i fizički veže za tebe.",
                        },
                        {
                          emoji: "🎁",
                          title: "SOS Paket — 3 poruke za hitne situacije",
                          desc: "— kad osjetiš da ga gubiš i želiš reagirati odmah.",
                        },
                        {
                          emoji: "🎁",
                          title: "7-dnevni podsjetnik",
                          desc: "— male poruke koje te vode kroz tvoj plan, dan po dan.",
                        },
                      ].map((bonus, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-[#F6F1EC] rounded-lg p-4"
                        >
                          <span className="text-2xl">{bonus.emoji}</span>
                          <div>
                            <p className="font-semibold text-[#1A1412]">
                              {bonus.title}
                            </p>
                            <p className="text-[#1A1412]/80 text-sm">
                              {bonus.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[#1A1412] leading-relaxed mt-6 font-medium">
                      Sve to čeka u tvojoj aplikaciji odmah nakon prijave.
                    </p>
                    <p className="text-[#1A1412] leading-relaxed">
                      Otvaraš, gledaš, i znaš točno što ti je činiti.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1412] text-center mb-4">
              Što sve radimo?
            </h2>
            <p className="text-center text-[#1A1412]/80 mb-12 text-xl leading-relaxed">
              Da on ponovno postane lud za tobom.
            </p>

            <p className="text-[#1A1412]/80 mb-12 leading-relaxed text-lg">
              Ne moraš danima učiti o muškom umu ni proučavati teoriju odnosa.
              Sve što trebaš je otvoriti aplikaciju, pratiti plan koji je već
              prilagođen tvojoj situaciji — i kroz jednostavne zadatke i poruke
              koje ti pokažemo, sve se počne mijenjati.
            </p>

            <h3 className="font-serif text-2xl font-bold text-[#1A1412] mb-8 text-center">
              Kroz 21 dan naučit ćeš kako:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: Heart,
                  title: "Čitanje muških signala",
                  desc: "Naučit ćeš prepoznati što zapravo stoji iza njegovih poruka, šutnje i ponašanja — i reagirati pametno, bez pritiska.",
                },
                {
                  icon: Brain,
                  title: "Psihologija privlačnosti",
                  desc: "Shvatit ćeš kako funkcionira muški mozak i što u njemu pokreće želju, strast i potrebu da ti se približi.",
                },
                {
                  icon: Clock,
                  title: "Tajming i rečenice",
                  desc: "Vidjet ćeš točno što reći i kada — jer ista poruka ili rečenica u krivom trenutku može sve pokvariti, a u pravom trenutku ga zalijepiti za tebe.",
                },
                {
                  icon: MessageSquare,
                  title: "Komunikacija koja veže",
                  desc: "Koristit ćeš \"Rečenice Strasti\" koje aktiviraju dopamin i stvaraju osjećaj da si mu najposebnija osoba u životu.",
                },
                {
                  icon: Sparkles,
                  title: "Održavanje kemije",
                  desc: "Naučit ćeš kako zadržati pažnju i privrženost čak i nakon što se on \"vrati\" — bez drame, bez borbe, s lakoćom.",
                },
                {
                  icon: Award,
                  title: "Samopouzdanje i mir",
                  desc: "Kroz cijeli proces jačaš svoju unutarnju sigurnost — jer kad ti znaš što radiš, on to osjeti i reagira.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#F6F1EC] rounded-2xl p-6 border border-[#E9C9C3]/30"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#C24858] rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-white w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-bold text-[#1A1412] mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[#1A1412]/80 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section
        id="proof-section"
        className="py-16 md:py-24 bg-[#F6F1EC]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1412] text-center mb-12">
              Zašto žene vjeruju ovom programu
            </h2>

            {/* Author Intro */}
            <div className="bg-white rounded-2xl p-8 md:p-12 mb-12 border border-[#E9C9C3]/30 shadow-sm">
              <div className="text-center mb-8">
                <h3 className="font-serif text-2xl font-bold text-[#1A1412] mb-4">
                  Bono Akrapović
                </h3>
                <p className="text-[#1A1412]/80 leading-relaxed text-lg">
                  Psiholog, istraživač muškog uma i autor knjige "Razotkrivanje
                  muškog uma", koja je pomogla tisućama žena diljem Balkana da
                  napokon razumiju što se zapravo događa u glavi muškarca kada
                  voli, kada se povlači i kada izgubi interes.
                </p>
              </div>

              <div className="space-y-4 text-[#1A1412]/80 leading-relaxed">
                <p>
                  Sve što sam godinama proučavao — od psihologije dopamina, do
                  stvarnih priča žena koje su mi pisale — spojio sam u
                  jednostavan sistem koji danas zovemo Rečenice Strasti.
                </p>
                <p>
                  Ne moraš čitati knjige ni učiti teoriju. Sve što trebaš je ući
                  u aplikaciju, pratiti plan koji ti pokazuje što reći i kada, i
                  gledati kako se tvoj odnos počinje mijenjati — prirodno, bez
                  napora.
                </p>
                <p>
                  Uz mene su tu i četiri mentorice — Petra, Ana, Julija i Roza —
                  žene koje svakodnevno pomažu polaznicama da se snađu u svojim
                  situacijama, odgovaraju na poruke i vode ih kroz cijeli proces.
                </p>
                <p className="font-serif italic text-lg text-[#1A1412] pt-4">
                  Zajedno, tu smo da ti pokažemo da ljubav ne mora biti teška.
                  Trebaš samo znati prave riječi — i pravi trenutak da ih izgovoriš. 💫
                </p>
              </div>
            </div>

            {/* Video Placeholder */}
            <div className="bg-white rounded-2xl p-8 mb-8 border border-[#E9C9C3]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#1A1412] mb-4 text-center">
                Pogledaj ovdje: Kratak opis cijelog programa
              </h3>
              <div className="aspect-video bg-[#F6F1EC] rounded-xl flex items-center justify-center border-2 border-dashed border-[#C8B8A6]">
                <p className="text-[#1A1412]/60">Video će biti ovdje</p>
              </div>
            </div>

            {/* Testimonials Placeholder */}
            <div className="bg-white rounded-2xl p-8 border border-[#E9C9C3]/30 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-[#1A1412] mb-6 text-center">
                Pogledajte ovdje: Dojmovi s prethodnog programa
              </h3>
              <p className="text-center text-[#1A1412]/80 mb-6">
                Prošle godine u travnju smo organizirali prve Rečenice Strasti,
                prvi program ovakvog tipa i ovo su dojmovi polaznica:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, idx) => (
                  <div
                    key={idx}
                    className="aspect-[4/3] bg-[#F6F1EC] rounded-lg border border-[#E9C9C3]/30 flex items-center justify-center"
                  >
                    <p className="text-[#1A1412]/40">Testimonial {idx + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing-section"
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F6F1EC] rounded-2xl p-8 md:p-12 border border-[#E9C9C3]/30 shadow-sm">
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1412] text-center mb-4">
                Ovo je INVESTICIJA U SEBE
              </h2>

              <p className="text-[#1A1412]/80 mb-6 leading-relaxed text-lg text-center">
                Znam da si već potrošila više novca na stvari koje su trajale dan
                ili dva — haljinu, frizuru, večeru.
              </p>
              <p className="text-[#1A1412]/80 mb-6 leading-relaxed text-lg text-center">
                Ali ovo je drugačije. Ovo je ulaganje u tvoj mir, tvoju sigurnost
                i tvoju sposobnost da razumiješ muškarca kojeg voliš.
              </p>

              <div className="text-center mb-8">
                <p className="text-[#1A1412] mb-4 leading-relaxed text-lg">
                  Za <strong className="text-[#C24858]">{PRICE} EUR</strong> dobivaš pristup znanju koje su žene prije tebe koristile da vrate ljubav, strast i pažnju koju su mislile da su izgubile.
                </p>
                <p className="font-serif italic text-xl text-[#1A1412] mb-4">
                  Nema boljeg osjećaja od onog kad shvatiš — "ok, sada znam što radim."
                </p>
                <p className="text-[#1A1412] leading-relaxed">
                  To je trenutak kad prestaneš nagađati i počneš živjeti ljubav onako kako zaslužuješ. ❤️
                </p>
              </div>

              {/* CTA Button */}
              <div className="text-center">
                <button
                  onClick={expandCheckout}
                  className="bg-[#C24858] hover:bg-[#B03E4D] text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl w-full sm:w-auto"
                >
                  PRIJAVI SE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      {checkoutExpanded && (
        <div id="checkout-section">
          <Checkout />
        </div>
      )}

      {/* Payment Icons */}
      {checkoutExpanded && (
        <div className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PaymentIcons />
          </div>
        </div>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-[#F6F1EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1A1412] text-center mb-12">
            Često postavljana pitanja
          </h2>

          <div className="space-y-6">
            {[
              {
                q: "Koliko vremena treba da vidim rezultate?",
                a: "Većina žena vidi prve promjene u ponašanju partnera unutar 7-14 dana od primjene rečenica. To zavisi od tvoje situacije i koliko dosljedno primjenjuješ plan.",
              },
              {
                q: "Je li ovo privatno?",
                a: "Apsolutno. Sve što podijeliš s mentorima ostaje između vas. Tvoja privatnost je naš prioritet.",
              },
              {
                q: "Trebam li spamati poruke?",
                a: "Ne. Program te uči točno kada i kako poslati poruku. Kvaliteta je važnija od kvantitete.",
              },
              {
                q: "Radi li ovo za brak i za simpatiju?",
                a: "Da. Program ima posebne putanje za različite situacije — uključujući brak i rane faze veze.",
              },
              {
                q: "Što ako ne bude rezultata?",
                a: "Ako sve primijeniš 60 dana, a nema rezultata — vraćamo 100% novca.",
              },
              {
                q: "Kako dobijam podršku?",
                a: "U aplikaciji imaš direktan pristup mentorima. Odgovaramo u roku od 24 sata.",
              },
            ].map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-[#E9C9C3]/30 shadow-sm"
              >
                <h3 className="font-serif text-lg font-bold text-[#1A1412] mb-3">
                  {faq.q}
                </h3>
                <p className="text-[#1A1412]/80 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer Strip */}
      <section className="py-16 md:py-24 bg-[#C24858] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Tvoj odnos ne treba biti težak.
            </h2>
            <button
              onClick={expandCheckout}
              className="bg-white text-[#C24858] hover:bg-[#F6F1EC] px-12 py-5 rounded-full font-bold text-xl transition-all duration-200 transform hover:scale-105 hover:shadow-xl"
            >
              Počni danas — reci prave riječi
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1412] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">
                Rečenice Strasti
              </h3>
              <p className="text-white/80 mb-4 leading-relaxed">
                Transformiraj svoj ljubavni život s najmoćnijim psihološkim
                tehnikama za privlačenje i zadržavanje muškarca.
              </p>
              <div className="flex items-center text-sm text-white/80">
                <Lock className="w-4 h-4 mr-2" />
                <span>Sigurna naplata — 256-bit SSL enkripcija</span>
              </div>
            </div>

            {/* Important Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Važni linkovi</h4>
              <ul className="space-y-2 text-white/80">
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
              <div className="space-y-2 text-white/80">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <a
                    href="mailto:recenicestrasti@gmail.com"
                    className="hover:text-white transition-colors"
                  >
                    recenicestrasti@gmail.com
                  </a>
                </div>
              </div>

              {/* Payment Icons */}
              <div className="mt-6">
                <p className="text-sm text-white/80 mb-3">Prihvaćamo:</p>
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
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2025 Rečenice Strasti. Sva prava pridržana.</p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-[#E9C9C3]/30 shadow-lg">
        <div className="px-4 py-3">
          <button
            onClick={expandCheckout}
            className="w-full bg-[#C24858] hover:bg-[#B03E4D] text-white px-6 py-3 rounded-full font-bold text-base transition-all"
          >
            Prijava — {PRICE}€
          </button>
        </div>
      </div>
    </div>
  );
}
