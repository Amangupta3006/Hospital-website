"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Plus, Calendar, Users, Stethoscope, ChevronDown, Eye, Heart, ClipboardCheck } from "lucide-react";
import { valuesData } from "@/data";

function renderValueIcon(iconName: string) {
  switch (iconName) {
    case "Eye":          return <Eye className="w-5 h-5 text-hospital-teal" />;
    case "Heart":        return <Heart className="w-5 h-5 text-hospital-teal" />;
    case "ClipboardCheck": return <ClipboardCheck className="w-5 h-5 text-hospital-teal" />;
    default:             return <Plus className="w-5 h-5 text-hospital-teal" />;
  }
}

export default function About() {
  const [activeValue, setActiveValue] = useState("VISION");
  const [animatedStats, setAnimatedStats] = useState({ years: 0, patients: 0, doctors: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const startTime = performance.now();

          const animate = (timestamp: number) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress * (2 - progress);

            setAnimatedStats({
              years: Math.floor(ease * 10),
              patients: Math.floor(ease * 5000),
              doctors: Math.floor(ease * 2),
            });

            if (progress < 1) requestAnimationFrame(animate);
            else setAnimatedStats({ years: 10, patients: 5000, doctors: 2 });
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const activeValueItem = valuesData.find((v) => v.id === activeValue) ?? valuesData[0];

  return (
    <div className="bg-white" id="about-section">
      {/* ── About Content ─────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="lg:w-1/2">
            <div className="flex flex-col space-y-4 mb-6">
              <span className="text-hospital-teal font-extrabold text-sm tracking-widest uppercase">
                About Us
              </span>
              <div className="flex items-center space-x-2">
                <Plus className="text-hospital-teal w-5 h-5 animate-pulse" />
                <div className="h-0.5 w-16 bg-hospital-teal" />
              </div>
            </div>
            <h2 className="text-hospital-navy text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight uppercase font-sans">
              Specialized Care at{" "}
              <span className="text-hospital-teal">Hisar Children Hospital</span>
            </h2>
            <p className="text-hospital-grey/80 text-base md:text-lg mb-6 leading-relaxed">
              Hisar Newborn &amp; Children Hospital is a specialized Paediatric and Newborn care
              centre at JAT College Road, Hisar — dedicated entirely to the health of your child.
            </p>
            <p className="text-hospital-grey/80 text-sm md:text-base mb-10 leading-relaxed">
              We believe in offering comprehensive paediatric care under a single roof, setting the
              best standards in child healthcare, continually improving our performance and exceeding
              the expectations of every family we serve.
            </p>
            <a
              href="#contact-section"
              className="btn-clip inline-block bg-hospital-navy text-white px-8 py-4 font-bold text-xs uppercase tracking-wider hover:bg-hospital-teal transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Contact Us Today
            </a>
          </div>

          <div className="lg:w-1/2 relative w-full">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group">
              <Image
                alt="Pediatrician examining infant"
                src="/img19.jpeg"
                width={640}
                height={450}
                className="w-full h-[300px] sm:h-[400px] md:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-hospital-navy/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-hospital-navy py-16 md:py-20 w-full relative overflow-hidden" id="stats-section">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-hospital-teal glowing-top-line" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-4">
            {[
              { icon: <Calendar className="w-8 h-8 text-hospital-teal" />, value: animatedStats.years, suffix: "+", label: "Years of Excellence" },
              { icon: <Users    className="w-8 h-8 text-hospital-teal" />, value: animatedStats.patients, suffix: "+", label: "Happy Patients" },
              { icon: <Stethoscope className="w-8 h-8 text-hospital-teal" />, value: animatedStats.doctors, suffix: "", label: "Expert Doctors" },
            ].map((stat, i) => (
              <div key={i} className="flex-1 text-center group">
                {i > 0 && <div className="hidden md:block absolute h-24 w-px bg-white/10 -translate-x-1/2" />}
                <div className="flex flex-col items-center">
                  <div className="mb-4 bg-white/5 p-3.5 rounded-full group-hover:bg-hospital-teal/20 transition-all duration-300">
                    {stat.icon}
                  </div>
                  <div className="flex items-baseline justify-center">
                    <span className="text-hospital-teal text-5xl md:text-[64px] font-extrabold leading-none teal-text-glow tabular-nums">
                      {stat.value}
                    </span>
                    {stat.suffix && (
                      <span className="text-hospital-teal text-5xl md:text-[64px] font-extrabold leading-none teal-text-glow">
                        {stat.suffix}
                      </span>
                    )}
                  </div>
                  <div className="text-white text-xs md:text-sm font-semibold uppercase tracking-[0.15em] mt-3 group-hover:text-hospital-teal transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ───────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-gray-50/50" id="core-values-section">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight">
              <span className="text-hospital-navy">Our Core</span>{" "}
              <span className="text-hospital-teal">Values</span>
            </h2>
            <div className="h-1 w-20 bg-hospital-teal mx-auto mt-4 rounded-full" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="w-full lg:w-1/2 space-y-4">
              {valuesData.map((item) => {
                const isActive = activeValue === item.id;
                return (
                  <div
                    key={item.id}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 bg-white ${
                      isActive ? "border-hospital-teal shadow-md" : "border-gray-200 hover:border-gray-300 shadow-sm"
                    }`}
                  >
                    <button
                      onClick={() => setActiveValue(item.id)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? "bg-hospital-teal/10" : "bg-gray-100"}`}>
                          {renderValueIcon(item.icon)}
                        </div>
                        <span className={`text-base md:text-lg font-bold uppercase tracking-wide transition-colors ${isActive ? "text-hospital-teal" : "text-hospital-navy"}`}>
                          {item.title}
                        </span>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isActive ? "rotate-180 text-hospital-teal" : ""}`} />
                    </button>
                    <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isActive ? "max-h-52 border-t border-gray-100" : "max-h-0"}`}>
                      <div className="p-5 md:p-6 bg-hospital-teal-light border-l-4 border-hospital-teal text-hospital-navy/90 text-sm md:text-base font-medium leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="w-full lg:w-1/2">
              <div className="relative aspect-[4/3] overflow-hidden shadow-2xl bg-gray-100 border-2 border-hospital-teal-light rounded-[16px_80px_16px_80px] group">
                <Image
                  key={activeValue}
                  alt={`${activeValueItem.title} visual`}
                  src={activeValueItem.imageUrl}
                  fill
                  className="fade-image object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hospital-navy/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
