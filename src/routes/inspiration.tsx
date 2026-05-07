import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import slider from "@/assets/dws/slider7-1.webp";

export const Route = createFileRoute("/inspiration")({
  head: () => ({
    meta: [
      { title: "Our Inspiration | Daffodils World School" },
      { name: "description", content: "The vision and values that inspire Daffodils World School — a CBSE institution rooted in service, scholarship and character." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Our Inspiration" title="A vision shaped by service and scholarship" image={slider} />
      <section className="container mx-auto px-6 py-20 max-w-3xl">
        <p className="text-lg leading-relaxed text-foreground/85">
          Daffodils World School was conceived not as a building, but as a belief — that every child carries
          within them the seed of greatness, and that the role of a school is to provide the soil, light and
          care for that seed to flower. Our founders drew inspiration from India's great teachers and from
          the world's finest learning traditions, weaving them into a singular philosophy: rigorous in
          academics, generous in spirit, and unwavering in values.
        </p>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl gradient-royal text-primary-foreground shadow-royal">
            <div className="text-gold text-xs uppercase tracking-widest mb-2">Vision</div>
            <p className="leading-relaxed">To mould our students into academically competent persons, inquirers and investigators — individuals of exemplary behaviour who are responsible and rational thinkers.</p>
          </div>
          <div className="p-7 rounded-2xl border border-gold/40 bg-card">
            <div className="text-gold text-xs uppercase tracking-widest mb-2">Mission</div>
            <p className="leading-relaxed text-foreground/85">To walk our learners down the road which leads them to develop a thirst for knowledge such that its discovery leads to the enrichment of life.</p>
          </div>
        </div>
      </section>
    </SiteLayout>
  ),
});
