"use client";
import Image from "next/image";
import { Button } from "../components/button";
import { SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { urlFor } from "@/sanity/lib/image";

export default function About() {
  const [aboutData, setAboutData] = useState<SanityDocument[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch<SanityDocument[]>(
          `*[_type == "about"]{description, profileImage}`
        );
        setAboutData(data);
      } catch (err) {
        console.error("Error fetching about data:", err);
      }
    }

    fetchData();
  }, []);

  if (aboutData.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col xl:flex-row items-center justify-center px-12 h-full pt-32 gap-8">
      <div className="max-w-128">
        <h1 className="text-3xl">About me</h1>
        <p className="text-neutral-400 py-4">{aboutData[0].description}</p>
        <Button name="Contact me" route="/contact" decoration="/maki_arrow.svg" />
      </div>
      {aboutData[0].profileImage && (
        <div className="w-full object-cover object-center offset-background">
          <Image
          src={urlFor(aboutData[0].profileImage).url()}
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
