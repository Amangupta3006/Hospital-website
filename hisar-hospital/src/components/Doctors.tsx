import Image from "next/image";
import { doctorsData } from "@/data";
import { Doctor } from "@/data/types";

interface DoctorsProps {
  onSelectDoctor?: (doctorName: string) => void;
}

export default function Doctors({ onSelectDoctor }: DoctorsProps) {
  return (
    <section className="bg-gray-50 py-20 md:py-24" id="doctors-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
            <span className="text-hospital-navy">Meet Our</span>{" "}
            <span className="text-hospital-teal">Experts</span>
          </h2>
          <div className="h-1.5 w-20 bg-hospital-teal mx-auto rounded-full mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {doctorsData.map((doctor: Doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                  alt={doctor.name}
                  src={doctor.imageUrl}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-hospital-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 md:p-8 flex flex-col items-center text-center flex-grow justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-hospital-navy mb-1 group-hover:text-hospital-teal transition-colors">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-semibold text-hospital-grey/60 uppercase tracking-wider mb-3">
                    {doctor.credentials}
                  </p>
                </div>
                <div className="bg-hospital-teal-light px-4 py-1.5 rounded-full mt-2">
                  <p className="text-hospital-teal font-extrabold text-xs tracking-wider uppercase">
                    {doctor.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}