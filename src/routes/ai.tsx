import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles, Bot, User, Leaf } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { SiteLayout, PageHero } from "@/components/site/Layout";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "Daffodils AI – Your Smart School Guide | Daffodils World School" },
      { name: "description", content: "Meet Daffodils AI — the official intelligent assistant of Daffodils World School. Ask anything about admissions, fees, facilities, transport and more." },
    ],
  }),
  component: AIPage,
});

const SUGGESTIONS = [
  "How do I apply for admission?",
  "What sports facilities are available?",
  "Tell me about transport routes.",
  "What streams are offered in Class XI?",
  "Share the fee structure overview.",
  "Who is the Director of the school?",
];

type Msg = { role: "user" | "assistant"; content: string };

function AIPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "🌿 Namaste! I'm **Daffodils AI**, your smart guide to Daffodils World School, Sikar. Ask me anything — admissions, facilities, transport, results or campus life." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    if (!text.trim() || busy) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setBusy(true);

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/daffodils-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: next }),
      });
      if (!resp.ok || !resp.body) {
        const j = await resp.json().catch(() => ({}));
        setMessages((m) => [...m, { role: "assistant", content: j.error || "Sorry, I'm unable to respond right now. Please contact 7452874528." }]);
        setBusy(false);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let acc = "";
      setMessages((m) => [...m, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        let idx;
        while ((idx = buf.indexOf("\n")) !== -1) {
          let line = buf.slice(0, idx);
          buf = buf.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") continue;
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) {
              acc += c;
              setMessages((m) => m.map((x, i) => (i === m.length - 1 ? { ...x, content: acc } : x)));
              scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
            }
          } catch {
            buf = line + "\n" + buf;
            break;
          }
        }
      }
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: "Connection issue. Please try again." }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <PageHero eyebrow="Signature Innovation" title="Daffodils AI — Your Smart School Guide" subtitle="Trained exclusively on Daffodils World School. Ask anything in natural language and receive instant, accurate, parent-friendly answers." />

      <section className="container mx-auto px-6 py-16 grid lg:grid-cols-[320px_1fr] gap-8">
        <aside className="space-y-4">
          <div className="p-6 rounded-2xl gradient-leaf text-primary-foreground shadow-elegant">
            <div className="flex items-center gap-2 mb-2 text-gold"><Sparkles className="size-4" /><span className="text-xs uppercase tracking-widest font-bold">Try asking</span></div>
            <div className="space-y-2 mt-3">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => send(s)} className="w-full text-left text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition">{s}</button>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-border bg-card text-sm text-muted-foreground">
            <Leaf className="size-5 text-primary mb-2" />
            Daffodils AI knows our admissions, faculty, facilities, transport, results and more. For confidential queries, please call <span className="text-primary font-semibold">7452874528</span>.
          </div>
        </aside>

        <div className="rounded-3xl border border-border bg-card shadow-elegant overflow-hidden flex flex-col h-[640px]">
          <div className="px-6 py-4 gradient-royal text-primary-foreground flex items-center gap-3">
            <div className="relative size-10 grid place-items-center rounded-full gradient-gold">
              <Bot className="size-5 text-gold-foreground" />
              <span className="absolute inset-0 rounded-full animate-ping bg-gold/40" />
            </div>
            <div>
              <div className="font-display text-lg">Daffodils AI</div>
              <div className="text-[11px] uppercase tracking-widest text-gold">Online · Smart School Guide</div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-background to-secondary/30">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && <div className="size-8 rounded-full gradient-leaf grid place-items-center shrink-0"><Bot className="size-4 text-primary-foreground" /></div>}
                <div className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "gradient-gold text-gold-foreground rounded-br-sm" : "bg-card border border-border rounded-bl-sm"}`}>
                  <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1">
                    <ReactMarkdown>{m.content || "…"}</ReactMarkdown>
                  </div>
                </div>
                {m.role === "user" && <div className="size-8 rounded-full bg-primary grid place-items-center shrink-0"><User className="size-4 text-primary-foreground" /></div>}
              </motion.div>
            ))}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-4 border-t border-border bg-background flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Daffodils AI anything…" className="flex-1 px-4 py-3 rounded-full bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            <button disabled={busy} className="px-5 rounded-full gradient-gold text-gold-foreground font-semibold shadow-gold disabled:opacity-50 inline-flex items-center gap-2"><Send className="size-4" /> Send</button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}