import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from "lucide-react";
import { SCHOOL, NAV } from "@/lib/school";
import logo from "@/assets/dws/logo.png";

export function Footer() {
  return (
    <footer className="relative mt-24 gradient-royal text-primary-foreground overflow-hidden">
      <div className="absolute -top-40 -right-40 size-96 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-primary-glow/20 blur-3xl" />

      <div className="relative container mx-auto px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src={logo} alt="DWS" className="size-14 rounded-full bg-white p-1 ring-2 ring-gold/60" />
            <div>
              <div className="font-display text-2xl font-bold">Daffodils World School</div>
              <div className="text-xs uppercase tracking-widest text-gold">Excellence · Integrity · Innovation</div>
            </div>
          </div>
          <p className="text-sm opacity-80 max-w-md leading-relaxed">
            A premier CBSE institution in Sikar, Rajasthan. Since 2008 we have nurtured over five thousand learners
            into responsible global citizens through holistic, future-ready education.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="size-10 grid place-items-center rounded-full glass-dark hover:bg-gold hover:text-primary transition">
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Explore</h4>
          <ul className="space-y-2 text-sm opacity-90">
            {NAV.slice(0, 6).map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-gold transition">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg mb-4 text-gold">Reach Us</h4>
          <ul className="space-y-3 text-sm opacity-90">
            <li className="flex gap-2"><MapPin className="size-4 mt-0.5 text-gold shrink-0" /> {SCHOOL.address}</li>
            <li className="flex gap-2"><Phone className="size-4 mt-0.5 text-gold shrink-0" /> <a href={`tel:${SCHOOL.phone}`}>{SCHOOL.phone}</a></li>
            <li className="flex gap-2"><Mail className="size-4 mt-0.5 text-gold shrink-0" /> <a href={`mailto:${SCHOOL.email}`}>{SCHOOL.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between text-xs opacity-70 gap-2">
          <div>© {new Date().getFullYear()} Daffodils World School, Sikar. All rights reserved.</div>
          <div>CBSE Affiliation {SCHOOL.affiliation} · UDISE {SCHOOL.udise}</div>
        </div>
      </div>
    </footer>
  );
}
