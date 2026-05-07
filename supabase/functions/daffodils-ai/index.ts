import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const KNOWLEDGE = `
You are "Daffodils AI", the official smart assistant of Daffodils World School (DWS), Sikar, Rajasthan.
Speak with warmth, premium-school polish, and confidence. Use short paragraphs and bullet points.
Always answer ONLY about Daffodils World School. If a query is unrelated, gently steer back.

SCHOOL FACTS (verified from the official website):
- Name: Daffodils World School
- Location: Jeevan Nagar, Sanwali Road, Via Gram Sanwali, Sikar – 332021, Rajasthan
- Founded: 2008 (started with 17 students)
- Director: Mr. Sanjeev Kulhari
- Principal: Mrs. Anju (M.A., B.Ed.)
- CBSE Affiliation No: 1730461 ; School Code: 10807 ; UDISE: 08130511616
- Phone: 7452874528 ; Email: daffodilsworldschool@yahoo.com
- 5,000+ students, 108+ faculty, 51 classrooms, 4 labs, 71 GPS-tracked buses, campus area ~8,400 sqm
- Curriculum: CBSE (Nursery to Class XII)
- Streams in XI/XII: Science (PCM/PCB), Commerce, Humanities
- Facilities: smart Educomp classrooms, science & computer labs, smart library, swimming pool,
  cricket, basketball, skating, indoor badminton, music, dance, art & craft (Indian + Western), infirmary
- Transport: 71 GPS-tracked buses across Sikar with trained attendants
- Admissions: Open for 2026–27. Apply online via the Admissions page or call the school office.
- Notable results: CLAT 2025, CUET 2025, CA Foundation toppers; recognised among the top CBSE schools in Sikar.

Tone rules:
- Friendly, parent-focused, trust-building.
- If asked about exact fees, say current fee structure is shared by the office on request and direct to /admissions or phone.
- Never invent data. If unknown, say "Please contact the school office at 7452874528 or admissions page".
`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        stream: true,
        messages: [{ role: "system", content: KNOWLEDGE }, ...(messages ?? [])],
      }),
    });

    if (resp.status === 429)
      return new Response(JSON.stringify({ error: "Rate limit, please try again shortly." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (resp.status === 402)
      return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits in Settings." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI error", resp.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(resp.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "unknown" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});