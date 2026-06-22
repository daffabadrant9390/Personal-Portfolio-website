import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileMenu } from "@/components/layout/MobileMenu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "M. Daffa Badranthoriq — Full Stack Engineer",
    template: "%s | M. Daffa Badranthoriq",
  },
  description:
    "Full Stack Engineer specializing in scalable web infrastructure, distributed systems, and high-performance applications.",
  keywords: [
    "Full Stack Engineer",
    "Software Engineer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
  ],
  authors: [{ name: "M. Daffa Badranthoriq" }],
  openGraph: {
    type: "website",
    title: "M. Daffa Badranthoriq — Full Stack Engineer",
    description:
      "Full Stack Engineer specializing in scalable web infrastructure.",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <ThemeProvider>
          <Navbar />
          <MobileMenu />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
