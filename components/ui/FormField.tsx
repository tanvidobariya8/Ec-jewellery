import { cn } from "@/lib/utils";

const controlClasses =
  "w-full border border-border bg-white/60 px-4 py-3 text-sm text-foreground placeholder:text-muted/60 focus:border-primary focus:outline-none aria-invalid:border-danger";

type FieldWrapperProps = {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
};

/** Label + control + error message, wired up for accessibility. */
export function FormField({ id, label, error, optional, children }: FieldWrapperProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-xs tracking-label text-foreground uppercase">
        {label}
        {optional && <span className="ml-1 text-muted normal-case">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(controlClasses, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(controlClasses, "min-h-36 resize-y", className)} {...props} />;
}
