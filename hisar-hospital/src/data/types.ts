export interface Slide {
  id: number;
  title: string;
  highlightText: string;
  description: string;
  imageUrl: string;
  position?: string;
}

export interface Doctor {
  id: number;
  name: string;
  credentials: string;
  role: string;
  imageUrl: string;
}

export interface ValueItem {
  id: string;
  title: string;
  icon: string;
  content: string;
  imageUrl: string;
}

export interface ServiceItem {
  id: number;
  title: string;
  imageUrl: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  doctorName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending";
  notes?: string;
}
