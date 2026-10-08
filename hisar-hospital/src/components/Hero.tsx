"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, Phone, MapPin } from "lucide-react";
import { slidesData } from "@/data";

interface HeroProps {
  onOpenBooking: () => void;
}

// Height (cm) the child "grows" to on each slide
const HEIGHTS = [50, 80, 105, 120];

// Growth-chart ruler geometry (SVG units)
const Y0 = 354;
const Y1 = 24;
const CM0 = 40;
const CM1 = 130;
const yFor = (cm: number) => Y0 - ((cm - CM0) / (CM1 - CM0)) * (Y0 - Y1);
const TICKS = Array.from({ length: 19 }, (_, i) => CM0 + i * 5);

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Hisar+Children+Hospital+Purani+Kutchary+Chowk+Hisar";

export default function Hero({ onOpenBooking }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slidesData.length);
  }, []);

  // Restarts whenever the slide changes, so clicking a dot never causes a quick double-jump
  useEffect(() => {
    const t = setTimeout(nextSlide, 6000);
    return () => clearTimeout(t);
  }, [currentSlide, nextSlide]);

  const cm = HEIGHTS[currentSlide % HEIGHTS.length];
  const shift = yFor(cm) - Y0;

  const quickActions = [
    { title: "OPD timings", sub: "Mon–Sat, 10 AM – 7 PM", icon: Clock, href: "#contact" },
    { title: "Emergency call", sub: "90506-73076 (24/7)", icon: Phone, href: "tel:+919050673076" },
    { title: "Get directions", sub: "Purani Kutchary Chowk", icon: MapPin, href: MAPS_URL, external: true },
  ];

  return (
    <>
      <style>{`
        @keyframes hero-float { 50% { transform: translateY(-14px) rotate(8deg); } }
        .hero-float { animation: hero-float 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .hero-float { animation: none; } }
      `}</style>

      <main
        id="home"
        className="relative overflow-hidden bg-hospital-navy text-white pt-[110px] [.scrolled~&]:pt-[70px] transition-[padding] duration-300"
      >
        {/* Decoration */}
        <div
          className="absolute -right-[12%] -top-[30%] w-[62%] aspect-square rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(15,155,142,.45), transparent 65%)" }}
          aria-hidden="true"
        />
        <span className="hero-float absolute left-[6%] top-[22%] text-5xl font-black text-white/10 select-none" aria-hidden="true">+</span>
        <span className="hero-float absolute left-[46%] bottom-[22%] text-3xl font-black text-white/10 select-none" style={{ animationDelay: "-3s" }} aria-hidden="true">+</span>
        <span className="hero-float absolute right-[8%] top-[24%] text-6xl font-black text-white/10 select-none" style={{ animationDelay: "-5s" }} aria-hidden="true">+</span>

        <div className="relative mx-auto max-w-6xl px-5 pt-8 pb-28 md:pt-14 md:pb-32 grid gap-10 md:grid-cols-[1.2fr_0.8fr] items-center">
          {/* Text side */}
          <div>
            <div className="flex items-center gap-3 text-[#35d6c6] text-xs md:text-sm font-extrabold tracking-[0.14em] uppercase">
              Hisar Newborn &amp; Children Hospital
              <span className="hidden sm:block h-[3px] w-14 bg-[#35d6c6]" aria-hidden="true" />
            </div>

            {/* All slides share one grid cell, so the box is always as tall as the longest slide */}
            <div className="mt-4 grid">
              {slidesData.map((slide, idx) => {
                const active = idx === currentSlide;
                return (
                  <div
                    key={slide.id}
                    className={`col-start-1 row-start-1 transition-all duration-700 ${active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
                      }`}
                    aria-hidden={!active}
                  >
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase leading-[1.02] tracking-tight">
                      {slide.title} <span className="text-[#35d6c6]">{slide.highlightText}</span>
                    </h1>
                    <p className="mt-4 max-w-lg text-base md:text-lg text-white/80">{slide.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="tel:+911662235633"
                className="bg-hospital-teal text-white font-extrabold text-sm tracking-wider uppercase pl-6 pr-10 py-4 min-h-[52px] inline-flex items-center hover:brightness-110 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}
              >
                Call now
              </a>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-hospital-navy font-extrabold text-sm tracking-wider uppercase pl-6 pr-10 py-4 min-h-[52px] inline-flex items-center hover:bg-gray-100 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}
              >
                Get directions
              </a>
            </div>

            <div className="mt-7 flex items-center gap-2">
              {slidesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-[5px] w-9 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${idx === currentSlide ? "bg-[#35d6c6]" : "bg-white/25 hover:bg-white/40"
                    }`}
                  aria-label={`Show message ${idx + 1}`}
                  aria-current={idx === currentSlide}
                />
              ))}
            </div>
          </div>

          {/* Growth chart: the child grows as the slides change */}
          <div
            className="order-first md:order-last mx-auto w-full max-w-[230px] md:max-w-none bg-white rounded-[30px] px-4 pt-4 pb-2 shadow-2xl"
            aria-hidden="true"
          >
            <svg viewBox="0 0 300 380" className="block w-full h-auto">
              <rect x="14" y="14" width="58" height="340" rx="14" fill="#eaf6f5" />
              <g stroke="#1e3a62" strokeWidth="2">
                {TICKS.map((c) => (
                  <line key={c} x1={c % 10 === 0 ? 40 : 52} y1={yFor(c)} x2="72" y2={yFor(c)} />
                ))}
              </g>
              <g fontSize="11" fontWeight="800" fill="#1e3a62">
                {TICKS.filter((c) => c % 10 === 0).map((c) => (
                  <text key={c} x="18" y={yFor(c) + 4}>{c}</text>
                ))}
              </g>
              <line x1="82" y1="354" x2="290" y2="354" stroke="#1e3a62" strokeWidth="3" strokeLinecap="round" opacity=".25" />

              <g style={{ transform: `translateY(${shift}px)`, transition: "transform 1s cubic-bezier(.3,1.4,.5,1)" }}>
                <ellipse cx="190" cy="346" rx="52" ry="7" fill="#1e3a62" opacity=".12" />
                <rect x="165" y="286" width="50" height="58" rx="22" fill="#0f9b8e" />
                <circle cx="190" cy="262" r="34" fill="#ffd9b8" />
                <path d="M158 255c4-30 60-30 64 0-14-12-50-12-64 0z" fill="#1e3a62" />
                <circle cx="178" cy="266" r="4" fill="#1e3a62" />
                <circle cx="202" cy="266" r="4" fill="#1e3a62" />
                <path d="M180 278q10 9 20 0" stroke="#1e3a62" strokeWidth="3" fill="none" strokeLinecap="round" />
                <circle cx="170" cy="274" r="5" fill="#ff9a8d" opacity=".6" />
                <circle cx="210" cy="274" r="5" fill="#ff9a8d" opacity=".6" />
              </g>

              <g style={{ transform: `translateY(${yFor(cm) - 9}px)`, transition: "transform 1s cubic-bezier(.3,1.4,.5,1)" }}>
                <path d="M82 0h50l10 9-10 9H82z" fill="#0f9b8e" />
                <text x="90" y="13" fontSize="10" fontWeight="800" fill="#fff">{cm} cm</text>
              </g>
            </svg>
            <p className="text-center text-hospital-navy font-extrabold text-xs tracking-wide uppercase pb-2">
              From sickness to smiles
            </p>
          </div>
        </div>
      </main>

      {/* Quick actions overlap the bottom of the hero */}
      <section aria-label="Quick actions" className="relative z-10 mx-auto -mt-14 max-w-4xl px-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
          {quickActions.map(({ title, sub, icon: Icon, onClick, href, external }) => {
            const cls =
              "group flex flex-col gap-2 text-left bg-white rounded-[22px] border border-gray-100 p-4 md:p-5 shadow-xl hover:-translate-y-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-hospital-teal";
            const inner = (
              <>
                <span className="grid place-items-center w-11 h-11 rounded-2xl bg-hospital-teal">
                  <Icon className="w-5 h-5 text-white" />
                </span>
                <span className="text-hospital-navy font-extrabold text-sm uppercase tracking-wide">{title}</span>
                <span className="text-xs md:text-sm font-semibold text-gray-500">{sub}</span>
              </>
            );
            return onClick ? (
              <button key={title} onClick={onClick} className={cls}>{inner}</button>
            ) : (
              <a
                key={title}
                href={href}
                className={cls}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {inner}
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}