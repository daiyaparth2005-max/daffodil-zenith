import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { NAV, SCHOOL } from "@/lib/school";
import logo from "@/assets/dws/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden md:block gradient-royal text-primary-foreground text-xs">
        <div className="container mx-auto flex items-center justify-between px-6 py-2">
          <span className="opacity-90">CBSE Affiliation No. {SCHOOL.affiliation} · School Code {SCHOOL.schoolCode}</span>
          <div className="flex items-center gap-5 opacity-90">
            <a href={`tel:${SCHOOL.phone}`} className="flex items-center gap-1.5 hover:text-gold transition"><Phone className="size-3" /> {SCHOOL.phone}</a>
            <a href={`mailto:${SCHOOL.email}`} className="hover:text-gold transition">{SCHOOL.email}</a>
            <Link to="/portal" className="hover:text-gold transition">Parent Portal</Link>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass shadow-elegant" : "bg-background/80 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-full gradient-gold opacity-30 blur-md group-hover:opacity-60 transition" />
              <img src={logo} alt="Daffodils World School logo" className="relative size-12 rounded-full ring-2 ring-gold/60 bg-white p-1" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg md:text-xl font-bold text-gradient-royal">Daffodils World School</div>
              <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">Sikar · Since 2008</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="px-3 py-2 text-sm font-medium text-foreground/80 rounded-md hover:text-primary hover:bg-secondary transition"
                activeProps={{ className: "px-3 py-2 text-sm font-semibold rounded-md text-primary bg-secondary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/admissions"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-gold text-gold-foreground font-semibold text-sm shadow-gold hover:scale-105 transition"
            >
              Apply Now
            </Link>
            <button
              aria-label="Menu"
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-border bg-background animate-fade-up">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-secondary"
                  activeProps={{ className: "px-3 py-2.5 rounded-md text-sm font-semibold bg-secondary text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <Link
                to="/admissions"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-full gradient-gold text-gold-foreground font-semibold text-sm shadow-gold"
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
