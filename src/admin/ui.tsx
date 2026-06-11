import { useState } from "react";

/* ------------------------------ form primitives ------------------------------ */

export const inputClass =
  "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-teal-400/60 focus:bg-white/[0.06]";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-baseline justify-between text-xs font-semibold tracking-wide text-slate-400 uppercase">
        {label}
        {hint && <span className="font-normal normal-case text-slate-600">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

export function Btn({
  children,
  variant = "primary",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
}) {
  const styles = {
    primary:
      "bg-gradient-to-r from-teal-400 to-cyan-500 text-[#070b16] font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02]",
    ghost:
      "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-teal-400/40 hover:text-teal-300",
    danger: "border border-red-400/30 bg-red-400/10 text-red-300 hover:bg-red-400/20",
  }[variant];
  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 text-sm transition-all disabled:opacity-50 cursor-pointer ${styles} ${props.className || ""}`}
    >
      {children}
    </button>
  );
}

export function SavedToast({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed right-6 bottom-6 z-50 rounded-xl border border-emerald-400/30 bg-[#0a1424] px-5 py-3 text-sm font-medium text-emerald-300 shadow-2xl">
      ✓ Changes saved
    </div>
  );
}

/* ------------------------- generic collection manager ------------------------- */

export type FieldDef<T> = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number";
  hint?: string;
  span?: 1 | 2;
  format: (item: T) => string;
  apply: (item: T, value: string) => T;
};

/** simple helpers to build field defs */
export function textField<T extends Record<string, unknown>>(
  key: keyof T & string,
  label: string,
  opts: Partial<FieldDef<T>> = {}
): FieldDef<T> {
  return {
    key,
    label,
    type: "text",
    format: (item) => String(item[key] ?? ""),
    apply: (item, value) => ({ ...item, [key]: value }),
    ...opts,
  };
}

export function numberField<T extends Record<string, unknown>>(
  key: keyof T & string,
  label: string,
  opts: Partial<FieldDef<T>> = {}
): FieldDef<T> {
  return {
    key,
    label,
    type: "number",
    format: (item) => String(item[key] ?? 0),
    apply: (item, value) => ({ ...item, [key]: Number(value) || 0 }),
    ...opts,
  };
}

export function listField<T extends Record<string, unknown>>(
  key: keyof T & string,
  label: string,
  separator: "comma" | "lines",
  opts: Partial<FieldDef<T>> = {}
): FieldDef<T> {
  return {
    key,
    label,
    type: separator === "lines" ? "textarea" : "text",
    hint: separator === "lines" ? "one per line" : "comma separated",
    format: (item) => ((item[key] as string[]) || []).join(separator === "lines" ? "\n" : ", "),
    apply: (item, value) => ({
      ...item,
      [key]: value
        .split(separator === "lines" ? "\n" : ",")
        .map((s) => s.trim())
        .filter(Boolean),
    }),
    ...opts,
  };
}

type CollectionManagerProps<T> = {
  title: string;
  description: string;
  items: T[];
  fields: FieldDef<T>[];
  itemTitle: (item: T) => string;
  itemSubtitle?: (item: T) => string;
  blank: () => T;
  onSave: (items: T[]) => void;
};

export function CollectionManager<T>({
  title,
  description,
  items,
  fields,
  itemTitle,
  itemSubtitle,
  blank,
  onSave,
}: CollectionManagerProps<T>) {
  const [editing, setEditing] = useState<number | null>(null); // index, -1 = new
  const [draft, setDraft] = useState<T | null>(null);

  const startEdit = (index: number) => {
    setEditing(index);
    setDraft(index === -1 ? blank() : items[index]);
  };

  const commit = () => {
    if (draft == null || editing == null) return;
    const next = editing === -1 ? [...items, draft] : items.map((it, i) => (i === editing ? draft : it));
    onSave(next);
    setEditing(null);
    setDraft(null);
  };

  const remove = (index: number) => {
    if (!confirm("Delete this item?")) return;
    onSave(items.filter((_, i) => i !== index));
  };

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onSave(next);
  };

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
        <Btn onClick={() => startEdit(-1)}>+ Add New</Btn>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-teal-400/30"
          >
            <div className="flex flex-col gap-1">
              <button
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="text-slate-600 hover:text-teal-300 disabled:opacity-30"
                aria-label="Move up"
              >
                ▲
              </button>
              <button
                onClick={() => move(i, 1)}
                disabled={i === items.length - 1}
                className="text-slate-600 hover:text-teal-300 disabled:opacity-30"
                aria-label="Move down"
              >
                ▼
              </button>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-white">{itemTitle(item)}</p>
              {itemSubtitle && <p className="truncate text-sm text-slate-500">{itemSubtitle(item)}</p>}
            </div>
            <Btn variant="ghost" onClick={() => startEdit(i)}>
              Edit
            </Btn>
            <Btn variant="danger" onClick={() => remove(i)}>
              Delete
            </Btn>
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-xl border border-dashed border-white/10 py-10 text-center text-sm text-slate-500">
            No items yet. Click "Add New" to create one.
          </p>
        )}
      </div>

      {/* edit modal */}
      {editing !== null && draft != null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:p-8">
          <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0c1322] p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">
                {editing === -1 ? `Add ${title.replace(/s$/, "")}` : `Edit ${title.replace(/s$/, "")}`}
              </h3>
              <button
                onClick={() => setEditing(null)}
                className="text-2xl leading-none text-slate-500 hover:text-white"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <div key={f.key} className={f.span === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <Field label={f.label} hint={f.hint}>
                    {f.type === "textarea" ? (
                      <textarea
                        rows={4}
                        className={`${inputClass} resize-y`}
                        value={f.format(draft)}
                        onChange={(e) => setDraft(f.apply(draft, e.target.value))}
                      />
                    ) : (
                      <input
                        type={f.type === "number" ? "number" : "text"}
                        className={inputClass}
                        value={f.format(draft)}
                        onChange={(e) => setDraft(f.apply(draft, e.target.value))}
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>
            <div className="mt-7 flex justify-end gap-3">
              <Btn variant="ghost" onClick={() => setEditing(null)}>
                Cancel
              </Btn>
              <Btn onClick={commit}>{editing === -1 ? "Add Item" : "Save Changes"}</Btn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
