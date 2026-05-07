import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { motion } from "framer-motion";
import f1 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.38-AM.jpeg";
import f2 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.40-AM.jpeg";
import f3 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.41-AM.jpeg";
import f4 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.39-AM.jpeg";

export const Route = createFileRoute("/foundation")({
  head: () => ({
    meta: [
      { title: "Foundation Years | Daffodils World School" },
      { name: "description", content: "Joyful, play-based foundation learning at Daffodils World School Sikar. Building curiosity, confidence and character from the earliest years." },
    ],
  }),
  component: () => {
    const photos = [f1, f2, f3, f4, f1, f2];
    return (
      <SiteLayout>
        <PageHero eyebrow="Early Years" title="The Foundation Stage" subtitle="Where wonder is the first lesson, and every child is celebrated for who they are." image={f1} />
        <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-gradient-royal mb-5">A joyful start to a lifelong journey</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Foundation programme is a warm, immersive ecosystem designed for ages 3–8. Through play, story,
              movement and inquiry, our youngest Daffodils develop language, numeracy, motor and social skills
              alongside an unshakeable belief in themselves. Every classroom is a safe garden — colourful,
              curated and led by specially trained early-years educators.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["NEP-aligned play-way pedagogy","Activity-rich, low student-teacher ratios","Daily art, music and movement","Phonics-led literacy and concrete numeracy","Mindful transitions and circle time","Parent-partnership through regular updates"].map((p) => (
                <li key={p} className="flex gap-2"><span className="text-gold">◆</span>{p}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, i) => (
              <motion.img key={i} src={p} alt="Foundation" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className={`rounded-2xl shadow-elegant aspect-square object-cover ${i % 3 === 1 ? "translate-y-6" : ""}`} />
            ))}
          </div>
        </section>
      </SiteLayout>
    );
  },
});
