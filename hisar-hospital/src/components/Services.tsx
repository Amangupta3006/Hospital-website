import Image from "next/image";
import { servicesData } from "@/data";

export default function Services() {
  const duplicated = [...servicesData, ...servicesData];

  return (
    <section className="bg-white py-16 md:py-20 overflow-hidden border-t border-b border-gray-100" id="services-section">
      <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
          <span className="text-hospital-navy">Comprehensive</span>{" "}
          <span className="text-hospital-teal">Services</span>
        </h2>
        <div className="h-1.5 w-20 bg-hospital-teal mx-auto rounded-full mt-3" />
      </div>

      <div className="relative w-full overflow-hidden py-4 select-none">
        <div className="flex w-max gap-6 animate-marquee">
          {duplicated.map((service, index) => (
            <div
              key={`${service.id}-${index}`}
              className="flex flex-col items-center w-[220px] md:w-[260px] flex-shrink-0 group cursor-pointer"
            >
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 border border-gray-100 relative">
                <Image
                  alt={service.title}
                  src={service.imageUrl}
                  fill
                  className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                  sizes="260px"
                />
                <div className="absolute inset-0 bg-hospital-navy/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <span className="text-hospital-navy font-bold uppercase tracking-wider text-[11px] md:text-xs text-center px-2 group-hover:text-hospital-teal transition-colors">
                {service.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}