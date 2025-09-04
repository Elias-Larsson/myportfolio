"use client";
import { Button } from "./components/button";
import { ProjectsDisplay } from "./components/projectsdisplay";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { Techstacks } from "./components/techstacks";
import { homepageQuery } from "@/sanity/lib/queries";
import { Homepage } from "@/sanity/types/homepage";

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
      <div className="flex flex-col items-center bg-[url('/wavebackground.svg')] bg-cover bg-center bg-no-repeat h-screen pb-12">
        <Navbar />
        <div className="flex flex-col justify-center h-full px-4">
          <div>
            <h1 className="text-5xl font-bold">{homepage.title}</h1>
            <h2 className=" text-2xl">{homepage.subtitle}</h2>
            <p className="text-neutral-300 py-4 max-w-128">
              {homepage.description}
            </p>
          </div>
          <Button
            name="Contact me"
            route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com"
            decoration="/maki_arrow.svg"
          />
        </div>
        <div className="h-24"></div>
      </div>
      <ProjectsDisplay />
      <div className="flex flex-col justify-center items-center py-24">
        <div className="flex flex-col items-start gap-4 max-w-128 px-4">
          <h1 className="text-3xl">Skills</h1>
          <p className="text-neutral-400">
            Some knowledge I have picked up along the way to becoming an awesome
            developer.
          </p>
          {homepage.skills && <Techstacks techstacks={homepage.skills} />}
        </div>
      </div>
      <Footer />
    </>
  );
}
