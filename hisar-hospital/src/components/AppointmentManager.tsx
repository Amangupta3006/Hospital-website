import { Clipboard, Trash2, Calendar, User, Clock, CheckCircle } from "lucide-react";
import { Appointment } from "@/data/types";

interface AppointmentManagerProps {
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
}

export default function AppointmentManager({ appointments, onCancelAppointment }: AppointmentManagerProps) {
  if (appointments.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50/70 border-t border-gray-100" id="appointments-center">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-hospital-teal-light px-4 py-1.5 rounded-full mb-3 shadow-sm border border-hospital-teal/10">
            <Clipboard className="w-4 h-4 text-hospital-teal" />
            <span className="text-hospital-teal font-extrabold text-xs tracking-wider uppercase">Your Booking Records</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-hospital-navy uppercase">
            Manage Appointments ({appointments.length})
          </h2>
          <p className="text-gray-500 text-xs md:text-sm mt-2">
            These appointments are saved on your device. Please show this receipt at the OPD desk.
          </p>
        </div>

        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4 group">
              <div className="space-y-3 flex-grow">
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] font-extrabold tracking-wider bg-hospital-navy text-white px-2.5 py-1 rounded-md uppercase">{apt.id}</span>
                  <span className="flex items-center gap-1 text-[10px] font-extrabold tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-100 px-2.5 py-0.5 rounded-full uppercase">
                    <CheckCircle className="w-3.5 h-3.5" />
                    {apt.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-sm">
                  <div className="flex items-center gap-2 text-hospital-navy font-semibold">
                    <User className="w-4 h-4 text-hospital-teal" />
                    <span>Patient: {apt.patientName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-hospital-navy font-semibold">
                    <Calendar className="w-4 h-4 text-hospital-teal" />
                    <span>Consultation: {apt.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-hospital-navy font-semibold">
                    <Clock className="w-4 h-4 text-hospital-teal" />
                    <span>Slot: {apt.time}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 font-medium">
                  Assigned Specialist: <span className="text-hospital-navy font-extrabold">{apt.doctorName}</span>
                </p>

                {apt.notes && (
                  <p className="text-xs text-gray-400 bg-gray-50/50 p-2.5 rounded-lg border border-gray-100 leading-relaxed italic">
                    &ldquo;{apt.notes}&rdquo;
                  </p>
                )}
              </div>

              <button
                onClick={() => onCancelAppointment(apt.id)}
                className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-all self-end md:self-auto focus:outline-none focus:ring-2 focus:ring-red-300"
                title="Cancel Appointment"
              >
                <Trash2 className="w-5 h-5 group-hover:scale-105 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
