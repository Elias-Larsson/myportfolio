import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "lenis/dist/lenis.css";
import { SmoothScroll } from "./components/smoothscroll";
import "./globals.css";
import { siteDescription, siteName, siteUrl } from "./site";

const montserrat = Montserrat({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
});

const rubik = localFont({
  src: "../../public/fonts/RubikOne-Regular.ttf",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  applicationName: "Elias Larsson Portfolio",
  title: {
    default: siteName,
    template: "%s | Elias Larsson",
  },
  description: siteDescription,
  metadataBase: siteUrl,
  authors: [
    {
      name: "Elias Larsson",
      url: "https://github.com/Elias-Larsson",
    },
  ],
  creator: "Elias Larsson",
  keywords: [
    "Elias Larsson",
    "full-stack developer",
    "backend developer",
    "web developer",
    "Stockholm",
    "portfolio",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Elias Larsson",
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_SE",
    siteName: "Elias Larsson Portfolio",
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: "/portfoliowebpage.png",
        width: 1200,
        height: 630,
        alt: "Elias Larsson's full-stack developer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/portfoliowebpage.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#181616",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.variable} ${montserrat.variable} antialiased overflow-x-hidden`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
