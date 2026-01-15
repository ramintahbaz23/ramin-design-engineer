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
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
