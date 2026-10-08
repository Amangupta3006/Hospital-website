"use client";

import { useState, useEffect } from "react";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Doctors from "./Doctors";
import Services from "./Services";
import AppointmentManager from "./AppointmentManager";
import Contact from "./Contact";
import BookingModal from "./BookingModal";
import CallModal from "./CallModal";
import { Appointment } from "@/data/types";

const STORAGE_KEY = "hch_appointments";

export default function HomeClient() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");

  // Load from localStorage on mount (client-only)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setAppointments(JSON.parse(stored));
    } catch {
      // localStorage unavailable — silent fail
    }
  }, []);

  const saveAppointments = (next: Appointment[]) => {
    setAppointments(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const handleOpenBooking = (doctorName = "") => {
    setSelectedDoctor(doctorName);
    setIsBookingOpen(true);
  };

  return (
    <div className="font-sans text-hospital-grey bg-white min-h-screen flex flex-col">
      <Header onOpenBooking={() => handleOpenBooking()} onCallNow={() => setIsCallOpen(true)} />

      <div className="flex-grow">
        <Hero onOpenBooking={() => handleOpenBooking()} />
        <About />
        <Doctors onSelectDoctor={handleOpenBooking} />
        <Services />
        <AppointmentManager
          appointments={appointments}
          onCancelAppointment={(id) => saveAppointments(appointments.filter((a) => a.id !== id))}
        />
        <Contact />
      </div>

      <footer className="bg-hospital-navy-dark border-t border-white/5 py-10 text-center text-white/40 text-xs font-semibold uppercase tracking-[0.25em]">
        <div className="max-w-6xl mx-auto px-6">
          &copy; {new Date().getFullYear()} Hisar Newborn &amp; Children Hospital. All Rights Reserved.
        </div>
      </footer>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedDoctor={selectedDoctor}
        onSaveAppointment={(apt) => saveAppointments([apt, ...appointments])}
      />
      <CallModal isOpen={isCallOpen} onClose={() => setIsCallOpen(false)} />
    </div>
  );
}
