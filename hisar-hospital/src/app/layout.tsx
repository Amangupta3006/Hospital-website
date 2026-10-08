import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hisar Newborn & Children Hospital | Paediatric & Neonatal Care",
  description:
    "Specialized Paediatric and Neonatal care centre at Purani Kutchary Chowk, Hisar. Dedicated Level III NICU, Pediatric Surgery, Emergency & OPD services.",
  keywords: [
    "children hospital Hisar",
    "paediatric hospital Haryana",
    "NICU Hisar",
    "neonatologist Hisar",
    "pediatric surgeon Hisar",
  ],
  openGraph: {
    title: "Hisar Newborn & Children Hospital",
    description: "Specialized care for every child. Level III NICU · Pediatric Surgery · OPD",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
