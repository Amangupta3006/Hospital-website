"use client";

import { useState } from "react";
import { X, PhoneCall, Copy, Check, Activity, MapPin } from "lucide-react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHONE_NUMBERS = [
  { label: "Emergency Helpline (24/7)", num: "90506-73076" },
  { label: "Front Desk / OPD Desk",     num: "01662-235633" },
  { label: "OPD Desk 2",                num: "01662-235600" },
];

export default function CallModal({ isOpen, onClose }: CallModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (num: string, idx: number) => {
    navigator.clipboard.writeText(num);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-hospital-navy/60 backdrop-blur-sm" onClick={onClose} />

      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative z-10 overflow-hidden border border-gray-100 animate-fade-in">
        {/* Header */}
        <div className="bg-hospital-navy text-white px-6 py-5 flex items-center justify-between border-b border-hospital-teal/20">
          <div className="flex items-center gap-2.5">
            <Activity className="w-5 h-5 text-hospital-teal animate-pulse" />
            <h3 className="text-base font-bold uppercase tracking-wider">Emergency Support</h3>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <p className="text-xs text-hospital-teal font-extrabold uppercase tracking-widest bg-hospital-teal-light px-3 py-1 rounded-full inline-block">
              24/7 Pediatric &amp; Neonatal ICU Active
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-3 leading-relaxed">
              If your child requires immediate clinical care or you want to register an OPD appointment over the phone, please call any of our active phone lines below:
            </p>
          </div>

          <div className="space-y-3.5">
            {PHONE_NUMBERS.map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/70 border border-gray-100 hover:border-hospital-teal/30 transition-colors">
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{p.label}</p>
                  <a href={`tel:${p.num.replace(/\s+/g, "")}`} className="text-lg font-extrabold text-hospital-navy hover:text-hospital-teal transition-colors flex items-center gap-1.5 mt-0.5">
                    <PhoneCall className="w-4 h-4 text-hospital-teal" />
                    {p.num}
                  </a>
                </div>
                <button onClick={() => handleCopy(p.num, idx)} className="p-2.5 rounded-xl bg-white text-gray-400 hover:text-hospital-teal border border-gray-100 shadow-sm transition-all active:scale-95" title="Copy Number">
                  {copiedIndex === idx ? <Check className="w-4 h-4 text-hospital-teal" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-3 bg-hospital-teal-light/50 p-4 rounded-2xl border border-hospital-teal/10 text-hospital-navy">
            <MapPin className="w-5 h-5 text-hospital-teal shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold uppercase tracking-wider">Direct OPD Walk-Ins</p>
              <p className="text-xs text-hospital-navy/80 mt-1 leading-relaxed">
                Purani Kutchary Chowk, HISAR – 125 001. No prior appointment required for emergency admissions.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="w-full bg-hospital-navy hover:bg-hospital-teal text-white py-3.5 rounded-2xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors">
            Close Support Panel
          </button>
        </div>
      </div>
    </div>
  );
}
