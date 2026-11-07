"use client";

type CheckboxGroupProps = {
  legend: string;
  hint?: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
};

/** Multi-select as checkboxes (shapes, styles, metals). */
export function CheckboxGroup({ legend, hint, options, value, onChange }: CheckboxGroupProps) {
  const toggle = (id: string) =>
    onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);

  return (
    <fieldset>
      <legend className="text-xs tracking-label text-foreground uppercase">{legend}</legend>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 border border-border px-3 py-2 text-sm has-checked:border-primary has-checked:bg-primary/5"
          >
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={value.includes(option.value)}
              onChange={() => toggle(option.value)}
            />
            {option.label}
          </label>
        ))}
        {!options.length && <p className="text-sm text-muted">None set up yet.</p>}
      </div>
    </fieldset>
  );
}
