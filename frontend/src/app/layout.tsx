import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import { Web3Provider } from "@/providers/Web3Provider";
import "./globals.css";

// Configure Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mazatlán Hotel App",
  description: "Experience the best of Mazatlán",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable} ${montserrat.variable}`}>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
