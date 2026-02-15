"use client";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { Suspense, useEffect, useState } from "react";
import { Button } from "./button";
import { footerQuery } from "@/sanity/lib/queries";
import Image from "next/image";
import { IconButton } from "./iconbutton";

export const Footer = () => {
  const [footerData, setFooterData] = useState<SanityDocument[]>([]);
  useEffect(() => {
    try {
      async function fetchData() {
        const data = await client.fetch<SanityDocument[]>(footerQuery);
        setFooterData(data);
      }
      fetchData();
    } catch (err) {
      console.error("Error fetching footer data:", err);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <footer className="flex-main items-center gap-4 px-4 py-32 rounded-2xl">
        <h1 className="text-[10.5dvw] sm:text-6xl md:text-7xl">
          HEAR MORE <br />
          <span className="text-secondary">ABOUT ME</span>
        </h1>
          <div className="flex flex-row gap-2 items-center">
            <Button
              name="Contact me"
              route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com"
            />
            <IconButton route="linkedin" />
            <IconButton route="github" />
          </div>
      </footer>
    </Suspense>
  );
};
