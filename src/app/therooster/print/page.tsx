import { SectionShell, Tag } from "@/components/ui";
import { getPartnerBySlug } from "@/data/partners";

const PARTNER_SLUG = "therooster";
const PUBLIC_URL = "https://aggelospartnersrentals.com/therooster";

export default function PrintPage() {
  const partner = getPartnerBySlug(PARTNER_SLUG);

  return (
    <main className="min-h-screen bg-background text-textPrimary">
      <SectionShell>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 bg-surface/80 p-8 shadow-soft print:shadow-none">
          <header className="flex flex-col gap-3 text-center">
            <Tag>For reception &amp; guest rooms</Tag>
            <h1 className="text-2xl font-semibold tracking-tight">
              Scan to view your private fleet
            </h1>
            <p className="text-sm text-textMuted">
              Guests of {partner?.name ?? "The Rooster"} can browse curated vehicles and send a
              WhatsApp request directly to Aggelos Rentals.
            </p>
          </header>

          <section className="flex flex-col items-center gap-6">
            <div className="rounded-3xl bg-background p-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
                  PUBLIC_URL
                )}`}
                alt="QR code for Aggelos Partners Rentals – The Rooster"
                className="h-64 w-64"
              />
            </div>
            <div className="text-center text-xs text-textMuted">
              <p>Scan with your camera or QR app.</p>
              <p className="mt-1">
                Or visit:{" "}
                <span className="font-mono text-textPrimary">{PUBLIC_URL.replace("https://", "")}</span>
              </p>
            </div>
          </section>

          <footer className="mt-4 border-t border-white/10 pt-4 text-[0.7rem] text-textMuted">
            <p>
              Tip for reception: open this page and use your browser&apos;s print function to create
              A4 sheets for the front desk or guest rooms.
            </p>
          </footer>
        </div>
      </SectionShell>
    </main>
  );
}

