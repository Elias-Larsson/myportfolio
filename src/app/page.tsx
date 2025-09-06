"use client";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projectsdisplay";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { homepageQuery } from "@/sanity/lib/queries";
import { Homepage } from "@/sanity/types/homepage";
import { Skills } from "./components/skills";

export default function Home() {
  const [homepage, setHomepage] = useState<Homepage>();
  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await client.fetch<Homepage>(homepageQuery);
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
      <main className="flex flex-col items-center justify-center bg-[url('/wavebackground.svg')] bg-cover bg-center bg-no-repeat h-screen pb-12">
        <Navbar />
          <section className="flex flex-col justify-start px-12">
            <h1 className="text-5xl font-bold">{homepage.title}</h1>
            <h2 className=" text-2xl">{homepage.subtitle}</h2>
            <p className="text-neutral-300 py-4 max-w-128">
              {homepage.description}
            </p>
          <Button
            name="Contact me"
            route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com"
            decoration="/maki_arrow.svg"
            />
            </section>
      </main>
      <main className="flex-main items-center gap-48 px-12 py-48">
      <ProjectsDisplay />
      {homepage.skills && <Skills skills={homepage.skills}/>}
      <Footer />
      </main>
    </>
  );
}
