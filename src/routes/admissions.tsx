import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  student_name: z.string().trim().min(2).max(100),
  parent_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(7).max(20),
  dob: z.string().optional(),
  class_for: z.string().min(1),
  address: z.string().max(500).optional(),
  message: z.string().max(1000).optional(),
});

const classes = ["Nursery","LKG","UKG","1st","2nd","3rd","4th","5th","6th","7th","8th","9th","10th","11th (Science)","11th (Commerce)","11th (Arts)","12th (Science)","12th (Commerce)","12th (Arts)"];

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Online Admission | Daffodils World School Sikar" },
      { name: "description", content: "Apply online to Daffodils World School Sikar. Admissions open for Nursery to Class XII for the 2026–27 academic session." },
    ],
  }),
  component: AdmissionsPage,
});

function AdmissionsPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message || "Please check the form"); return; }
    setLoading(true);
    const { error } = await supabase.from("admissions").insert(parsed.data);
    setLoading(false);
    if (error) { setError(error.message); return; }
    setDone(true);
  }

  return (
    <SiteLayout>
      <PageHero eyebrow="Admissions 2026–27" title="Begin the journey." subtitle="Limited seats from Nursery to Class XII. Submit your enquiry and our admissions team will reach out within 24 hours." />
      <section className="container mx-auto px-6 py-20 grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-display text-3xl text-gradient-royal">A simple, transparent process</h2>
          {[
            { n: "01", t: "Online Enquiry", d: "Submit the form alongside." },
            { n: "02", t: "Campus Tour", d: "Visit our campus or take the virtual tour." },
            { n: "03", t: "Interaction", d: "Friendly, age-appropriate interaction with the child and parents." },
            { n: "04", t: "Confirmation", d: "Receive your offer letter and complete the joining formalities." },
          ].map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="size-12 shrink-0 rounded-xl gradient-gold text-gold-foreground grid place-items-center font-display font-bold">{s.n}</div>
              <div><div className="font-semibold">{s.t}</div><div className="text-sm text-muted-foreground">{s.d}</div></div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 p-8 md:p-10 rounded-3xl bg-card border border-border shadow-elegant">
          {done ? (
            <div className="text-center py-10">
              <CheckCircle2 className="size-14 text-gold mx-auto mb-4" />
              <h3 className="font-display text-2xl mb-2">Thank you!</h3>
              <p className="text-muted-foreground">Your enquiry has been received. Our admissions team will contact you shortly.</p>
            </div>
          ) : (
          <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-4">
            <Field name="student_name" label="Student's Name" required />
            <Field name="parent_name" label="Parent's Name" required />
            <Field name="email" label="Email" type="email" required />
            <Field name="phone" label="Contact Number" required />
            <Field name="dob" label="Date of Birth" type="date" />
            <div>
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Class for Admission *</label>
              <select name="class_for" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus:ring-2 focus:ring-gold focus:outline-none">
                <option value="">— Select —</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2"><Field name="address" label="Residential Address" /></div>
            <div className="sm:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Message</label>
              <textarea name="message" rows={3} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus:ring-2 focus:ring-gold focus:outline-none" />
            </div>
            {error && <div className="sm:col-span-2 text-sm text-destructive">{error}</div>}
            <button disabled={loading} className="sm:col-span-2 mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full gradient-royal text-primary-foreground font-semibold shadow-royal hover:scale-[1.02] transition disabled:opacity-60">
              {loading && <Loader2 className="size-4 animate-spin" />}
              Submit Enquiry
            </button>
          </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}{required && " *"}</label>
      <input name={name} type={type} required={required} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus:ring-2 focus:ring-gold focus:outline-none" />
    </div>
  );
}
