import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aggelos Partners Rentals",
  description: "Private fleet portal for hotel partners of Aggelos Rentals in Antiparos.",
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="lux-gradient-bg min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}

