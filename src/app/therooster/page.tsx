"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { vehicles, type Vehicle, type VehicleType } from "@/data/vehicles";
import { getPartnerBySlug } from "@/data/partners";
import { LuxButton, SectionShell, Tag } from "@/components/ui";

type TransmissionFilter = "any" | "automatic" | "manual";

const partner = getPartnerBySlug("therooster");

const categoryFilters: { id: "all" | VehicleType; label: string }[] = [
  { id: "all", label: "All vehicles" },
  { id: "suv", label: "Luxury SUVs" },
  { id: "car", label: "Cars" },
  { id: "buggy", label: "Buggies" },
  { id: "atv", label: "ATVs" },
  { id: "scooter", label: "Scooters" },
  { id: "ebike", label: "Ebikes" }
];

function filterVehicles(
  list: Vehicle[],
  {
    type,
    transmission
  }: {
    type: "all" | VehicleType;
    transmission: TransmissionFilter;
  }
) {
  return list.filter((v) => {
    if (!v.visibleForPartners.includes("therooster")) return false;
    if (type !== "all" && v.type !== type) return false;
    if (transmission !== "any" && v.transmission !== transmission) return false;
    return true;
  });
}

export default function TheRoosterPage() {
  const [curtainVisible, setCurtainVisible] = useState(true);
  const [selectedType, setSelectedType] = useState<"all" | VehicleType>("all");
  const [transmission, setTransmission] = useState<TransmissionFilter>("any");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setCurtainVisible(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(
    () =>
      filterVehicles(vehicles, {
        type: selectedType,
        transmission
      }),
    [selectedType, transmission]
  );

  if (!partner) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-textMuted">Partner configuration not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Welcome curtain - fades out after 1.8s */}
      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-stone-900 text-white transition-opacity duration-700 ${
          curtainVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-stone-400">
          The Rooster Antiparos
        </p>
        <h2
          className="mt-2 text-4xl font-light tracking-wide sm:text-5xl md:text-6xl"
          style={{ fontFamily: "var(--font-display), ui-serif, Georgia, serif" }}
        >
          Your private fleet
        </h2>
      </div>
      <HeroSection
        onBrowse={() => {
          const el = document.getElementById("fleet-grid");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        onAskReception={() => {
          const msg = partner.receptionAssistMessage ?? "Hi, I'm a guest at The Rooster and would like help choosing a rental.";
          const phone = partner.contact.whatsappNumber?.replace(/[^\d]/g, "");
          if (phone) {
            window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
          }
        }}
      />

      <SectionShell>
        <div className="flex flex-col gap-6 rounded-3xl border border-stone-200 bg-white/90 p-5 shadow-soft backdrop-blur-xl sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textMuted">
                Curated for The Rooster
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-wide text-textPrimary sm:text-2xl">
                Choose a category or browse all vehicles.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <label htmlFor="transmission-filter" className="sr-only">
                Transmission
              </label>
              <select
                id="transmission-filter"
                aria-label="Filter by transmission"
                className="rounded-full border border-stone-200 bg-white px-4 py-2 text-xs text-textMuted shadow-sm outline-none focus:border-accent"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as TransmissionFilter)}
              >
                <option value="any">Any transmission</option>
                <option value="automatic">Automatic only</option>
                <option value="manual">Manual only</option>
              </select>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7"
            role="tablist"
            aria-label="Vehicle category"
          >
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={selectedType === cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`group flex flex-col items-start justify-between rounded-2xl border px-3 py-3 text-left text-xs transition-all duration-200 md:px-4 md:py-4 ${
                  selectedType === cat.id
                    ? "border-accent bg-amber-50 text-textPrimary"
                    : "border-stone-200 bg-white text-textMuted hover:border-stone-300 hover:bg-stone-50"
                }`}
              >
                <span className="font-semibold tracking-wide">{cat.label}</span>
                <span className="mt-2 text-[0.65rem] text-textMuted/80">
                  {
                    filterVehicles(vehicles, {
                      type: cat.id === "all" ? "all" : cat.id,
                      transmission
                    }).length
                  }{" "}
                  options
                </span>
              </button>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div id="fleet-grid" className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textMuted">
                Fleet overview
              </p>
              <h2 className="mt-1 text-xl font-semibold tracking-wide text-textPrimary sm:text-2xl">
                {filtered.length}{" "}
                <span className="text-textMuted">
                  {filtered.length === 1 ? "vehicle" : "vehicles"} curated for The Rooster.
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle, index) => (
              <article
                key={vehicle.id}
                className="group animate-fade-in-up flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white opacity-0 shadow-soft transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(0,0,0,0.12)] sm:rounded-3xl"
                style={{ animationDelay: `${Math.min(index * 50, 400)}ms`, animationFillMode: "forwards" }}
              >
                <div className="relative flex aspect-[4/3] min-h-0 items-center justify-center overflow-hidden bg-stone-100">
                  {vehicle.images[0] ? (
                    <Image
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      fill
                      className="object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-stone-100">
                      <span className="text-xs font-semibold tracking-[0.22em] text-textMuted">
                        IMAGE PLACEHOLDER
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 flex flex-col gap-0.5 sm:bottom-4 sm:left-4 sm:gap-1">
                    <Tag>{vehicle.category}</Tag>
                    <p className="text-[0.7rem] font-semibold text-textPrimary drop-shadow-sm sm:text-sm md:text-base">
                      {vehicle.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-2 sm:gap-4 sm:p-5">
                  <p className="hidden text-xs text-textMuted sm:block">{vehicle.descriptionShort}</p>
                  {vehicle.tags.length > 0 && (
                    <p className="text-[0.6rem] text-accent/90 sm:text-[0.65rem]">
                      Perfect for: {vehicle.tags.map((t) => t.replace(/-/g, " ")).join(", ")}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-[0.65rem] text-textMuted sm:text-xs">
                    <div className="flex gap-2 sm:gap-4">
                      <span>{vehicle.seats} seats</span>
                      <span>{vehicle.transmission === "automatic" ? "Auto" : "Manual"}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.6rem] uppercase tracking-wider text-textMuted sm:text-[0.7rem]">
                        From
                      </p>
                      <p className="text-xs font-semibold text-accent sm:text-sm">
                        {vehicle.pricing.lowSeason} €{" "}
                        <span className="text-[0.6rem] font-normal text-textMuted sm:text-[0.7rem]">/ day</span>
                      </p>
                    </div>
                  </div>
                  <LuxButton
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="mt-auto w-full justify-center py-2 text-[0.7rem] sm:py-3 sm:text-sm"
                  >
                    View &amp; request
                  </LuxButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="rounded-3xl border border-stone-200 bg-white/90 p-6 shadow-soft sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-textMuted">
            What&apos;s included
          </p>
          <h2 className="mt-2 text-lg font-semibold text-textPrimary sm:text-xl">
            Every rental includes
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Full insurance coverage",
              "Unlimited kilometres",
              "Delivery to The Rooster",
              "24/7 support",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-50 text-accent">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm text-textPrimary">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-textMuted">
            Keys collected at reception. Final confirmation and any tailored arrangements are handled
            directly by Aggelos Rentals together with reception.
          </p>
          <p className="mt-2 text-[0.7rem] text-textMuted/80">
            Aggelos Rentals · 15+ years on Antiparos · Trusted by The Rooster guests
          </p>
        </div>
      </SectionShell>

      <SectionShell>
        <blockquote className="rounded-3xl border border-stone-200 bg-amber-50/50 p-6 text-center sm:p-8">
          <p className="text-sm italic text-textPrimary sm:text-base">
            &ldquo;The easiest way to explore Antiparos. Reception handled everything — we had our
            car ready the next morning.&rdquo;
          </p>
          <footer className="mt-3 text-xs text-textMuted">— Guest, The Rooster Antiparos</footer>
        </blockquote>
      </SectionShell>

      {selectedVehicle && (
        <VehicleDetailSheet
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          partnerName={partner.name}
          whatsappNumber={partner.contact.whatsappNumber}
        />
      )}
    </main>
  );
}

function HeroSection({ onBrowse, onAskReception }: { onBrowse: () => void; onAskReception?: () => void }) {
  if (!partner) return null;

  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden border-b border-stone-200">
      {/* Full-bleed hero image with Ken Burns */}
      <div className="absolute inset-0">
        {partner.heroImage ? (
          <Image
            src={partner.heroImage}
            alt=""
            fill
            priority
            className="object-cover animate-ken-burns"
            sizes="100vw"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-stone-200 to-stone-300" />
        )}
        {/* Gradient overlay for readability */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/40 to-transparent"
          aria-hidden
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
        <div className="max-w-2xl">
          <span
            className="animate-fade-in-up opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            <Tag className="border-white/20 bg-white/10 text-stone-200">
              Exclusively for guests of {partner.name}
            </Tag>
          </span>
          <h1
            className="animate-fade-in-up mt-4 text-4xl font-light tracking-tight text-white opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{
              animationDelay: "280ms",
              animationFillMode: "forwards",
              fontFamily: "var(--font-display), ui-serif, Georgia, serif",
            }}
          >
            {partner.headline}
          </h1>
          <p
            className="animate-fade-in-up mt-4 max-w-xl text-base text-stone-300 opacity-0 sm:text-lg"
            style={{ animationDelay: "360ms", animationFillMode: "forwards" }}
          >
            {partner.subheadline}
          </p>
          <p
            className="animate-fade-in-up mt-2 max-w-xl text-sm text-stone-400 opacity-0"
            style={{ animationDelay: "440ms", animationFillMode: "forwards" }}
          >
            {partner.primaryMessage}
          </p>
          <div
            className="mt-6 flex flex-wrap gap-3"
            style={{ animationDelay: "520ms", animationFillMode: "forwards" }}
          >
            <LuxButton onClick={onBrowse} className="animate-fade-in-up opacity-0">
              Browse vehicles
            </LuxButton>
            <LuxButton
              variant="ghost"
              className="animate-fade-in-up border-white/20 bg-white/5 text-white opacity-0 hover:bg-white/15 hover:text-white"
              onClick={onAskReception}
            >
              Ask reception to assist
            </LuxButton>
          </div>
          <div
            className="animate-fade-in-up mt-6 flex flex-wrap gap-6 text-[0.7rem] text-stone-500 opacity-0 sm:text-xs"
            style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
          >
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-accent/70" />
              <span>{partner.season.lowSeasonLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-6 bg-accent/70" />
              <span>{partner.season.highSeasonLabel}</span>
            </div>
          </div>
        </div>

        {/* Partnership badge */}
        <div
          className="animate-fade-in-up mt-8 inline-flex rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-[0.65rem] text-stone-400 backdrop-blur-sm opacity-0 sm:text-xs"
          style={{ animationDelay: "680ms", animationFillMode: "forwards" }}
        >
          In partnership with Aggelos Rentals
        </div>
      </div>

      {/* Scroll cue */}
      <div
        className="animate-scroll-cue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 opacity-0"
        aria-hidden
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-stone-500">
            Scroll to explore
          </span>
          <svg
            className="h-5 w-5 text-stone-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}

function VehicleDetailSheet({
  vehicle,
  onClose,
  partnerName,
  whatsappNumber
}: {
  vehicle: Vehicle;
  onClose: () => void;
  partnerName: string;
  whatsappNumber?: string;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [pickupDate, setPickupDate] = useState(() => formatDate(0));
  const [returnDate, setReturnDate] = useState(() => formatDate(1));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("12:00");
  const [guestName, setGuestName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [referenceCode] = useState(() => generateReferenceCode());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const focusables = el.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    el.addEventListener("keydown", onKeyDown);
    return () => el.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const toggleExtra = (id: string) => {
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

  const copyReference = useCallback(() => {
    navigator.clipboard.writeText(referenceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [referenceCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const phone = whatsappNumber?.replace(/[^\d]/g, "");
      if (!phone) {
        setStatus("error");
        return;
      }

      const lines = [
        `New vehicle request from The Rooster guest (Ref: ${referenceCode}):`,
        "",
        `Vehicle: ${vehicle.name} (${vehicle.category})`,
        `Dates: ${pickupDate} ${pickupTime} – ${returnDate} ${returnTime}`,
        `Guest name: ${guestName}`,
        `Room number: ${roomNumber}`,
        `Extras: ${extras.length ? extras.join(", ") : "None"}`,
        "",
        `Reference: ${referenceCode}`
      ];

      const message = encodeURIComponent(lines.join("\n"));
      const url = `https://wa.me/${phone}?text=${message}`;

      window.open(url, "_blank");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const disabled =
    !pickupDate || !returnDate || !guestName || !roomNumber || status === "sending";

  const oneLiner = `${vehicle.category} · ${vehicle.seats} seats · ${vehicle.transmission === "automatic" ? "Auto" : "Manual"} · from ${vehicle.pricing.lowSeason} €/day`;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm animate-fade-in md:items-center">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vehicle-detail-title"
        className="glass-surface relative flex h-[100dvh] max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-stone-200 bg-white animate-slide-up md:h-[85vh] md:max-h-[90vh] md:rounded-3xl md:animate-modal-scale"
      >
        <h2 id="vehicle-detail-title" className="sr-only">
          {vehicle.name} – request form
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 rounded-full border border-stone-200 bg-stone-100 px-3 py-1.5 text-xs text-textMuted hover:bg-stone-200 sm:right-5 sm:top-5"
        >
          Close
        </button>

        {/* Success state */}
        {status === "sent" && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8 text-center">
            <div className="animate-success-check flex h-16 w-16 items-center justify-center rounded-full bg-amber-50">
              <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-textPrimary">Your request is on its way</h3>
              <p className="mt-2 text-sm text-textMuted">
                Reception will confirm within a few hours. Show them your reference code if needed.
              </p>
            </div>
            <p className="text-xs text-textMuted">
              Reference: <span className="font-mono text-textPrimary">{referenceCode}</span>{" "}
              <button
                type="button"
                onClick={copyReference}
                className="text-accent underline transition-opacity hover:opacity-80"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </p>
          </div>
        )}

        {/* Mobile: compact one-screen layout with details + form */}
        {status !== "sent" && (
        <div className="flex flex-1 flex-col overflow-y-auto p-3 md:hidden">
          <div className="mb-2 pr-16">
            <Tag>{vehicle.category}</Tag>
            <p className="mt-1 text-base font-semibold text-textPrimary">{vehicle.name}</p>
            <p className="mt-0.5 line-clamp-2 text-[0.65rem] leading-tight text-textMuted">
              {vehicle.descriptionLong}
            </p>
            <div className="mt-2 grid grid-cols-2 gap-1.5 text-[0.6rem]">
              <span className="text-textMuted">Seats:</span>
              <span className="text-textPrimary">{vehicle.seats}</span>
              <span className="text-textMuted">Transmission:</span>
              <span className="text-textPrimary">
                {vehicle.transmission === "automatic" ? "Automatic" : "Manual"}
              </span>
              <span className="text-textMuted">Luggage:</span>
              <span className="text-textPrimary">
                {vehicle.luggage === "large"
                  ? "Generous"
                  : vehicle.luggage === "medium"
                  ? "Medium"
                  : "Light"}
              </span>
              <span className="text-textMuted">Best for:</span>
              <span className="text-textPrimary">{vehicle.tags.slice(0, 2).join(", ")}</span>
            </div>
            <div className="mt-2 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1.5 text-[0.6rem] text-textMuted">
              <span className="text-textMuted/90">Rates: </span>
              <span className="font-semibold text-accent">{vehicle.pricing.lowSeason} €</span>
              <span> low / </span>
              <span className="font-semibold text-accent">{vehicle.pricing.highSeason} €</span>
              <span> high per day</span>
              <p className="mt-1 text-[0.55rem]">Delivered to The Rooster. Keys at reception.</p>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1.5 border-t border-stone-200 pt-2 text-[0.7rem] text-textMuted">
            <p className="font-semibold uppercase tracking-wider text-textMuted">
              Create request
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-1.5" id="request-form-mobile">
              <div className="grid grid-cols-2 gap-2">
                <Field label="Pick-up date">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={formatDate(0)}
                    required
                    className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-[0.7rem] text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Return date">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || formatDate(0)}
                    required
                    className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-[0.7rem] text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Pick-up time">
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-[0.7rem] text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Return time">
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-[0.7rem] text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Guest name">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-[0.7rem] text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Room number">
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    className="w-full rounded-lg border border-stone-200 bg-white px-2 py-1.5 text-[0.7rem] text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
              </div>
              <Field label="Extras">
                <div className="flex flex-wrap gap-1.5" role="group" aria-label="Extras">
                  {[
                    { id: "child-seat", label: "Child seat" },
                    { id: "extra-driver", label: "Extra driver" },
                    { id: "full-insurance", label: "Insurance" },
                  ].map((extra) => {
                    const active = extras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra.id)}
                        className={`rounded-full border px-2 py-0.5 text-[0.65rem] transition ${
                          active
                            ? "border-accent bg-amber-50 text-textPrimary"
                            : "border-stone-200 bg-stone-100 text-textMuted hover:border-stone-300"
                        }`}
                      >
                        {extra.label}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <LuxButton
                type="submit"
                disabled={disabled}
                className="mt-1 w-full justify-center py-2 text-[0.7rem]"
              >
                {status === "sending" ? "Sending…" : "Send request"}
              </LuxButton>
              <p className="text-[0.6rem] text-textMuted/80">
                Reference: <span className="font-mono text-textPrimary">{referenceCode}</span>{" "}
                <button
                  type="button"
                  onClick={copyReference}
                  className="text-accent underline transition-opacity hover:opacity-80"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </p>
              {status === "error" && (
                <p className="text-[0.65rem] text-red-600" role="alert">
                  Something went wrong. Show these details to reception to contact Aggelos Rentals.
                </p>
              )}
            </form>
          </div>
        </div>
        )}

        {/* Desktop: two-column layout */}
        {status !== "sent" && (
        <div className="hidden flex-1 grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-6 overflow-hidden p-5 md:grid md:p-7">
          <div className="flex flex-col gap-4 overflow-y-auto pr-1">
            <Tag>{vehicle.category}</Tag>
            <h2 className="text-2xl font-semibold tracking-tight text-textPrimary sm:text-3xl">
              {vehicle.name}
            </h2>
            <p className="text-xs text-textMuted">{vehicle.descriptionLong}</p>

            <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-textMuted sm:grid-cols-3">
              <Spec label="Best for" value={vehicle.tags.join(", ")} />
              <Spec label="Seats" value={`${vehicle.seats} guests`} />
              <Spec
                label="Transmission"
                value={vehicle.transmission === "automatic" ? "Automatic" : "Manual"}
              />
              <Spec
                label="Luggage"
                value={
                  vehicle.luggage === "large"
                    ? "Generous space"
                    : vehicle.luggage === "medium"
                    ? "Medium"
                    : "Light"
                }
              />
            </div>

            <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs text-textMuted sm:text-sm">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-textMuted">
                Exclusive partner rates for {partnerName}
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                <p>
                  <span className="text-textMuted/80">Low season:</span>{" "}
                  <span className="font-semibold text-accent">
                    {vehicle.pricing.lowSeason} € / day
                  </span>
                </p>
                <p>
                  <span className="text-textMuted/80">High season:</span>{" "}
                  <span className="font-semibold text-accent">
                    {vehicle.pricing.highSeason} € / day
                  </span>
                </p>
              </div>
              <p className="mt-2 text-[0.7rem] text-textMuted/80">
                Delivered to The Rooster. Keys at reception. Final confirmation and any tailored
                arrangements are handled by Aggelos Rentals together with reception.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto border-t border-stone-200 pt-4 text-xs text-textMuted md:border-l md:border-t-0 md:pl-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-textMuted">
              Create a request
            </p>
            <p className="text-[0.75rem] text-textMuted/90">
              Share a few details and we will open WhatsApp with a pre-filled message to Aggelos
              Rentals. Reception will then coordinate the booking on your behalf.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3" id="request-form-desktop">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pick-up date">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={formatDate(0)}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-textPrimary shadow-sm outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Return date">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || formatDate(0)}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-textPrimary shadow-sm outline-none focus:border-accent"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pick-up time">
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-textPrimary shadow-sm outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Return time">
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-textPrimary shadow-sm outline-none focus:border-accent"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Guest name">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-textPrimary shadow-sm outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Room number">
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs text-textPrimary shadow-sm outline-none focus:border-accent"
                  />
                </Field>
              </div>

              <Field label="Extras">
                <div className="flex flex-wrap gap-2" role="group" aria-label="Extras">
                  {[
                    { id: "child-seat", label: "Child seat" },
                    { id: "extra-driver", label: "Additional driver" },
                    { id: "full-insurance", label: "Enhanced insurance" }
                  ].map((extra) => {
                    const active = extras.includes(extra.id);
                    return (
                      <button
                        key={extra.id}
                        type="button"
                        onClick={() => toggleExtra(extra.id)}
                        className={`rounded-full border px-3 py-1 text-[0.7rem] transition ${
                          active
                            ? "border-accent bg-amber-50 text-textPrimary"
                            : "border-stone-200 bg-stone-100 text-textMuted hover:border-stone-300"
                        }`}
                      >
                        {extra.label}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="mt-2 flex flex-col gap-2">
                <LuxButton
                  type="submit"
                  disabled={disabled}
                  className="w-full justify-center text-xs"
                >
                  {status === "sending" ? "Sending request…" : "Send request details"}
                </LuxButton>
                <p className="text-[0.68rem] text-textMuted/70">
                  This does not immediately charge you. WhatsApp will open so you or reception can
                  send the request directly to Aggelos Rentals, who will confirm availability,
                  pricing and any additional arrangements with you.
                </p>
                <p className="text-[0.68rem] text-textMuted/60">
                  Reference code: <span className="font-mono text-textPrimary">{referenceCode}</span>{" "}
                  <button
                    type="button"
                    onClick={copyReference}
                    className="text-accent underline transition-opacity hover:opacity-80"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </p>
                {status === "error" && (
                  <p className="text-[0.68rem] text-red-600" role="alert">
                    Something went wrong. Please show these details to reception and they will
                    contact Aggelos Rentals directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-stone-50 p-3">
      <p className="text-[0.65rem] uppercase tracking-[0.2em] text-textMuted">{label}</p>
      <p className="mt-1 text-xs text-textPrimary">{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[0.7rem] text-textMuted/80">{label}</span>
      {children}
    </label>
  );
}

function formatDate(offsetDays: number) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

function generateReferenceCode() {
  const now = new Date();
  const yy = now.getFullYear().toString().slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const rand = String(Math.floor(Math.random() * 900) + 100);
  return `TR-${yy}${mm}${dd}-${rand}`;
}

