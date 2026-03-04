import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Print – The Rooster fleet | Aggelos Partners Rentals",
  description: "Print QR code for The Rooster guest fleet portal.",
  robots: { index: false, follow: false },
};

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
