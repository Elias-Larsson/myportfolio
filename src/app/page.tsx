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
import { IconButton } from "./components/iconbutton";

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
      <main className="flex flex-col items-center justify-center bg-midnight h-screen pb-12">
        <Navbar />
        <section className="flex flex-row gap-96 px-4">
          <div className="flex flex-col h-full">
            <h1 className="text-[10.5dvw] sm:text-6xl md:text-7xl text-center pb-4">
              FUTURE OF WEB <br />
              <span className="text-secondary">DEVELOPMENT.</span>
            </h1>
            <div className="flex flex-col gap-4 max-w-128">
              <p>
                My name is Elias Larsson, I am currently studying in Stockholm
                and building both web applications and backend tools in my spare
                time.
              </p>
              <div className="flex flex-row gap-4 items-center">
                <Button
                  name="Contact me"
                  route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com"
                />
                <IconButton route="linkedin" />
                <IconButton route="github" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <main className="flex-main items-center gap-48 py-48">
        <div className="flex-main px-4 gap-48">
          <ProjectsDisplay />
          {homepage.skills && <Skills skills={homepage.skills} />}
        </div>
        <Footer />
      </main>
    </>
  );
}
