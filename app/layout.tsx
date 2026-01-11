import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
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
  title: "Ramin — Design Engineer",
  description:
    "The portfolio of Ramin, a Design Engineer exploring interactive products, motion systems, and thoughtful digital experiences.",
  themeColor: "#E2DEDB",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlexMono.variable} font-sans antialiased`}
      >
        {children}

        {/* Bottom Navbar (global, non-animated) */}
        <nav className="fixed inset-x-0 bottom-4 sm:bottom-6 z-20 px-5 sm:px-6">
          <div className="max-w-[680px] mx-auto">
            <div className="flex items-center justify-center gap-4 px-3.5 sm:px-4">
              {/* Middle pill menu */}
              <div className="flex h-12 items-center rounded-full bg-black px-5 sm:px-7 shadow-lg gap-4 sm:gap-6">
                <Link
                  href="/"
                  className="text-xs sm:text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/craft"
                  className="text-xs sm:text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors"
                >
                  Craft
                </Link>
                <Link
                  href="/elsewhere"
                  className="text-xs sm:text-sm font-medium tracking-wide text-white/80 hover:text-white transition-colors"
                >
                  Elsewhere
                </Link>
              </div>

              {/* Right circular X profile button */}
              <Link
                href="https://x.com/ramintahbaz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-lg hover:bg-black/90 transition-colors overflow-hidden"
                aria-label="Go to X profile"
              >
                <Image
                  src="/images/avatar.png"
                  alt="Avatar"
                  width={48}
                  height={48}
                  className="h-full w-full rounded-full object-cover"
                  priority
                />
              </Link>
            </div>
          </div>
        </nav>
      </body>
    </html>
  );
}
