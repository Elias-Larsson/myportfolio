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
    try {
      async function fetchData() {
        const data = await client.fetch<SanityDocument[]>(
          `*[_type == "homepage"]{contactDescription}`
        );
        setFooterData(data);
      }
      fetchData();
    } catch (err) {
      console.error("Error fetching footer data:", err);
    }
  }, []);

  if(!footerData) return <p>Loading...</p>;

  return (
    <footer className="flex flex-col justify-center items-center py-18">
      <div className="flex flex-col items-start gap-4 bg-neutral-800 p-6 rounded-2xl shadow-2xl">
        <h1 className="text-3xl">Contact</h1>
        <p className="max-w-128 text-neutral-400">
          {footerData[0]?.contactDescription}
        </p>
        <Button name="Contact me" route="/contact" decoration={true} />
        <div className="flex flex-row gap-2">
          <Link href="https://github.com/Elias-Larsson">
            <Image
              src="/mdi_github.svg"
              alt="github icon"
              width={48}
              height={48}
            />
          </Link>
          <Link href="https://www.linkedin.com/in/elias-h-larsson/">
            <Image
              src="/mdi_linkedin.svg"
              alt="github icon"
              width={48}
              height={48}
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
