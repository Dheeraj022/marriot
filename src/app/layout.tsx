import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Courtyard by Marriott",
    default: "Courtyard by Marriott | Explore 29 Hotels Across India",
  },
  description:
    "Explore 29 Courtyard by Marriott hotels and resorts across India. Discover premier accommodations, luxury amenities, flexible event spaces, and submit your stay enquiry.",
  keywords: [
    "Courtyard by Marriott",
    "Courtyard by Marriott India",
    "Courtyard hotels",
    "Marriott hotels India",
    "Hotel enquiry India",
    "Courtyard Marriott Mumbai",
    "Courtyard Marriott Bengaluru",
    "Courtyard Marriott Delhi",
  ],
  authors: [{ name: "Courtyard by Marriott" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://courtyardbymarriott.in",
    siteName: "Courtyard by Marriott",
    title: "Courtyard by Marriott | Explore 29 Hotels Across India",
    description:
      "Explore 29 Courtyard by Marriott hotels and resorts across India. Discover premier accommodations, luxury amenities, and submit your stay enquiry.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#03101F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#03101F] text-[#F7F8FA] font-sans antialiased selection:bg-[#F6B936]/30 selection:text-[#FFD16A] flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
