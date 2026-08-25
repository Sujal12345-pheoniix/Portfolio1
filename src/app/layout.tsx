import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import ClientLayout from "@/components/ClientLayout";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sujal Kumar — Software Engineer | Full-Stack & Backend Development",
  description:
    "Software Engineer specializing in full-stack and backend development. Building enterprise applications — HRMS, ERP, Expense Management, Digital Adoption Platforms, and AI-powered systems.",
  icons: {
    icon: "/favicon (1).ico",
    shortcut: "/favicon (1).ico",
    apple: "/favicon (1).ico",
  },
  keywords: [
    "Sujal Kumar",
    "Software Engineer",
    "Full Stack Developer",
    "Backend Developer",
    "Next.js",
    "NestJS",
    "React",
    "TypeScript",
    "PostgreSQL",
    "HRMS",
    "Enterprise Software",
    "RBAC",
    "REST API",
    "portfolio",
  ],
  authors: [{ name: "Sujal Kumar" }],
  creator: "Sujal Kumar",
  openGraph: {
    title: "Sujal Kumar — Software Engineer | Full-Stack & Backend Development",
    description:
      "Building full-stack and enterprise applications — HRMS, ERP, Expense Management, Digital Adoption Platforms, and AI-powered systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sujal Kumar — Software Engineer | Full-Stack & Backend",
    description: "Software Engineer building enterprise applications and scalable backend systems.",
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
          <ClientLayout>
            <Navbar />
            <main>{children}</main>
          </ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}


