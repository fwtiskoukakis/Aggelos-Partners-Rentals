export interface PartnerConfig {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  headline: string;
  subheadline: string;
  heroImage?: string;
  primaryMessage: string;
  season: {
    lowSeasonLabel: string;
    highSeasonLabel: string;
  };
  contact: {
    primaryEmail: string;
    notificationEmails: string[];
    whatsappNumber?: string;
  };
}

export const partners: PartnerConfig[] = [
  {
    id: "therooster",
    slug: "therooster",
    name: "The Rooster Antiparos",
    heroImage: "/images/partners/therooster-hero.jpg",
    headline: "Your private fleet at The Rooster.",
    subheadline: "A curated selection of vehicles and experiences for guests of The Rooster Antiparos.",
    primaryMessage:
      "Choose the vehicle that matches your stay — from refined SUVs to playful buggies and iconic scooters. All arranged seamlessly through reception.",
    season: {
      lowSeasonLabel: "Low Season (01/09 – 10/07)",
      highSeasonLabel: "High Season (11/07 – 31/08)"
    },
    contact: {
      primaryEmail: "aggelos@antiparosrentacar.com",
      notificationEmails: ["aggelos@antiparosrentacar.com"],
      whatsappNumber: "+306980151068"
    }
  }
];

export function getPartnerBySlug(slug: string): PartnerConfig | undefined {
  return partners.find((p) => p.slug === slug);
}

