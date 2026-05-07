import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  GraduationCap, Trophy, Bus, BookOpen, Microscope, Palette,
  Award, ShieldCheck, Sparkles, ArrowRight, Quote, Star, Users, Calendar,
} from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import { SCHOOL } from "@/lib/school";
import hero1 from "@/assets/dws/Artboard-1.webp";
import hero2 from "@/assets/dws/Artboard-2.webp";
import hero3 from "@/assets/dws/Artboard-3.webp";
import hero4 from "@/assets/dws/Artboard-4.webp";
import slider from "@/assets/dws/slider7-1.webp";
import campus1 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.38-AM.jpeg";
import campus2 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.40-AM.jpeg";
import campus3 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.41-AM.jpeg";
import campus4 from "@/assets/dws/WhatsApp-Image-2024-10-02-at-10.15.39-AM.jpeg";
import event1 from "@/assets/dws/number-1-school-scaled.jpg";
import event2 from "@/assets/dws/clat-2025.jpg";
import event3 from "@/assets/dws/CUET-2025.png";
import event4 from "@/assets/dws/ca-foundation.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Daffodils World School | Best CBSE School in Sikar" },
      { name: "description", content: "Founded in 2008, Daffodils World School Sikar is a premier CBSE institution. 5000+ students, 108 faculty, smart classrooms, modern labs and 71 transport buses." },
      { property: "og:title", content: "Daffodils World School | Best CBSE School in Sikar" },
      { property: "og:description", content: "Premier CBSE school in Sikar shaping future-ready leaders since 2008." },
      { property: "og:image", content: "/dws-og.jpg" },
    ],
  }),
  component: HomePage,
});

const heroSlides = [
  { img: hero1, title: "Where Excellence Meets Tradition", sub: "A premier CBSE school nurturing global citizens since 2008." },
  { img: hero2, title: "Inspiring Tomorrow's Leaders Today", sub: "Holistic education that shapes character, intellect and purpose." },
  { img: hero3, title: "Academic Brilliance. Boundless Curiosity.", sub: "Smart classrooms, modern labs, world-class faculty." },
  { img: hero4, title: "A Garden of Strength & Discipline", sub: "Where every child writes their own remarkable story." },
  { img: slider, title: "5000+ Daffodils. One Family.", sub: "Sikar's most trusted name in school education." },
];

function Counter({ to, suffix = "+", label }: { to: number; suffix?: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1800; const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold">{n.toLocaleString()}{suffix}</div>
      <div className="mt-2 text-xs md:text-sm uppercase tracking-widest text-primary-foreground/80">{label}</div>
    </div>
  );
}

function HomePage() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[640px] overflow-hidden">
        {heroSlides.map((s, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}>
            <img src={s.img} alt="" className="size-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(0.78_0.14_85/0.25),transparent_60%)]" />

        <div className="relative h-full container mx-auto px-6 flex flex-col justify-center text-primary-foreground">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="inline-flex items-center gap-2 mb-5 self-start px-4 py-1.5 rounded-full glass-dark text-gold text-[11px] uppercase tracking-[0.25em] font-semibold">
            <Sparkles className="size-3" /> Admissions Open · 2026–27
          </motion.div>
          <motion.h1 key={slide} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.02] max-w-5xl">
            {heroSlides[slide].title}
          </motion.h1>
          <motion.p key={`s${slide}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-6 text-lg md:text-2xl opacity-90 max-w-2xl font-light">
            {heroSlides[slide].sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
            <Link to="/admissions" className="group inline-flex items-center gap-2 px-7 py-4 rounded-full gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-105 transition">
              Begin Your Journey <ArrowRight className="size-4 group-hover:translate-x-1 transition" />
            </Link>
            <Link to="/facilities" className="inline-flex items-center gap-2 px-7 py-4 rounded-full glass-dark text-primary-foreground font-medium hover:bg-white/15 transition">
              Virtual Campus Tour
            </Link>
          </motion.div>

          {/* slide dots */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button key={i} onClick={() => setSlide(i)} aria-label={`slide ${i+1}`}
                className={`h-1.5 rounded-full transition-all ${i === slide ? "w-10 bg-gold" : "w-4 bg-white/40"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="relative -mt-20 z-10 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden shadow-elegant gradient-royal">
          {[
            { n: SCHOOL.experience, l: "Years of Excellence", suf: "+" },
            { n: 5001, l: "Happy Students", suf: "+" },
            { n: 108, l: "Expert Faculty", suf: "+" },
            { n: 71, l: "Transport Buses", suf: "+" },
          ].map((s) => (
            <div key={s.l} className="p-8 bg-primary"><Counter to={s.n} suffix={s.suf} label={s.l} /></div>
          ))}
        </div>
      </section>

      {/* WELCOME */}
      <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
        <div>
          <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-4">A Legacy Since 2008</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-gradient-royal">
            A garden of strength,<br/>discipline and dedication.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Daffodils World School began with seventeen students and a singular vision — to mould inquirers,
            investigators and exemplary citizens. Under the leadership of Director {SCHOOL.director}, that
            seedling has blossomed into Sikar's most respected CBSE institution: a vibrant home to
            five thousand learners and a dedicated faculty of over a hundred.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { i: ShieldCheck, t: "CBSE Affiliated", d: `No. ${SCHOOL.affiliation}` },
              { i: Award, t: "Top Ranked", d: "Best CBSE School, Sikar" },
              { i: Users, t: "5000+ Family", d: "Students & alumni" },
              { i: Trophy, t: "Board Toppers", d: "Year after year" },
            ].map(({ i: Icon, t, d }) => (
              <div key={t} className="p-4 rounded-xl border border-border bg-card">
                <Icon className="size-5 text-gold mb-2" />
                <div className="font-semibold text-sm">{t}</div>
                <div className="text-xs text-muted-foreground">{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 gradient-gold opacity-20 blur-3xl rounded-full" />
          <div className="relative grid grid-cols-2 gap-4">
            <img src={campus1} alt="Campus" className="rounded-2xl shadow-elegant aspect-[4/5] object-cover translate-y-6" />
            <img src={campus2} alt="Campus life" className="rounded-2xl shadow-elegant aspect-[4/5] object-cover" />
            <img src={campus3} alt="Activities" className="rounded-2xl shadow-elegant aspect-[4/5] object-cover" />
            <img src={campus4} alt="Sports" className="rounded-2xl shadow-elegant aspect-[4/5] object-cover -translate-y-6" />
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-secondary/40 py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">Our Pillars</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-royal">Designed for whole-child excellence</h2>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-5">
            {[
              { i: GraduationCap, t: "Smart Classrooms", d: "Educomp-powered, technology-enabled learning spaces." },
              { i: BookOpen, t: "Smart Library", d: "A vast collection curated to spark every curiosity." },
              { i: Microscope, t: "Modern Labs", d: "Four fully equipped science & computer laboratories." },
              { i: Palette, t: "Arts & Activity", d: "Music, dance, art and craft — Indian and Western." },
              { i: Trophy, t: "Sports", d: "Pool, cricket, basketball, skating and indoor badminton." },
              { i: Bus, t: "Safe Transport", d: "GPS-tracked fleet of 71 buses across Sikar." },
            ].map(({ i: Icon, t, d }) => (
              <motion.div key={t} whileHover={{ y: -6 }} className="p-6 rounded-2xl bg-card border border-border hover:border-gold transition shadow-sm hover:shadow-royal">
                <div className="size-12 rounded-xl gradient-royal grid place-items-center mb-4">
                  <Icon className="size-6 text-gold" />
                </div>
                <div className="font-semibold mb-1">{t}</div>
                <div className="text-xs text-muted-foreground leading-relaxed">{d}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECTOR + PRINCIPAL */}
      <section className="container mx-auto px-6 py-24 grid md:grid-cols-2 gap-8">
        {[
          { who: "From the Director's Desk", name: SCHOOL.director, role: "Director", quote: "A student is a learner — and for a learner, the prime duty is to learn good, unlearn bad, and keep the spirit high to learn lifelong, because life never stops teaching. In the classroom of life, we learn the lessons of humanity." },
          { who: "From the Principal's Desk", name: SCHOOL.principal, role: "Principal", quote: "I extend a warm welcome to Daffodils World School. The search for a complete schooling experience in Sikar leads here — a serene, sprawling campus offering the perfect balance between academic ethos and the vivacity of life." },
        ].map((p) => (
          <motion.div key={p.who} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative p-8 md:p-10 rounded-3xl gradient-royal text-primary-foreground overflow-hidden">
            <Quote className="absolute top-6 right-6 size-20 text-gold/20" />
            <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">{p.who}</div>
            <p className="text-base md:text-lg italic opacity-95 leading-relaxed">"{p.quote}"</p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="font-display text-xl text-gold">{p.name}</div>
              <div className="text-xs uppercase tracking-widest opacity-70">{p.role}</div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* EVENTS / ACHIEVEMENTS */}
      <section className="bg-gradient-to-b from-secondary/30 to-background py-24">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">Events & Achievements</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-royal">Recent celebrations</h2>
            </div>
            <Link to="/foundation" className="text-sm font-semibold text-primary hover:text-gold transition inline-flex items-center gap-1">
              View all <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: event1, tag: "Recognition", t: "Number One CBSE School" },
              { img: event2, tag: "CLAT 2025", t: "Law aspirants shine" },
              { img: event3, tag: "CUET 2025", t: "University-bound stars" },
              { img: event4, tag: "CA Foundation", t: "Future chartered accountants" },
            ].map((e) => (
              <motion.div key={e.t} whileHover={{ y: -6 }} className="group rounded-2xl overflow-hidden bg-card shadow-sm hover:shadow-elegant transition">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={e.img} alt={e.t} className="size-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-1">{e.tag}</div>
                  <div className="font-semibold">{e.t}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3">Voices of Trust</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-royal">What parents say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "Mrs. Kavita Sharma", r: "Parent · Class IX", q: "The faculty's commitment to each child is exceptional. My daughter has grown academically and as a confident young leader." },
            { n: "Mr. Ramesh Kumawat", r: "Parent · Class XII", q: "From CBSE results to extracurriculars, Daffodils truly delivers a complete schooling experience." },
            { n: "Mrs. Priya Agarwal", r: "Parent · Class V", q: "Smart classrooms, safe buses, caring teachers. Choosing DWS was the best decision for our family." },
          ].map((t) => (
            <div key={t.n} className="p-7 rounded-2xl bg-card border border-border hover:border-gold/50 transition shadow-sm">
              <div className="flex gap-0.5 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="size-4 fill-gold text-gold" />)}</div>
              <p className="text-sm leading-relaxed text-foreground/85">"{t.q}"</p>
              <div className="mt-5 pt-5 border-t border-border">
                <div className="font-semibold text-sm">{t.n}</div>
                <div className="text-xs text-muted-foreground">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden gradient-royal p-10 md:p-16 text-primary-foreground shadow-elegant">
          <div className="absolute -top-20 -right-20 size-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 size-72 rounded-full bg-primary-glow/30 blur-3xl" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-gold text-xs uppercase tracking-[0.25em] font-semibold mb-3 flex items-center gap-2"><Calendar className="size-4" /> Admissions 2026–27 Open</div>
              <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight max-w-2xl">Begin your child's extraordinary story.</h3>
              <p className="mt-4 opacity-85 max-w-xl">Limited seats available across Nursery to Class XII. Reserve your place today.</p>
            </div>
            <Link to="/admissions" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-105 transition">
              Apply Online <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
