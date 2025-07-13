"use client";
import Image from "next/image";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projectsdisplay";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";

export default function Home() {
  const [homepage, setHomepage] = useState<SanityDocument | null>(null);
    useEffect(() => {
  async function fetchProjects() {
    try {
      const data = await client.fetch<SanityDocument>(
        `*[_type == "homepage"]{contactDescription, title, subtitle, description}[0]`
      );
      setHomepage(data);
    } catch (err) {
      console.error("Error fetching homepage data:", err);
    }
  }
  fetchProjects();
}, []);

if (!homepage) return <div>Loading...</div>;
  return (
    <>
      <div className="font-outfit flex flex-col items-center bg-[url('/wavebackground.svg')] bg-cover bg-center bg-no-repeat h-screen pb-12">
          <Navbar/>
        <div className="flex flex-col justify-center h-full p-4">
            <div>
            <h1 className="text-3xl font-outfit ">{homepage.title}</h1>
            <h2 className="text-neutral-300 text-xl">{homepage.subtitle}</h2>
            <p className="p-4 max-w-128">
              {homepage.description}
            </p>
          </div>
          <Button name="Contact me" route="/contact" decoration={true}/>
        </div>
        <div className="h-24">
        <Image src="/maki_whitedownarrow.svg" alt="" width={38} height={38} className="arrow-animation"/>
        </div>
      </div>
      <ProjectsDisplay />
      <Footer />
      
    </>
  );
}
