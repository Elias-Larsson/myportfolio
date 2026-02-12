import type { Metadata } from "next";
import { Ledger } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const ledger = Ledger({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});

const rubik = localFont({
  src: "../../public/fonts/RubikOne-Regular.ttf",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Elias Larsson | Portfolio",
  description:
    "I’m an awesome fullstack developer passionate about building secure and user-friendly web experiences.",
  appleWebApp: { title: "Elias" },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
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
      <body
        className={`${rubik.variable} ${ledger.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
