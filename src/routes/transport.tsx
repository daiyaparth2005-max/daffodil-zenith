import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Bus, MapPin, ShieldCheck, Radar } from "lucide-react";
import { SCHOOL } from "@/lib/school";

export const Route = createFileRoute("/transport")({
  head: () => ({
    meta: [
      { title: "Transport | Daffodils World School" },
      { name: "description", content: "Safe, GPS-tracked transport across Sikar with a fleet of 71 buses, trained drivers and lady attendants." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Safe Journeys" title="Transport that parents trust" subtitle={`A fleet of ${SCHOOL.buses} GPS-tracked buses, trained drivers and dedicated attendants — every route, every day.`} />
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-4 gap-5">
        {[
          { i: Bus, t: "71-Bus Fleet", d: "Modern, well-maintained buses serving every major locality across Sikar." },
          { i: Radar, t: "Live GPS Tracking", d: "Parents can track their child's bus in real time through the parent portal." },
          { i: ShieldCheck, t: "Safety First", d: "Speed governors, CCTV, first-aid kits and trained female attendants on every bus." },
          { i: MapPin, t: "Route Planning", d: "Optimised routes designed for shortest commute and stops near every neighbourhood." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="p-6 rounded-2xl gradient-royal text-primary-foreground shadow-royal">
            <Icon className="size-7 text-gold mb-4" />
            <div className="font-display text-lg mb-1">{t}</div>
            <p className="text-sm opacity-85">{d}</p>
          </div>
        ))}
      </section>
      <section className="container mx-auto px-6 pb-20">
        <div className="rounded-3xl overflow-hidden border border-border shadow-elegant aspect-[16/7]">
          <iframe title="Daffodils World School map" className="size-full"
            src="https://www.google.com/maps?q=Daffodils+World+School+Sikar&output=embed" loading="lazy" />
        </div>
      </section>
    </SiteLayout>
  ),
});
