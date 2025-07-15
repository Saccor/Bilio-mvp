import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bilio - Jämför och analysera bilar via registreringsnumret",
  description: "Sveriges mest omfattande plattform för analys och jämförelse av begagnade bilar. Gör bilköpet transparent och tryggt med Bilio.",
  keywords: "bilanalys, bilar, begagnade bilar, bilköp, registreringsnummer, bilhistorik, Sverige",
  openGraph: {
    title: "Bilio - Transparent bilköp",
    description: "Analysera och jämför bilar via registreringsnummer. Få en komplett bilanalys på några sekunder.",
    type: "website",
    locale: "sv_SE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
