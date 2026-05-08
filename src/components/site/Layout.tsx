import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { RouteLoader } from "./RouteLoader";
import { PageTransition } from "./PageTransition";
import { ScrollProgress } from "./ScrollProgress";
import { AutoReveal } from "./AutoReveal";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <RouteLoader />
      <Header />
      <main className="flex-1 touch-tap">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingActions />
      <AutoReveal />
    </div>
  );
}

export function PageHero({ eyebrow, title, subtitle, image }: {
  eyebrow?: string; title: string; subtitle?: string; image?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      {image && <img src={image} alt="" className="absolute inset-0 size-full object-cover" />}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.78_0.14_85/0.25),transparent_50%)]" />
      <div className="relative container mx-auto px-6 py-24 md:py-36 text-primary-foreground animate-fade-up">
        {eyebrow && <div className="inline-block mb-4 px-4 py-1.5 rounded-full glass-dark text-gold text-xs uppercase tracking-[0.2em] font-semibold">{eyebrow}</div>}
        <h1 className="font-display text-4xl md:text-6xl font-bold max-w-3xl leading-[1.05]">{title}</h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg opacity-90 leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
