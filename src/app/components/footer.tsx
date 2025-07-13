"use client";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const [footerData, setFooterData] = useState<SanityDocument[]>([]);
  useEffect(() => {
    try{
      async function fetchData() {
        const data = await client.fetch<SanityDocument[]>(
          `*[_type == "homepage"]{contactDescription}`
        );
        console.log("Fetched data:", data);
        setFooterData(data);
      }
      fetchData();
    } catch (err) {
      console.error("Error fetching footer data:", err);
    }
  }, []);
  return (
    <footer className="flex flex-col justify-center items-center text-white gap-4 py-4">
      <h1 className="text-4xl">Contact</h1>
      <p className="text-sm max-w-128">{footerData[0]?.contactDescription}</p>
      <Button name="Contact me" route="/contact" decoration={true} />
      <section className="flex flex-row gap-2 p-1">
        <Link href="https://github.com/Elias-Larsson">
          <Image
            src="/mdi_github.svg"
            alt="github icon"
            width={32}
            height={32}
          />
        </Link>
        <Link href="https://www.linkedin.com/in/elias-h-larsson/">
          <Image
            src="/mdi_linkedin.svg"
            alt="github icon"
            width={32}
            height={32}
          />
        </Link>
      </section>
    </footer>
  );
};
