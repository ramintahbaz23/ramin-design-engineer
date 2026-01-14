import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import Navigation from "@/components/Navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramin — Designer",
  description:
    "Designer who codes, working across product, film, hardware, and writing. Self-taught, learning by doing.",
  themeColor: "#E2DEDB",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    title: "Ramin — Designer",
    description:
      "Designer who codes, working across product, film, hardware, and writing. Self-taught, learning by doing.",
    url: "https://ramintahbaz.com",
    siteName: "Ramin — Designer",
    images: [
      {
        url: "/images/share-og.png",
        width: 1200,
        height: 630,
        alt: "Ramin — Designer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramin — Designer",
    description:
      "Designer who codes, working across product, film, hardware, and writing. Self-taught, learning by doing.",
    images: ["/images/share-og.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ramin",
    "jobTitle": "Designer",
    "description": "Designer who codes, working across product, film, hardware, and writing. Self-taught, learning by doing.",
    "url": "https://ramintahbaz.com",
    "sameAs": [
      "https://x.com/ramintahbaz"
    ]
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}

        {/* Bottom Navbar (global, non-animated) */}
        <Navigation />
      </body>
    </html>
  );
}
