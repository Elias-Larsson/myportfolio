"use client";
import Image from "next/image";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projectsdisplay";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { Techstacks } from "./components/techstacks";

export default function Home() {
  const [homepage, setHomepage] = useState<SanityDocument | null>(null);
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch<SanityDocument>(
          `*[_type == "homepage"]{contactDescription, title, subtitle, description, skills}[0]`
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
      <div className="flex flex-col items-center bg-[url('/wavebackground.svg')] bg-cover bg-center bg-no-repeat h-screen pb-12">
        <Navbar />
        <div className="flex flex-col justify-center h-full px-4">
          <div>
            <h1 className="text-3xl">{homepage.title}</h1>
            <h2 className="text-neutral-300 text-xl">{homepage.subtitle}</h2>
            <p className="py-4 max-w-128">{homepage.description}</p>
          </div>
          <Button name="Contact me" route="/contact" decoration="/maki_arrow.svg" />
        </div>
        <div className="h-24">
          <Image
            src="/maki_whitedownarrow.svg"
            alt=""
            width={24}
            height={24}
            className="arrow-animation"
          />
        </div>
      </div>
      <ProjectsDisplay />
      <div className="flex flex-col justify-center items-center py-24">
        <div className="flex flex-col items-start gap-4 max-w-128 px-4">
          <h1 className="text-3xl">Skills</h1>
          <p className="text-neutral-400">
            Some knowledge I have picked up along the way to becoming an awesome developer.
          </p>
       <Techstacks techstacks={homepage.skills}/>
        </div>
      </div>
      <Footer />
    </>
  );
}
