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
    template: "%s | GuestAssist - Hotel Enquiry Assistance",
    default: "GuestAssist | Explore Courtyard by Marriott Hotels in India",
  },
  description:
    "GuestAssist is an independent hotel information and stay enquiry assistance platform operated by BrightSpark Leisure Services Private Limited. Explore Courtyard by Marriott properties across India and submit an enquiry.",
  keywords: [
    "GuestAssist",
    "Courtyard by Marriott India",
    "Hotel enquiry assistance",
    "Hotel directory India",
    "BrightSpark Leisure Services",
    "Courtyard Marriott Mumbai",
    "Courtyard Marriott Bengaluru",
  ],
  authors: [{ name: "BrightSpark Leisure Services Private Limited" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://guestassist.in",
    siteName: "GuestAssist",
    title: "GuestAssist | Hotel Information & Stay Enquiry Assistance",
    description:
      "Explore 29 Courtyard by Marriott hotels across India and connect with our stay enquiry assistance team.",
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
