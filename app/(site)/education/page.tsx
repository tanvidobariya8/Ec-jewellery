import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/PageHeader";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { METALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Diamond & Jewellery Guide",
  description:
    "Learn the 4Cs, compare lab-grown diamonds and moissanite, and choose the right gold or platinum.",
};

const FOUR_CS = [
  {
    title: "Cut",
    body: "How well the stone is faceted. Cut drives sparkle more than any other factor.",
  },
  {
    title: "Colour",
    body: "Graded D (colourless) to Z. D–F stones look icy white in any setting.",
  },
  {
    title: "Clarity",
    body: "How free the stone is from inclusions. VVS–VS stones look clean to the eye.",
  },
  {
    title: "Carat",
    body: "The weight of the stone. Lab-grown lets you choose a larger carat for your budget.",
  },
];

const STONE_COMPARISON = [
  { label: "Material", diamond: "Carbon (real diamond)", moissanite: "Silicon carbide" },
  { label: "Hardness (Mohs)", diamond: "10", moissanite: "9.25" },
  {
    label: "Sparkle",
    diamond: "Balanced white brilliance & fire",
    moissanite: "Stronger rainbow fire",
  },
  { label: "Our grade", diamond: "Type IIa", moissanite: "VVS, DEF colour" },
  { label: "Certificate", diamond: "IGI / SGL", moissanite: "Certificate of authenticity" },
  { label: "Price", diamond: "Lower than mined diamond", moissanite: "Lowest" },
];

const uniqueMetals = Array.from(new Map(METALS.map((m) => [m.purity, m])).values());

export default function EducationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Education"
        title="Diamond & Jewellery Guide"
        description="Everything you need to choose your stone and metal with confidence."
      />

      <section className="py-16">
        <Container>
          <SectionHeading title="The 4Cs" />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FOUR_CS.map((item) => (
              <li key={item.title} className="border border-border p-6">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-surface/40 py-16">
        <Container className="max-w-4xl">
          <SectionHeading title="Lab-grown diamond vs moissanite" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs tracking-label text-gold-dark uppercase">
                  <th scope="col" className="py-3 pr-4 font-normal" />
                  <th scope="col" className="py-3 pr-4 font-normal">
                    Lab-grown diamond
                  </th>
                  <th scope="col" className="py-3 font-normal">
                    Moissanite
                  </th>
                </tr>
              </thead>
              <tbody>
                {STONE_COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-border">
                    <th scope="row" className="py-3 pr-4 font-medium">
                      {row.label}
                    </th>
                    <td className="py-3 pr-4 text-muted">{row.diamond}</td>
                    <td className="py-3 text-muted">{row.moissanite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="max-w-4xl">
          <SectionHeading
            title="Choosing your metal"
            description="All pieces are available in solid 10K, 14K and 18K gold (yellow, white or rose) and 950 platinum."
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {uniqueMetals.map((metal) => (
              <li key={metal.purity} className="text-center">
                <p className="font-serif text-3xl text-primary">{metal.purity}</p>
                <p className="mt-2 text-xs tracking-label text-muted uppercase">
                  {metal.code === "PT950" ? "950 Platinum" : `${metal.code.split("_")[0]} Gold`}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link href="/ring-size">Find your ring size</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/blog">Read the journal</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
