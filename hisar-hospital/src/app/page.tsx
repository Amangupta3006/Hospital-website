import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Hisar Newborn & Children Hospital | Home",
};

export default function Home() {
  return <HomeClient />;
}
