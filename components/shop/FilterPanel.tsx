"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { Dialog } from "radix-ui";

import { cn } from "@/lib/utils";

type FilterPanelProps = {
  activeCount: number;
  children: React.ReactNode;
};

/** Mobile/tablet only: "Filters" button that opens the sidebar content in a left panel. */
export function FilterPanel({ activeCount, children }: FilterPanelProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn(
          "inline-flex h-10 items-center gap-2 border border-border bg-background px-4 text-xs tracking-label uppercase transition-colors duration-300 hover:border-primary lg:hidden",
          activeCount > 0 && "border-primary text-primary",
        )}
      >
        <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={1.5} />
        Filters
        {activeCount > 0 && (
          <span className="inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] text-background">
            {activeCount}
          </span>
        )}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/30" />
        <Dialog.Content className="fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-sm flex-col bg-background">
          <div className="flex items-center justify-between border-b border-border px-6 py-3">
            <Dialog.Title className="text-xs tracking-label text-gold-dark uppercase">
              Filters
            </Dialog.Title>
            <Dialog.Close
              aria-label="Close filters"
              className="inline-flex size-10 items-center justify-center"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.5} />
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Narrow down the designs. Changes apply immediately.
          </Dialog.Description>

          <div className="flex-1 overflow-y-auto px-6 pt-5">{children}</div>

          <div className="border-t border-border px-6 py-4">
            <Dialog.Close className="h-11 w-full bg-primary text-xs tracking-label text-background uppercase transition-colors duration-300 hover:bg-primary/90">
              View results
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
