import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { BookOpen, GraduationCap, Microscope, Music, Palette, Trophy, ShieldCheck, Heart } from "lucide-react";
import { motion } from "framer-motion";
import f1 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.40-AM.jpeg";

const items = [
  { i: GraduationCap, t: "Smart Classrooms", d: "Airy, spacious, technology-enabled and powered by Educomp Smart Class with abundant natural light and a feel of openness." },
  { i: BookOpen, t: "Library", d: "A spacious, thoughtfully curated library stocked with a vast collection to suit every interest and reading level." },
  { i: Palette, t: "Activity Block", d: "Fully equipped art, craft, music and dance facilities — both Western and Indian — to nurture appreciation and craft." },
  { i: Microscope, t: "Modern Laboratories", d: "Four well-equipped science and computer laboratories for hands-on, inquiry-led learning." },
  { i: Music, t: "Co-Curricular Programs", d: "Dance, music, dramatics, excursions, inter-school competitions and social-work outings boost confidence and self-esteem." },
  { i: Trophy, t: "Games & Sports", d: "Swimming pool, cricket pitch with green outfield, basketball court, skating rink and an indoor badminton court." },
  { i: ShieldCheck, t: "Safety & Security", d: "CCTV surveillance, fire-safety compliance, trained staff and child-protection protocols across the campus." },
  { i: Heart, t: "Wellness & Counselling", d: "On-campus medical care, two qualified counsellors and dedicated special educators for inclusive support." },
];

export const Route = createFileRoute("/facilities")({
  head: () => ({
    meta: [
      { title: "Facilities | Daffodils World School Sikar" },
      { name: "description", content: "World-class facilities at Daffodils World School Sikar — smart classrooms, modern labs, library, sports, swimming pool, arts and safe transport." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Campus" title="Facilities crafted for whole-child development" subtitle="Every space at Daffodils is designed to spark curiosity, courage and craft." image={f1} />
      <section className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ i: Icon, t, d }, idx) => (
            <motion.div key={t} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl border border-border bg-card hover:border-gold transition shadow-sm hover:shadow-royal">
              <div className="size-12 rounded-xl gradient-royal grid place-items-center mb-4"><Icon className="size-6 text-gold" /></div>
              <div className="font-semibold mb-2">{t}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  ),
});
