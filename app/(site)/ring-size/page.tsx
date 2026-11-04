import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/content/PageHeader";
import { PrintButton } from "@/components/content/PrintButton";
import { Container } from "@/components/ui/Container";
import { getRingSizeChart } from "@/lib/ring-size";

export const metadata: Metadata = {
  title: "Ring Size Guide",
  description:
    "Printable ring size chart from US 3 to 14 with diameter and circumference in millimetres.",
};

const chart = getRingSizeChart();

export default function RingSizePage() {
  return (
    <>
      <PageHeader
        eyebrow="Sizing"
        title="Ring Size Guide"
        description="Measure the inside diameter of a ring that fits, or the circumference of your finger, and find your size below. Quarter sizes are available on every ring."
      />
      <Container className="max-w-3xl py-16">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            Not sure how to measure?{" "}
            <Link
              href="/blog/measure-ring-size-at-home"
              className="text-primary underline underline-offset-4"
            >
              Read our step-by-step guide
            </Link>
            .
          </p>
          <PrintButton />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-center text-sm">
            <caption className="sr-only">Ring size conversion chart</caption>
            <thead>
              <tr className="border-b border-border text-xs tracking-label text-gold uppercase">
                <th scope="col" className="py-3 font-normal">
                  US size
                </th>
                <th scope="col" className="py-3 font-normal">
                  Diameter (mm)
                </th>
                <th scope="col" className="py-3 font-normal">
                  Circumference (mm)
                </th>
                <th scope="col" className="py-3 font-normal">
                  EU (approx.)
                </th>
              </tr>
            </thead>
            <tbody>
              {chart.map((row) => (
                <tr key={row.us} className="border-b border-border even:bg-surface/30">
                  <th scope="row" className="py-2.5 font-medium">
                    {row.us}
                  </th>
                  <td className="py-2.5 text-muted">{row.diameterMm}</td>
                  <td className="py-2.5 text-muted">{row.circumferenceMm}</td>
                  <td className="py-2.5 text-muted">{row.eu}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
