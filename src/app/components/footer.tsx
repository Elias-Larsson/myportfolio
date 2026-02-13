"use client";
import { client } from "@/sanity/lib/client";
import { SanityDocument } from "next-sanity";
import { Suspense, useEffect, useState } from "react";
import { Button } from "./button";
import { footerQuery } from "@/sanity/lib/queries";
import Image from "next/image";

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
      <footer className="flex-main items-center gap-4 bg-neutral-800 p-6 rounded-2xl shadow-2xl w-fit">
        <h1 className="text-3xl">Contact</h1>
        <p className="max-w-128 text-neutral-400">
          {footerData[0]?.contactDescription}
        </p>
        <div className="flex flex-row justify-between items-center w-full gap-2">
          <div className="flex flex-row gap-2">
            <Button
              name="Contact me"
              route="https://mail.google.com/mail/?view=cm&fs=1&to=aroezi05@gmail.com"
            />
            <Button
              route="https://github.com/Elias-Larsson"
            />
            <Button
              route="https://www.linkedin.com/in/elias-h-larsson/"
            />
          </div>
          <Image src="/awesomeduck.svg" alt="duck" width={48} height={48} />
        </div>
      </footer>
    </Suspense>
  );
};
