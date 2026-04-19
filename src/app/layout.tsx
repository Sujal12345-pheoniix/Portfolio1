import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";
{/* <link rel="icon" type="image/png" href="/favicon.png" /> */}
export const metadata: Metadata = {
  title: "Sujal Kumar — Full Stack Developer & AI Builder",
  description:
    "Full Stack Developer & AI Enthusiast. Building scalable web applications and intelligent systems that solve real problems.",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&family=Georgia&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
