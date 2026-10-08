import { MapPin, Phone, Mail, Clock} from "lucide-react";

export default function Contact() {
  return (
    <section className="bg-hospital-navy text-white py-20 md:py-24" id="contact-section">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-8">
              Reach Out <span className="text-hospital-teal">to Us</span>
            </h2>

            <div className="space-y-8">
              {[
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Visit Us",
                  lines: ["Purani Kutchary Chowk, HISAR – 125 001, Haryana"],
                },
                {
                  icon: <Phone className="w-6 h-6" />,
                  title: "Emergency Call",
                  lines: ["01662-235633, 235600", "90506-73076 (24/7 Helpline)"],
                },
                {
                  icon: <Clock className="w-6 h-6" />,
                  title: "Visiting Hours",
                  lines: ["10:00 AM – 7:00 PM", "Appointments currently offline at OPD desk"],
                },
                {
                  icon: <Mail className="w-6 h-6" />,
                  title: "Email Us",
                  lines: ["rajdiv@yahoo.com"],
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-5 group">
                  <div className="bg-hospital-teal p-4 rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:bg-hospital-teal-accent text-white shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base md:text-lg uppercase tracking-wide text-hospital-teal">
                      {item.title}
                    </h4>
                    {item.lines.map((line, i) => (
                      <p key={i} className="text-white/80 mt-1.5 text-sm md:text-base leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-200 aspect-[4/3] border-4 border-white/5">
              <iframe
                title="Hisar Children Hospital Location Map"
                allowFullScreen
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.184318714088!2d75.7226162!3d29.150654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391163fc6e8c0b53%3A0x7d0107775f569106!2sHisar%20Newborn%20%26%20Children%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
