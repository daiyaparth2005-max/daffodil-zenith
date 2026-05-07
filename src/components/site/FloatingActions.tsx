import { MessageCircle, Phone, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SCHOOL } from "@/lib/school";

export function FloatingActions() {
  const wa = `https://wa.me/91${SCHOOL.phone}?text=${encodeURIComponent("Hello, I'd like to know more about admissions at Daffodils World School.")}`;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <Link to="/ai" aria-label="Daffodils AI"
         className="group relative size-16 grid place-items-center rounded-full gradient-leaf text-primary-foreground shadow-elegant hover:scale-110 transition">
        <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
        <Sparkles className="relative size-6 text-gold" />
        <span className="absolute -left-2 -translate-x-full top-1/2 -translate-y-1/2 whitespace-nowrap text-xs font-semibold px-3 py-1.5 rounded-full bg-card border border-border shadow opacity-0 group-hover:opacity-100 transition">Ask Daffodils AI</span>
      </Link>
      <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"
         className="size-14 grid place-items-center rounded-full bg-[#25D366] text-white shadow-elegant hover:scale-110 transition animate-float">
        <MessageCircle className="size-6" />
      </a>
      <a href={`tel:${SCHOOL.phone}`} aria-label="Call"
         className="size-14 grid place-items-center rounded-full gradient-gold text-gold-foreground shadow-gold hover:scale-110 transition">
        <Phone className="size-6" />
      </a>
    </div>
  );
}
