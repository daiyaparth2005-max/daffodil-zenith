import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteLayout } from "@/components/site/Layout";
import { ArrowRight, Compass, Info, MapPin, Maximize2, Sparkles, X } from "lucide-react";
import entrance from "@/assets/dws/pano-entrance.jpg";
import classroom from "@/assets/dws/pano-classroom.jpg";
import lab from "@/assets/dws/pano-lab.jpg";
import library from "@/assets/dws/pano-library.jpg";
import playground from "@/assets/dws/pano-playground.jpg";

type Hotspot = {
  x: number; // 0-100 (% of panorama width)
  y: number; // 0-100 (% of height)
  title: string;
  body: string;
  goto?: string;
};

type Scene = {
  id: string;
  name: string;
  tagline: string;
  image: string;
  hotspots: Hotspot[];
};

const SCENES: Scene[] = [
  {
    id: "entrance",
    name: "Main Entrance",
    tagline: "The grand façade welcoming 5,000 daffodils every morning.",
    image: entrance,
    hotspots: [
      { x: 50, y: 55, title: "Reception Lobby", body: "Visitor sign-in, security desk and the heart of campus arrivals.", goto: "classroom" },
      { x: 22, y: 70, title: "Daffodil Garden", body: "The signature yellow daffodils that give our school its name." },
      { x: 78, y: 60, title: "Administrative Block", body: "Principal's office, accounts and counselling rooms." },
    ],
  },
  {
    id: "classroom",
    name: "Smart Classroom",
    tagline: "Educomp-powered, airy, technology-enabled learning spaces.",
    image: classroom,
    hotspots: [
      { x: 50, y: 40, title: "Interactive Smartboard", body: "75-inch interactive panels with rich CBSE-mapped content." },
      { x: 18, y: 45, title: "Daylight Windows", body: "Floor-to-ceiling glazing — every classroom is naturally lit." },
      { x: 80, y: 45, title: "Climate Control", body: "Air-conditioned and ventilated for year-round comfort." },
      { x: 65, y: 75, title: "Ergonomic Seating", body: "Posture-friendly furniture sized for every age group.", goto: "lab" },
    ],
  },
  {
    id: "lab",
    name: "Science Laboratory",
    tagline: "Four fully equipped labs for physics, chemistry, biology and computers.",
    image: lab,
    hotspots: [
      { x: 18, y: 55, title: "Microscopy Bench", body: "Compound and stereo microscopes for inquiry-led biology." },
      { x: 50, y: 40, title: "Periodic Table Wall", body: "Reference charts and safety protocols at a glance." },
      { x: 82, y: 55, title: "Reagent Station", body: "Carefully labelled chemicals with safety lockers." },
      { x: 50, y: 78, title: "Experiment Stools", body: "Mobile lab stools for paired and group experiments.", goto: "library" },
    ],
  },
  {
    id: "library",
    name: "Smart Library",
    tagline: "A spacious sanctuary curated for every interest and reading level.",
    image: library,
    hotspots: [
      { x: 25, y: 50, title: "Reference Stacks", body: "20,000+ titles spanning literature, science and competitive prep." },
      { x: 50, y: 35, title: "Cathedral Window", body: "A reading-friendly skylight bathing the hall in soft daylight." },
      { x: 50, y: 75, title: "Discussion Tables", body: "Quiet collaboration zones for project work and study circles.", goto: "playground" },
    ],
  },
  {
    id: "playground",
    name: "Playground & Sports",
    tagline: "Pool, cricket, basketball, skating and a green outfield.",
    image: playground,
    hotspots: [
      { x: 50, y: 60, title: "Multi-Sport Court", body: "Basketball and futsal lines on a cushioned acrylic surface." },
      { x: 80, y: 55, title: "Play Equipment", body: "Slides, swings and climbing frames for primary years." },
      { x: 20, y: 55, title: "Athletics Track", body: "Marked running track for inter-house athletics." },
      { x: 50, y: 30, title: "Open Sky", body: "Wide-open horizon — fresh air every period.", goto: "entrance" },
    ],
  },
];

export const Route = createFileRoute("/tour")({
  head: () => ({
    meta: [
      { title: "Virtual 360° Campus Tour | Daffodils World School Sikar" },
      { name: "description", content: "Step inside Daffodils World School — explore classrooms, labs, library, playground and more in an immersive 360° walkthrough." },
      { property: "og:title", content: "Virtual 360° Tour — Daffodils World School" },
      { property: "og:description", content: "Explore the campus from anywhere with our interactive 360° tour." },
    ],
  }),
  component: TourPage,
});

function TourPage() {
  const [sceneId, setSceneId] = useState<string>("entrance");
  const [active, setActive] = useState<Hotspot | null>(null);
  const scene = SCENES.find((s) => s.id === sceneId)!;

  // panning logic
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<{ start: number; offset: number; current: number } | null>(null);
  const [offset, setOffset] = useState(0); // px translateX
  const [maxOffset, setMaxOffset] = useState(0);

  useEffect(() => {
    setActive(null);
    const update = () => {
      if (!wrapRef.current || !imgRef.current) return;
      const wrapW = wrapRef.current.clientWidth;
      const imgW = imgRef.current.scrollWidth;
      const m = Math.max(0, imgW - wrapW);
      setMaxOffset(m);
      setOffset(-m / 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [sceneId]);

  // auto pan
  useEffect(() => {
    if (drag || active) return;
    let raf = 0;
    let dir = 1;
    const tick = () => {
      setOffset((o) => {
        const next = o - 0.25 * dir;
        if (next < -maxOffset) dir = -1;
        if (next > 0) dir = 1;
        return Math.max(-maxOffset, Math.min(0, next));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [drag, active, maxOffset]);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    setDrag({ start: e.clientX, offset, current: e.clientX });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag) return;
    const dx = e.clientX - drag.start;
    const next = Math.max(-maxOffset, Math.min(0, drag.offset + dx));
    setOffset(next);
    setDrag({ ...drag, current: e.clientX });
  };
  const onPointerUp = () => setDrag(null);

  const goFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <SiteLayout>
      {/* Hero strip */}
      <section className="relative pt-10 pb-6 gradient-soft">
        <div className="absolute inset-0 gradient-mesh opacity-70 pointer-events-none" />
        <div className="relative container mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full glass-soft text-primary text-[11px] uppercase tracking-[0.25em] font-semibold shadow-soft">
                <Compass className="size-3.5" /> Immersive Tour
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] text-foreground">
                Step inside <span className="text-gradient-royal">Daffodils</span>
              </h1>
              <p className="mt-4 text-muted-foreground text-base md:text-lg">
                Explore the campus from any device — drag to pan, tap glowing dots to discover spaces.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={goFullscreen}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full glass-soft text-foreground font-medium shadow-soft hover:shadow-float transition">
                <Maximize2 className="size-4" /> Fullscreen
              </button>
              <Link to="/admissions"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-[1.03] transition">
                <Sparkles className="size-4" /> Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Panorama viewer */}
      <section className="relative bg-gradient-to-b from-background to-secondary/30 pb-10">
        <div className="container mx-auto px-3 md:px-6">
          <div
            ref={wrapRef}
            className="relative h-[60vh] min-h-[420px] md:min-h-[560px] rounded-[2rem] overflow-hidden shadow-elegant ring-1 ring-border bg-black select-none cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              ref={imgRef}
              className="absolute inset-y-0 left-0 will-change-transform"
              style={{ transform: `translateX(${offset}px)`, transition: drag ? "none" : "transform 0.06s linear" }}
            >
              <img
                src={scene.image}
                alt={scene.name}
                draggable={false}
                className="h-full w-auto max-w-none object-cover pointer-events-none"
              />
              {/* hotspots positioned over image */}
              {scene.hotspots.map((h, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActive(h); }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  aria-label={h.title}
                >
                  <span className="block size-5 rounded-full bg-gold ring-4 ring-gold/40 animate-pulse-glow shadow-gold" />
                  <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-9 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full glass-soft text-foreground shadow-soft opacity-0 group-hover:opacity-100 transition">
                    {h.title}
                  </span>
                </button>
              ))}
            </div>

            {/* subtle vignette */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,oklch(0_0_0/0.45)_100%)]" />

            {/* Scene title */}
            <div className="pointer-events-none absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
              <div className="px-4 py-2.5 rounded-2xl glass-soft shadow-soft">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold flex items-center gap-1"><MapPin className="size-3" /> Now Touring</div>
                <div className="font-display text-lg md:text-xl font-bold text-foreground">{scene.name}</div>
              </div>
              <div className="hidden md:block px-4 py-2 rounded-full glass-soft shadow-soft text-xs text-muted-foreground">
                Drag to look around · Tap dots to explore
              </div>
            </div>

            {/* Hotspot dialog */}
            <AnimatePresence>
              {active && (
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  transition={{ type: "spring", damping: 22, stiffness: 240 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[min(92%,440px)] glass-soft rounded-3xl p-5 shadow-float"
                >
                  <button onClick={() => setActive(null)} className="absolute top-3 right-3 size-8 grid place-items-center rounded-full hover:bg-secondary transition" aria-label="Close">
                    <X className="size-4" />
                  </button>
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-2xl gradient-leaf grid place-items-center shrink-0"><Info className="size-5 text-gold" /></div>
                    <div>
                      <div className="font-display text-lg font-bold text-foreground">{active.title}</div>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{active.body}</p>
                      {active.goto && (
                        <button
                          onClick={() => { const id = active.goto!; setActive(null); setSceneId(id); }}
                          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-gold transition"
                        >
                          Continue to {SCENES.find(s => s.id === active.goto)?.name} <ArrowRight className="size-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* pan progress */}
            {maxOffset > 0 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-44 h-1 rounded-full bg-white/20 overflow-hidden md:hidden">
                <div className="h-full bg-gold" style={{ width: `${((-offset) / maxOffset) * 100}%` }} />
              </div>
            )}
          </div>

          {/* Scene picker */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {SCENES.map((s) => {
              const isActive = s.id === sceneId;
              return (
                <button key={s.id} onClick={() => setSceneId(s.id)}
                  className={`group relative rounded-2xl overflow-hidden text-left ring-1 transition shadow-soft hover-lift ${isActive ? "ring-gold shadow-gold" : "ring-border"}`}>
                  <div className="aspect-[16/9] overflow-hidden">
                    <img src={s.image} alt={s.name} className="size-full object-cover group-hover:scale-105 transition duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute left-3 right-3 bottom-3 text-white">
                    <div className="text-[10px] uppercase tracking-widest text-gold font-semibold">Scene</div>
                    <div className="font-semibold text-sm leading-tight">{s.name}</div>
                  </div>
                  {isActive && <div className="absolute top-2 right-2 size-2.5 rounded-full bg-gold animate-pulse-glow" />}
                </button>
              );
            })}
          </div>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            <Sparkles className="inline size-3.5 text-gold" /> {scene.tagline}
          </p>
        </div>
      </section>

      {/* Feature strip */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-5">
        {[
          { t: "Drag-to-look", d: "Pan smoothly across each scene like a real visit." },
          { t: "Smart Hotspots", d: "Tap glowing dots to learn about every corner." },
          { t: "Scene Hopping", d: "Hop between classrooms, labs, library and grounds." },
        ].map((f) => (
          <div key={f.t} className="p-6 rounded-3xl glass-soft shadow-soft hover-lift">
            <div className="size-10 rounded-2xl gradient-gold grid place-items-center mb-3 shadow-gold">
              <Compass className="size-5 text-gold-foreground" />
            </div>
            <div className="font-semibold text-foreground">{f.t}</div>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{f.d}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}
