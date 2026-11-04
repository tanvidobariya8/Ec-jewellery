"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button type="button" variant="outline" className="no-print" onClick={() => window.print()}>
      <Printer aria-hidden="true" className="size-4" />
      Print chart
    </Button>
  );
}
