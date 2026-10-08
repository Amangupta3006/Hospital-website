"use client";

import React, { useState, useEffect } from "react";
import { X, CalendarRange, Clock, User, Phone, MessageSquare, CheckCircle2 } from "lucide-react";
import { doctorsData } from "@/data";
import { Appointment } from "@/data/types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDoctor: string;
  onSaveAppointment: (appointment: Appointment) => void;
}

const INITIAL_FORM = {
  childName: "",
  guardianName: "",
  phone: "",
  doctor: "",
  date: "",
  timeSlot: "09:00 AM - 11:00 AM",
  reason: "",
};

const TIME_SLOTS = [
  "09:00 AM - 11:00 AM",
  "11:00 AM - 01:00 PM",
  "02:00 PM - 04:00 PM",
  "04:00 PM - 06:00 PM",
  "06:00 PM - 08:00 PM",
];

export default function BookingModal({ isOpen, onClose, selectedDoctor, onSaveAppointment }: BookingModalProps) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        doctor: selectedDoctor || doctorsData[0]?.name || "",
      }));
      setIsSuccess(false);
    }
  }, [isOpen, selectedDoctor]);

  if (!isOpen) return null;

  const set = (key: keyof typeof INITIAL_FORM) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.childName || !formData.phone || !formData.date) return;

    const appointment: Appointment = {
      id: `APT-${Date.now()}`,
      patientName: formData.childName,
      patientPhone: formData.phone,
      doctorName: formData.doctor,
      date: formData.date,
      time: formData.timeSlot,
      status: "confirmed",
      notes: `${formData.guardianName ? `Parent: ${formData.guardianName}. ` : ""}${formData.reason}`,
    };

    onSaveAppointment(appointment);
    setIsSuccess(true);

    setTimeout(() => {
      onClose();
      setFormData(INITIAL_FORM);
    }, 2500);
  };

  const inputClass =
    "w-full py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-hospital-teal/40 focus:border-hospital-teal text-hospital-navy font-medium";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-hospital-navy/60 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 overflow-hidden border border-gray-100 animate-fade-in">
        {/* Header */}
        <div className="bg-hospital-navy text-white px-6 py-5 flex items-center justify-between border-b border-hospital-teal/20">
          <div className="flex items-center gap-2.5">
            <CalendarRange className="w-5 h-5 text-hospital-teal" />
            <h3 className="text-lg font-bold uppercase tracking-wider">Book OPD Appointment</h3>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-10 flex flex-col items-center text-center space-y-4 animate-scale-up">
            <div className="w-16 h-16 bg-hospital-teal/10 rounded-full flex items-center justify-center text-hospital-teal mb-2">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <h4 className="text-xl font-bold text-hospital-navy uppercase">Appointment Confirmed!</h4>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Your consultation has been successfully booked. Our staff will contact you shortly to confirm the timings.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5 max-h-[75vh] overflow-y-auto">
            {/* Child Name */}
            <div>
              <label className="block text-xs font-bold text-hospital-navy uppercase tracking-wider mb-2">Child&apos;s Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" required placeholder="e.g. Aarav Sharma" value={formData.childName} onChange={set("childName")} className={`${inputClass} pl-10 pr-4`} />
              </div>
            </div>

            {/* Guardian Name */}
            <div>
              <label className="block text-xs font-bold text-hospital-navy uppercase tracking-wider mb-2">Parent / Guardian Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="e.g. Rajesh Sharma" value={formData.guardianName} onChange={set("guardianName")} className={`${inputClass} pl-10 pr-4`} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-hospital-navy uppercase tracking-wider mb-2">Contact Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="tel" required placeholder="e.g. +91 90506-73076" value={formData.phone} onChange={set("phone")} className={`${inputClass} pl-10 pr-4`} />
              </div>
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-xs font-bold text-hospital-navy uppercase tracking-wider mb-2">Choose Specialist Doctor *</label>
              <select value={formData.doctor} onChange={set("doctor")} className={`${inputClass} px-3.5 bg-white`}>
                {doctorsData.map((doc) => (
                  <option key={doc.id} value={doc.name}>{doc.name} ({doc.role})</option>
                ))}
              </select>
            </div>

            {/* Date + Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-hospital-navy uppercase tracking-wider mb-2">Select Date *</label>
                <input type="date" required value={formData.date} onChange={set("date")} className={`${inputClass} px-3.5`} />
              </div>
              <div>
                <label className="block text-xs font-bold text-hospital-navy uppercase tracking-wider mb-2">Preferred Time Slot</label>
                <select value={formData.timeSlot} onChange={set("timeSlot")} className={`${inputClass} px-3.5 bg-white`}>
                  {TIME_SLOTS.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-bold text-hospital-navy uppercase tracking-wider mb-2">Reason for Visit / Symptoms</label>
              <div className="relative">
                <MessageSquare className="absolute top-3 left-3.5 w-4 h-4 text-gray-400" />
                <textarea rows={3} placeholder="Describe child symptoms…" value={formData.reason} onChange={set("reason")} className={`${inputClass} pl-10 pr-4 pt-2.5 resize-none`} />
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button type="button" onClick={onClose} className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-colors">
                Cancel
              </button>
              <button type="submit" className="flex-1 bg-hospital-teal hover:bg-hospital-teal-accent text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider shadow-md transition-colors">
                Book Now
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
