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
        console.log(data);
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
    <main className="flex flex-col xl:flex-row items-center justify-center px-12 h-full pt-32 gap-8">
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
      <div className="max-w-128">
        <h1 className="text-3xl">About me</h1>
        <p className="text-neutral-400 py-4">
          {aboutData.description || "No description available"}
        </p>
      </div>
      {aboutData.profile && (
        <div className="w-full object-cover object-center offset-background">
          <Image
            src={aboutData.profile}
            alt="A town with a sunset in the background"
            width={480}
            height={480}
            className="shadow-neutral-900 shadow-2xl rounded-2xl"
          />
        </div>
      )}
    </main>
  );
}
