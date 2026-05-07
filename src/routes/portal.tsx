import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";
import { Loader2, BookOpen, Calendar, ClipboardCheck, CreditCard, Bus, Bell, GraduationCap, Trophy } from "lucide-react";

export const Route = createFileRoute("/portal")({
  head: () => ({
    meta: [
      { title: "Parent & Student Portal | Daffodils World School" },
      { name: "description", content: "Sign in to access homework, attendance, fees, results, bus tracking and notices." },
    ],
  }),
  component: PortalPage,
});

function PortalPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => { setUser(s?.user ?? null); setLoading(false); });
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setLoading(false); });
    return () => subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setErr(null); setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/portal" } });
      if (error) setErr(error.message); else setErr("Check your email to confirm your account.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
    }
    setBusy(false);
  }

  if (loading) return <SiteLayout><div className="min-h-[60vh] grid place-items-center"><Loader2 className="size-8 animate-spin text-primary" /></div></SiteLayout>;

  if (!user) {
    return (
      <SiteLayout>
        <PageHero eyebrow="Portal" title="Parent & Student Sign-in" subtitle="Access homework, attendance, fees, bus tracking and live notices." />
        <section className="container mx-auto px-6 py-16 max-w-md">
          <div className="p-8 rounded-3xl bg-card border border-border shadow-elegant">
            <div className="flex gap-2 mb-6 p-1 rounded-full bg-secondary">
              {(["signin","signup"] as const).map((m) => (
                <button key={m} onClick={() => setMode(m)}
                  className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${mode === m ? "bg-card shadow text-primary" : "text-muted-foreground"}`}>
                  {m === "signin" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6} className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 focus:ring-2 focus:ring-gold focus:outline-none" />
              </div>
              {err && <div className="text-sm text-destructive">{err}</div>}
              <button disabled={busy} className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full gradient-royal text-primary-foreground font-semibold shadow-royal hover:scale-[1.02] transition disabled:opacity-60">
                {busy && <Loader2 className="size-4 animate-spin" />} {mode === "signin" ? "Sign In" : "Create Account"}
              </button>
            </form>
          </div>
        </section>
      </SiteLayout>
    );
  }

  return <Dashboard email={user.email!} />;
}

function Dashboard({ email }: { email: string }) {
  const [notices, setNotices] = useState<{ id:string; title:string; body:string; category:string; pinned:boolean }[]>([]);
  useEffect(() => { supabase.from("notices").select("*").order("pinned", { ascending: false }).order("published_at", { ascending: false }).limit(8).then(({ data }) => setNotices(data ?? [])); }, []);
  const tiles = [
    { i: ClipboardCheck, t: "Attendance", v: "96%", d: "This term" },
    { i: BookOpen, t: "Homework", v: "3", d: "Due this week" },
    { i: GraduationCap, t: "Results", v: "A+", d: "Last assessment" },
    { i: CreditCard, t: "Fees", v: "Paid", d: "Q3 · 2026" },
    { i: Bus, t: "Bus Route", v: "Route 12", d: "ETA 7:42 AM" },
    { i: Trophy, t: "Achievements", v: "5", d: "Badges earned" },
    { i: Calendar, t: "Next PTM", v: "14 Dec", d: "Saturday · 9 AM" },
    { i: Bell, t: "Notices", v: notices.length.toString(), d: "Active" },
  ];
  return (
    <SiteLayout>
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <div className="text-gold text-xs uppercase tracking-widest font-semibold">Welcome back</div>
            <h1 className="font-display text-3xl md:text-4xl text-gradient-royal">{email}</h1>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="px-5 py-2.5 rounded-full border border-border hover:border-gold text-sm font-semibold">Sign out</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {tiles.map(({ i: Icon, t, v, d }) => (
            <div key={t} className="p-5 rounded-2xl bg-card border border-border hover:border-gold transition">
              <Icon className="size-5 text-gold mb-3" />
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
              <div className="font-display text-2xl mt-1">{v}</div>
              <div className="text-xs text-muted-foreground">{d}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <h3 className="font-display text-xl mb-4">Notice Board</h3>
            <ul className="space-y-3">
              {notices.map((n) => (
                <li key={n.id} className="p-4 rounded-xl bg-secondary/40">
                  <div className="flex items-center gap-2 mb-1">
                    {n.pinned && <span className="text-[10px] uppercase tracking-widest text-gold font-bold">Pinned</span>}
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{n.category}</span>
                  </div>
                  <div className="font-semibold text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground">{n.body}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl gradient-royal text-primary-foreground">
            <h3 className="font-display text-xl mb-4 text-gold">Quick Links</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Pay Fees","Download Results","Submit Leave","Book PTM","Bus Tracking","Homework"].map((l) => (
                <Link key={l} to="/portal" className="p-4 rounded-xl glass-dark hover:bg-white/15 transition text-sm font-medium">{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
