import React, { useState } from "react";
import { X } from "lucide-react";
import { api } from "../../lib/api";

const field =
  "h-11 w-full rounded-md border border-[#D9DFE9] bg-white px-3 text-sm text-[#343A46] outline-none focus:border-[#2563EB]";

// Creates a platform-wide badge or reward: POST /rewards (created by an admin, so every tutor can award it)
export default function CreateAwardModal({ onClose, onCreated }) {
  const [form, setForm] = useState({ title: "", description: "", kind: "BADGE", points: 0 });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => { setForm((f) => ({ ...f, [k]: e.target.value })); setError(""); };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/rewards", {
        title: form.title.trim(),
        ...(form.description.trim() ? { description: form.description.trim() } : {}),
        kind: form.kind,
        points: Number(form.points) || 0,
      });
      onCreated();
    } catch (err) {
      setError(err.message || "Could not create the award.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Create award"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#171717]">Create Award</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-gray-400 hover:bg-gray-100"><X size={18} /></button>
        </div>
        <label className="block text-xs font-semibold text-[#4B5563]">
          Title
          <input value={form.title} onChange={set("title")} minLength={2} maxLength={120} required className={`${field} mt-1`} />
        </label>
        <label className="block text-xs font-semibold text-[#4B5563]">
          Description (optional)
          <textarea value={form.description} onChange={set("description")} maxLength={1000} rows={3} className={`${field} mt-1 h-auto py-2`} />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block text-xs font-semibold text-[#4B5563]">
            Type
            <select value={form.kind} onChange={set("kind")} className={`${field} mt-1`}>
              <option value="BADGE">Badge</option>
              <option value="REWARD">Reward</option>
            </select>
          </label>
          <label className="block text-xs font-semibold text-[#4B5563]">
            Points
            <input type="number" min={0} max={10000} value={form.points} onChange={set("points")} className={`${field} mt-1`} />
          </label>
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={saving} className="h-11 w-full rounded-md bg-[#00520D] text-sm font-semibold text-white disabled:opacity-60">
          {saving ? "Creating…" : "Create Award"}
        </button>
      </form>
    </div>
  );
}
