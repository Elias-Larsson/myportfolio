"use client";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center py-24 md:py-0">
      {children}
      <Navbar/>
      <Footer />
    </div>
  );
}
