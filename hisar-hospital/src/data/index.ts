import { Slide, Doctor, ValueItem, ServiceItem } from "./types";

export const slidesData: Slide[] = [
  {
    id: 0,
    title: "ADVANCED NEONATAL",
    highlightText: "INTENSIVE CARE",
    description:
      "Equipped with state-of-the-art technology, our Level III NICU provides the highest level of care for premature and critically ill infants.",
    imageUrl: "/slide2.jpeg",
    position: "center 40%",
  },
  {
    id: 1,
    title: "EXPERT PEDIATRIC",
    highlightText: "CARE EXPERTS",
    description:
      "Dedicated to providing compassionate, evidence-based care for every stage of your child's growth.",
    imageUrl: "/slide4.jpeg",
    position: "center 25%",
  },
  {
    id: 2,
    title: "FROM SICKNESS",
    highlightText: "TO SMILES",
    description: "From routine checkups to specialized treatments, we are here for your family.",
    imageUrl: "/slide3.jpeg",
    position: "center 25%",
  },
  {
    id: 3,
    title: "A TEAM OF",
    highlightText: "DEDICATED EXPERTS",
    description:
      "Our multidisciplinary team works together to ensure the best outcomes for every patient.",
    imageUrl: "/slide1.jpeg",
    position: "center 15%",
  },
];

export const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Rajesh Gupta",
    credentials: "MBBS, MD, DNB (Paediatrics)",
    role: "Senior Paediatrician · 30 Yrs Experience",
    imageUrl: "/dr-rajesh.png",
  },
  {
    id: 2,
    name: "Dr. R. Narasimha Rao",
    credentials: "MBBS, DNB (Paediatrics)",
    role: "Paediatrician · 2 Yrs Experience",
    imageUrl: "/dr-narasima.png",
  },
  {
    id: 3,
    name: "Dr. Amandeep Saini",
    credentials: "MBBS, DCh, DNB (Paediatrics)",
    role: "Paediatrician · 6 Yrs Experience",
    imageUrl: "/.jpeg",
  },
];

export const valuesData: ValueItem[] = [
  {
    id: "VISION",
    title: "Vision",
    icon: "Eye",
    content:
      "To be Haryana's most trusted children's hospital, setting the highest standards in paediatric and neonatal care, accessible to every family.",
    imageUrl: "/slide2.jpeg",
  },
  {
    id: "MOTTO",
    title: "Motto",
    icon: "Heart",
    content:
      "From Sickness to Smiles — caring for your child as our own, with compassion, expertise and dedication at every step of their health journey.",
    imageUrl: "/motto.jpeg",
  },
  {
    id: "MISSION",
    title: "Mission",
    icon: "ClipboardCheck",
    content:
      "Hisar Newborn & Children Hospital shall provide the best possible paediatric treatment, delivered efficiently, at accessible cost, to all children and families of Hisar and surrounding areas. Established in 2001, we accept Star Health & Ayushman Bharat insurance.",
    imageUrl: "/mission.jpeg",
  },
];

export const servicesData: ServiceItem[] = [
  { id: 1,  title: "General Pediatrics",          imageUrl: "/general.jpeg" },
  { id: 2,  title: "Pediatric Emergency",          imageUrl: "/img12.jpeg" },
  { id: 3,  title: "Neonatology (NICU)",           imageUrl: "/img26.jpeg" },
  { id: 4,  title: "Vaccination & Immunization",   imageUrl: "/img13.jpeg" },
  { id: 5,  title: "Pediatric Cardiology",         imageUrl: "/img25.jpeg" },
  { id: 7,  title: "Pharmacy",                     imageUrl: "/img1.jpeg"  },
  { id: 8,  title: "Pediatric ENT",                imageUrl: "/motto.jpeg" },
  { id: 9,  title: "ICU & Critical Care",          imageUrl: "/img27.jpeg" },
  { id: 10, title: "Laboratory Collection Center", imageUrl: "/img18.jpeg" },
  { id: 11, title: "Diagnostic Center",            imageUrl: "/img17.jpeg" },
  { id: 12, title: "Ambulance Service",            imageUrl: "/img5.jpeg"  },
];