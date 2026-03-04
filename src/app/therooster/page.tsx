"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
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
  const [selectedType, setSelectedType] = useState<"all" | VehicleType>("all");
  const [transmission, setTransmission] = useState<TransmissionFilter>("any");
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

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
      <HeroSection
        onBrowse={() => {
          const el = document.getElementById("fleet-grid");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
      />

      <SectionShell>
        <div className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-surface/80 p-5 shadow-soft backdrop-blur-xl sm:p-7">
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
              <select
                className="glass-surface rounded-full px-4 py-2 text-xs text-textMuted outline-none"
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as TransmissionFilter)}
              >
                <option value="any">Any transmission</option>
                <option value="automatic">Automatic only</option>
                <option value="manual">Manual only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
            {categoryFilters.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedType(cat.id)}
                className={`group flex flex-col items-start justify-between rounded-2xl border px-3 py-3 text-left text-xs transition md:px-4 md:py-4 ${
                  selectedType === cat.id
                    ? "border-accent bg-accent/10 text-textPrimary"
                    : "border-white/8 bg-white/0 text-textMuted hover:border-white/20 hover:bg-white/5"
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((vehicle) => (
              <article
                key={vehicle.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-surface/80 shadow-soft backdrop-blur-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/70" />
                  {vehicle.images[0] ? (
                    <Image
                      src={vehicle.images[0]}
                      alt={vehicle.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/10 to-black/60">
                      <span className="text-xs font-semibold tracking-[0.22em] text-textMuted">
                        IMAGE PLACEHOLDER
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1">
                    <Tag>{vehicle.category}</Tag>
                    <p className="text-sm font-semibold text-textPrimary sm:text-base">
                      {vehicle.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
                  <p className="text-xs text-textMuted">{vehicle.descriptionShort}</p>
                  <div className="flex items-center justify-between text-xs text-textMuted">
                    <div className="flex gap-4">
                      <span>{vehicle.seats} seats</span>
                      <span className="hidden sm:inline">
                        {vehicle.transmission === "automatic" ? "Automatic" : "Manual"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-textMuted">
                        From
                      </p>
                      <p className="text-sm font-semibold text-accent">
                        {vehicle.pricing.lowSeason} €{" "}
                        <span className="text-[0.7rem] font-normal text-textMuted">/ day</span>
                      </p>
                    </div>
                  </div>
                  <LuxButton
                    onClick={() => setSelectedVehicle(vehicle)}
                    className="mt-auto w-full justify-center"
                  >
                    View details &amp; request
                  </LuxButton>
                </div>
              </article>
            ))}
          </div>
        </div>
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

function HeroSection({ onBrowse }: { onBrowse: () => void }) {
  if (!partner) return null;

  return (
    <div className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,15,20,1),_#050608_70%)]" />
      <SectionShell>
        <div className="relative z-10 grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
          <div className="space-y-6">
            <Tag>Exclusively for guests of {partner.name}</Tag>
            <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
              {partner.headline}
            </h1>
            <p className="max-w-xl text-sm text-textMuted sm:text-base">
              {partner.subheadline}
            </p>
            <p className="max-w-xl text-xs text-textMuted/90 sm:text-sm">
              {partner.primaryMessage}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <LuxButton onClick={onBrowse}>Browse vehicles</LuxButton>
              <LuxButton variant="ghost">Ask reception to assist</LuxButton>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-[0.7rem] text-textMuted/80 sm:text-xs">
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

          <div className="relative">
            <div className="glass-surface relative aspect-[4/3] overflow-hidden rounded-[1.75rem]">
              {partner.heroImage ? (
                <Image
                  src={partner.heroImage}
                  alt={`Fleet for guests of ${partner.name}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 420px, 100vw"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/8 to-black/80">
                  <div className="text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-textMuted">
                      FLEET PREVIEW
                    </p>
                    <p className="mt-3 text-sm text-textMuted">
                      Hero imagery for The Rooster and your flagship vehicles will appear here.
                    </p>
                  </div>
                </div>
              )}
            </div>
            {partner.logo && (
              <div className="pointer-events-none absolute -bottom-6 right-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-background/80 px-4 py-3 text-[0.65rem] text-textMuted shadow-soft backdrop-blur-xl sm:text-xs">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/40 p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logo}
                    alt=""
                    className="h-full w-full object-contain object-center"
                  />
                </div>
                <span>In partnership with Aggelos Rentals</span>
              </div>
            )}
          </div>
        </div>
      </SectionShell>
    </div>
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
  const [pickupDate, setPickupDate] = useState(() => formatDate(0));
  const [returnDate, setReturnDate] = useState(() => formatDate(1));
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("12:00");
  const [guestName, setGuestName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [referenceCode] = useState(() => generateReferenceCode());
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const toggleExtra = (id: string) => {
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  };

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

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center">
      <div className="glass-surface relative flex h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-surface/95 md:h-[80vh] md:rounded-3xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-textMuted hover:bg-black/70"
        >
          Close
        </button>
        <div className="grid flex-1 gap-6 overflow-hidden p-5 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:p-7">
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

            <div className="mt-4 rounded-2xl border border-white/10 bg-black/40 p-4 text-xs text-textMuted sm:text-sm">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-textMuted">
                Partner rates for {partnerName}
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
                Final confirmation, inclusions and any tailored arrangements are handled directly
                by Aggelos Rentals together with reception.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto border-t border-white/10 pt-4 text-xs text-textMuted md:border-l md:border-t-0 md:pl-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-textMuted">
              Create a request
            </p>
            <p className="text-[0.75rem] text-textMuted/90">
              Share a few details and we will open WhatsApp with a pre-filled message to Aggelos
              Rentals. Reception will then coordinate the booking on your behalf.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pick-up date">
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    min={formatDate(0)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Return date">
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={pickupDate || formatDate(0)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Pick-up time">
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Return time">
                  <input
                    type="time"
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Guest name">
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
                <Field label="Room number">
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-textPrimary outline-none focus:border-accent"
                  />
                </Field>
              </div>

              <Field label="Extras">
                <div className="flex flex-wrap gap-2">
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
                            ? "border-accent bg-accent/15 text-textPrimary"
                            : "border-white/10 bg-black/30 text-textMuted hover:border-white/25"
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
                  {status === "sending"
                    ? "Sending request…"
                    : status === "sent"
                    ? "Request sent – show this to reception"
                    : "Send request details"}
                </LuxButton>
                <p className="text-[0.68rem] text-textMuted/70">
                  This does not immediately charge you. WhatsApp will open so you or reception can
                  send the request directly to Aggelos Rentals, who will confirm availability,
                  pricing and any additional arrangements with you.
                </p>
                <p className="text-[0.68rem] text-textMuted/60">
                  Reference code for this request:&nbsp;
                  <span className="font-mono text-textPrimary">{referenceCode}</span>
                </p>
                {status === "error" && (
                  <p className="text-[0.68rem] text-red-300">
                    Something went wrong sending the request. Please show these details to
                    reception and they will contact Aggelos Rentals directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/40 p-3">
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

