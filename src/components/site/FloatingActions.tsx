import { MessageCircle, Phone } from "lucide-react";
import { SCHOOL } from "@/lib/school";

export function FloatingActions() {
  const wa = `https://wa.me/91${SCHOOL.phone}?text=${encodeURIComponent("Hello, I'd like to know more about admissions at Daffodils World School.")}`;
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
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
