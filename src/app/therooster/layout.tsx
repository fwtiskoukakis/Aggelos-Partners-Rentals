import type { Metadata } from "next";

const title = "Private fleet – The Rooster Antiparos | Aggelos Rentals";
const description =
  "Browse the curated vehicle fleet for guests of The Rooster Antiparos. Request your car, SUV, buggy or scooter via WhatsApp — arranged with reception.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: false, follow: false },
};

export default function TheRoosterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
