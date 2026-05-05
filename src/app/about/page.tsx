"use client";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { aboutQuery } from "@/sanity/lib/queries";
import type { About } from "@/sanity/types/about";
import { Navbar } from "../components/navbar";
import { Footer } from "../components/footer";

export default function About() {
  const [aboutData, setAboutData] = useState<About | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch<About>(aboutQuery);
        setAboutData(data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    }

    fetchData();
  }, []);

  if (!aboutData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className="flex flex-col items-center justify-center px-4 py-12 gap-32 min-h-[80vh] bg-tertiary">
        <section className="flex flex-col xl:flex-row justify-center gap-y-4 gap-x-32">
          <div className="max-w-128">
            <h1 className="text-3xl">About me</h1>
            <p className="text-neutral-400 py-4">
              {aboutData.description || "No description available"}
            </p>
            <Image width={100} height={100} src="awesomeduck.svg" alt="duck" className="rotate-10 mx-8"/>
          </div>
          {aboutData.profile && (
            <figure className="w-full object-cover object-center offset-background">
              <Image
                src={aboutData.profile}
                alt="A town with a sunset in the background"
                width={560}
                height={560}
                className="shadow-neutral-900 shadow-2xl rounded-2xl"
              />
            </figure>
          )}
        </section>
        <Navbar />
      </main>
      <Footer />
    </>
  );
}
