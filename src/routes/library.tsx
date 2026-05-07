import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { Library, BookOpen, Wifi, Search } from "lucide-react";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Smart Library | Daffodils World School" },
      { name: "description", content: "A digitally enabled library that blends a vast print collection with smart catalogues, periodicals and reading lounges." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Knowledge Hub" title="The Smart Library" subtitle="A vast collection thoughtfully curated to suit the most varied interests — discoverable through a smart digital catalogue." />
      <section className="container mx-auto px-6 py-20 grid md:grid-cols-3 gap-6">
        {[
          { i: Library, t: "10,000+ Volumes", d: "Fiction, non-fiction, reference and rare collections across English and Hindi." },
          { i: Search, t: "Smart Catalogue", d: "Digital search, reservations and reading-history tracking for every learner." },
          { i: BookOpen, t: "Periodicals", d: "Newspapers, magazines and journals updated daily for current-affairs immersion." },
          { i: Wifi, t: "Reading Lounge", d: "Quiet, naturally lit reading bays with shared and individual study spaces." },
          { i: Library, t: "Digital Resources", d: "Curated e-books, encyclopaedias and STEM repositories for project work." },
          { i: BookOpen, t: "Reading Programmes", d: "Monthly book clubs, author meets and inter-house literary contests." },
        ].map(({ i: Icon, t, d }) => (
          <div key={t} className="p-7 rounded-2xl bg-card border border-border hover:border-gold transition">
            <Icon className="size-7 text-gold mb-4" />
            <div className="font-semibold mb-2">{t}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  ),
});
