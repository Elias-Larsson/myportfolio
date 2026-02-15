"use client";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { aboutQuery } from "@/sanity/lib/queries";
import type { About } from "@/sanity/types/about";

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
    <main className="flex items-center justify-center px-6 h-screen">
      <Image
        src="/awesomeduck.svg"
        alt="duck"
        width={128}
        height={128}
        className="duck"
      />
      <Image
        src="/awesomewalnut.svg"
        alt="cloud"
        width={128}
        height={128}
        className="walnut"
      />
      <section className="flex flex-col xl:flex-row items-center justify-center gap-12">
        <div className="max-w-128">
          <h1 className="text-3xl">About me</h1>
          <p className="text-neutral-400 py-4">
            {aboutData.description || "No description available"}
          </p>
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
        {/* {homepage.skills && <Skills skills={homepage.skills} />} */}
        
      </section>
    </main>
  );
}
