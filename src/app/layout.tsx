import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import WhatsappButton from "@/components/shared/WhatsappButton/WhatsappButton";
import localFont from "next/font/local";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

const rokkitt = localFont({
  src: [
    { path: "../../public/fonts/Rokkitt-ExtraBold.ttf", weight: "400" },
    { path: "../../public/fonts/Rokkitt-ExtraBold.ttf", weight: "700" },
  ],
  variable: "--font-rokkitt",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crisven | Ventanas para vehículos recreativos y carrocerías",
  description:
    "Fabricamos ventanas y aberturas para motorhomes, casas rodantes y carrocerías. Calidad, stock amplio y diseños a medida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      style={{ fontFamily: openSans.style.fontFamily }}
      className={rokkitt.variable}
    >
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
