import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elias Larsson | Portfolio",
  description: "an awesome Fullstack Developer working towards a safe and optimized web experience",
  appleWebApp: {title: "Elias"},
  openGraph: {
    images: [
      {
        url: "/portfoliowebpage.png",
        width: 1200,
        height: 630,
        alt: "Portfolio preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
