import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { Menu, X, Phone } from "lucide-react";
import { NAV, SCHOOL } from "@/lib/school";
import logo from "@/assets/dws/logo.png";

function haptic(ms = 12) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try { navigator.vibrate(ms); } catch { /* noop */ }
  }
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

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
            {NAV.map((n) => {
              const active = isActive(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => haptic(8)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-md transition ${active ? "text-primary" : "text-foreground/80 hover:text-primary"}`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-md bg-secondary -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{n.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full gradient-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/admissions"
              onClick={() => haptic(14)}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full gradient-gold text-gold-foreground font-semibold text-sm shadow-gold hover:scale-105 transition"
            >
              Apply Now
            </Link>
            <button
              aria-label="Menu"
              className="lg:hidden p-2 rounded-md hover:bg-secondary"
              onClick={() => { haptic(12); setOpen(!open); }}
            >
              <motion.span
                key={open ? "x" : "m"}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className="inline-flex"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden border-t border-border bg-background overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } }}
                className="container mx-auto px-6 py-4 flex flex-col gap-1"
              >
                {NAV.map((n) => {
                  const active = isActive(n.to);
                  return (
                    <motion.div
                      key={n.to}
                      variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                      transition={{ type: "spring", stiffness: 320, damping: 28 }}
                    >
                      <Link
                        to={n.to}
                        onClick={() => { haptic(10); setOpen(false); }}
                        className={`relative block px-3 py-2.5 rounded-md text-sm font-medium hover:bg-secondary ${active ? "bg-secondary text-primary font-semibold" : ""}`}
                      >
                        {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full gradient-gold" />}
                        {n.label}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
                  <Link
                    to="/admissions"
                    onClick={() => { haptic(14); setOpen(false); }}
                    className="mt-2 inline-flex w-full items-center justify-center px-5 py-3 rounded-full gradient-gold text-gold-foreground font-semibold text-sm shadow-gold"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
