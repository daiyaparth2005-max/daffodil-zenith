import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/site/Layout";
import { SCHOOL } from "@/lib/school";
import { FileText } from "lucide-react";

const general = [
  ["Name of the School", SCHOOL.name + ", Jeevan Nagar, Sikar (Raj.)"],
  ["Affiliation No.", SCHOOL.affiliation],
  ["School Code", SCHOOL.schoolCode],
  ["UDISE Code", SCHOOL.udise],
  ["Complete Address", SCHOOL.address],
  ["Principal", `${SCHOOL.principal}`],
  ["Email", SCHOOL.email],
  ["Contact", SCHOOL.phone],
];
const staff = [
  ["Total Teachers", "108"], ["PGT", "14"], ["TGT", "28"], ["PRT", "37"],
  ["Teacher–Section Ratio", "1.5"], ["Special Educators", "2"], ["Counsellors / Wellness", "2"],
];
const infra = [
  ["Total Campus Area", "8,400 sq m"],
  ["No. of Classrooms (size)", "51 (40 sq m each)"],
  ["No. of Laboratories", "4 (80 sq m each)"],
];
const docs = [
  "Affiliation / Upgradation Letter",
  "Society / Trust Registration Certificate",
  "No-Objection Certificate (NOC)",
  "Recognition Certificate (RTE Act, 2009)",
  "Building Safety Certificate",
  "Fire Safety Certificate",
  "DEO Self-Certification",
  "Water, Health & Sanitation Certificate",
  "Fee Structure",
  "Annual Academic Calendar",
  "School Management Committee (SMC)",
  "Parents Teachers Association (PTA) Members",
  "Last Three Years' Board Results",
];

export const Route = createFileRoute("/disclosure")({
  head: () => ({
    meta: [
      { title: "CBSE Mandatory Disclosure | Daffodils World School" },
      { name: "description", content: "CBSE mandatory disclosure for Daffodils World School Sikar — affiliation, infrastructure, staff, results and statutory documents." },
    ],
  }),
  component: () => (
    <SiteLayout>
      <PageHero eyebrow="Compliance" title="CBSE Mandatory Disclosure" subtitle="Transparency is at the heart of everything we do." />
      <section className="container mx-auto px-6 py-16 space-y-12">
        <Block title="General Information" rows={general} />
        <Block title="Staff (Teaching)" rows={staff} />
        <Block title="School Infrastructure" rows={infra} />
        <div>
          <h3 className="font-display text-2xl text-gradient-royal mb-5">Documents & Information</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {docs.map((d) => (
              <div key={d} className="flex items-center justify-between gap-3 p-4 rounded-xl border border-border bg-card hover:border-gold transition">
                <div className="flex items-center gap-3"><FileText className="size-4 text-gold" /><span className="text-sm">{d}</span></div>
                <a href="#" className="text-xs font-semibold text-primary hover:text-gold">View →</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  ),
});

function Block({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div>
      <h3 className="font-display text-2xl text-gradient-royal mb-5">{title}</h3>
      <div className="rounded-2xl overflow-hidden border border-border">
        <table className="w-full text-sm">
          <tbody>
            {rows.map(([k, v], i) => (
              <tr key={k} className={i % 2 ? "bg-secondary/40" : "bg-card"}>
                <td className="px-5 py-3.5 font-medium w-1/3">{k}</td>
                <td className="px-5 py-3.5 text-muted-foreground">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
