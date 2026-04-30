import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sujal Kumar — Full Stack Developer & AI Builder",
  description:
    "Full Stack Developer & AI Enthusiast. Building scalable web applications and intelligent systems that solve real problems.",
  icons: {
    icon: "/favicon (1).ico",
    shortcut: "/favicon (1).ico",
    apple: "/favicon (1).ico",
  },
  keywords: [
    "developer",
    "full stack",
    "AI",
    "Next.js",
    "React",
    "portfolio",
    "Sujal Kumar",
  ],
  authors: [{ name: "Sujal Kumar" }],
  creator: "Sujal Kumar",
  openGraph: {
    title: "Sujal Kumar — Full Stack Developer & AI Builder",
    description:
      "Building scalable web applications and intelligent systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Kumar — Full Stack Developer & AI Builder",
    description: "Full Stack Developer & AI Enthusiast.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
