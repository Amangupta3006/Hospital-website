"use client";


import React, { useState, useEffect, useCallback } from "react";
import { Phone, Clock, MapPin, Menu, X } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  onOpenBooking: () => void;
  onCallNow: () => void;
}

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about-section", label: "About" },
  { id: "doctors-section", label: "Doctors" },
  { id: "services-section", label: "Services" },
  { id: "contact-section", label: "Contact" },
];

export default function Header({ onOpenBooking, onCallNow }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);

    const sectionIds = NAV_ITEMS.map((n) => n.id);
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          setActiveSection(id);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = isScrolled ? 70 : 110;
      const offsetPosition = el.getBoundingClientRect().top + window.scrollY - topOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setActiveSection(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`header-root fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "scrolled" : ""}`}>
      {/* Top Info Bar */}
      <div className="info-bar bg-hospital-navy text-white text-[11px] md:text-xs px-6 py-2.5 flex flex-col md:flex-row justify-between items-center border-b border-white/10 font-medium tracking-wide uppercase">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <span className="flex items-center gap-1.5 hover:text-hospital-teal transition-colors">
            <Phone className="w-3.5 h-3.5 text-hospital-teal" />
            01662-235633, 235600 | 90506-73076
          </span>
          <span className="flex items-center gap-1.5 hover:text-hospital-teal transition-colors">
            <Clock className="w-3.5 h-3.5 text-hospital-teal" />
            OPD: Mon–Sat, 10:00 AM – 7:00 PM
          </span>
        </div>
        <span className="flex items-center gap-1.5 hover:text-hospital-teal transition-colors mt-1 md:mt-0">
          <MapPin className="w-3.5 h-3.5 text-hospital-teal" />
          Purani Kutchary Chowk, HISAR – 125 001
        </span>
      </div>

      {/* Main Navbar */}
      <header className="bg-white/95 backdrop-blur-md py-2 px-6 md:px-10 flex justify-between items-center border-b border-gray-100 shadow-sm">
        <Image
          src="/logo.png"
          alt="Hisar Children Hospital Logo"
          width={180}
          height={70}
          className="object-contain"
          priority
        />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-bold">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`relative py-1 uppercase tracking-wider text-xs transition-colors ${activeSection === item.id
                  ? "text-hospital-teal after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-hospital-teal"
                  : "text-hospital-navy/80 hover:text-hospital-teal"
                }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={onCallNow}
            className="bg-hospital-navy text-white hover:bg-hospital-teal px-5 py-2 md:px-7 md:py-2.5 rounded-full text-[11px] font-bold uppercase shadow-md hover:shadow-lg transition-all tracking-wider"
          >
            Call Now
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-hospital-navy focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[110px] bg-white z-40 flex flex-col p-6 space-y-4 border-t border-gray-100 shadow-xl animate-fade-in">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`py-3 px-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${activeSection === item.id
                  ? "bg-hospital-teal-light text-hospital-teal border-l-4 border-hospital-teal"
                  : "text-hospital-navy hover:bg-gray-50"
                }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBooking(); }}
              className="w-full bg-hospital-teal hover:bg-hospital-teal-accent text-white py-3 rounded-xl font-bold uppercase tracking-wider shadow-md text-xs transition-colors"
            >
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
