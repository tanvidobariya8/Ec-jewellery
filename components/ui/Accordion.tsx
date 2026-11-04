"use client";

import { ChevronDown } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

export type AccordionEntry = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionEntry[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  return (
    <AccordionPrimitive.Root type="multiple" className={cn("border-t border-border", className)}>
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.id} value={item.id} className="border-b border-border">
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left font-serif text-xl text-primary">
              {item.title}
              <ChevronDown
                aria-hidden="true"
                className="size-4 shrink-0 text-gold transition-transform duration-300 group-data-[state=open]:rotate-180"
              />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="pb-5 text-sm leading-relaxed text-muted">
            {item.content}
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
