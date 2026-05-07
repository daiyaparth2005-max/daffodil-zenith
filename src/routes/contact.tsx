import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { SCHOOL } from "@/lib/school";
import { Mail, Phone, MapPin, Clock, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(5).max(1000),
});

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Daffodils World School Sikar" },
      { name: "description", content: "Get in touch with Daffodils World School, Jeevan Nagar, Sikar. Phone, email and admissions enquiries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setErr(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const p = schema.safeParse(data);
    if (!p.success) { setErr(p.error.issues[0]?.message || "Invalid input"); return; }
    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert(p.data);
    setLoading(false);
    if (error) { setErr(error.message); return; }
    setDone(true);
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Get in Touch" title="We'd love to hear from you" subtitle="Reach out for admissions, partnerships, or to plan a campus visit." />
      <section className="container mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10">
        <div className="space-y-5">
          {[
            { i: MapPin, t: "Address", d: SCHOOL.address },
            { i: Phone, t: "Phone", d: SCHOOL.phone, href: `tel:${SCHOOL.phone}` },
            { i: Mail, t: "Email", d: SCHOOL.email, href: `mailto:${SCHOOL.email}` },
            { i: Clock, t: "School Hours", d: "Mon–Sat · 7:30 AM – 2:30 PM (Office till 4:00 PM)" },
          ].map(({ i: Icon, t, d, href }) => (
            <div key={t} className="flex gap-4 p-5 rounded-2xl bg-card border border-border">
              <div className="size-12 shrink-0 rounded-xl gradient-royal grid place-items-center"><Icon className="size-5 text-gold" /></div>
              <div><div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{t}</div>
                {href ? <a href={href} className="font-medium hover:text-primary">{d}</a> : <div className="font-medium">{d}</div>}
              </div>
            </div>
          ))}
          <div className="rounded-2xl overflow-hidden border border-border aspect-[16/10]">
            <iframe title="map" className="size-full" src="https://www.google.com/maps?q=Daffodils+World+School+Sikar&output=embed" loading="lazy" />
          </div>
        </div>
        <div className="p-8 md:p-10 rounded-3xl bg-card border border-border shadow-elegant">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle2 className="size-14 text-gold mx-auto mb-4" />
              <h3 className="font-display text-2xl mb-2">Message sent</h3>
              <p className="text-muted-foreground">We'll get back to you very soon.</p>
            </div>
          ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <h3 className="font-display text-2xl text-gradient-royal mb-2">Send us a message</h3>
            <Input name="name" label="Your Name" required />
            <Input name="email" label="Email" type="email" required />
            <Input name="phone" label="Phone" />
            <Input name="subject" label="Subject" />
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Message *</label>
              <textarea name="message" rows={5} required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
            {err && <div className="text-sm text-destructive">{err}</div>}
            <button disabled={loading} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full gradient-gold text-gold-foreground font-semibold shadow-gold hover:scale-[1.02] transition disabled:opacity-60">
              {loading && <Loader2 className="size-4 animate-spin" />} Send Message
            </button>
          </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Input({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus:ring-2 focus:ring-gold focus:outline-none" />
    </div>
  );
}
