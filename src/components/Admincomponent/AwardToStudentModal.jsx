import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { api } from "../../lib/api";

const field =
  "h-11 w-full rounded-md border border-[#D9DFE9] bg-white px-3 text-sm text-[#343A46] outline-none focus:border-[#2563EB]";

// Gives a student a badge or reward: GET /rewards (catalogue), POST /rewards/:id/award { studentId, note }
export default function AwardToStudentModal({ kind, studentId, earnedIds, onClose, onAwarded }) {
  const [options, setOptions] = useState([]);
  const [awardId, setAwardId] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const label = kind === "REWARD" ? "reward" : "badge";

  useEffect(() => {
    api
      .get("/rewards")
      .then((all) => setOptions(all.filter((a) => a.kind === kind && !earnedIds.includes(a.id))))
      .catch((err) => setError(err.message || "Could not load the list."));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post(`/rewards/${awardId}/award`, { studentId, ...(note.trim() ? { note: note.trim() } : {}) });
      onAwarded();
    } catch (err) {
      setError(err.message || `Could not award this ${label}.`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Award ${label}`}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <form onSubmit={submit} className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold capitalize text-[#171717]">Award {label}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-gray-400 hover:bg-gray-100"><X size={18} /></button>
        </div>
        <label className="block text-xs font-semibold text-[#4B5563]">
          Choose a {label}
          <select value={awardId} onChange={(e) => { setAwardId(e.target.value); setError(""); }} className={`${field} mt-1`} required>
            <option value="">{options.length ? `Select a ${label}` : `No ${label}s left to award`}</option>
            {options.map((o) => (
              <option key={o.id} value={o.id}>{o.title}{o.points ? ` (${o.points} pts)` : ""}</option>
            ))}
          </select>
        </label>
        <label className="block text-xs font-semibold text-[#4B5563]">
          Note (optional)
          <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} rows={3} className={`${field} mt-1 h-auto py-2`} />
        </label>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <button type="submit" disabled={saving || !awardId} className="h-11 w-full rounded-md bg-[#2563EB] text-sm font-semibold text-white disabled:opacity-60">
          {saving ? "Awarding…" : `Award ${label}`}
        </button>
        <p className="text-[11px] text-[#8993A2]">The student is notified. To add a new {label} to this list, use Create Award.</p>
      </form>
    </div>
  );
}
