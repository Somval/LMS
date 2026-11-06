import React, { useState } from "react";
import { api } from "../../lib/api";
import { Settings, Check, X } from "lucide-react";

const hints = {
  New: "{hints[status]}",
  "In Progress": "This complaint is being looked into.",
  Resolved: "This complaint has been resolved.",
  Closed: "This complaint is closed.",
};

const fmtDateTime = (d) =>
  new Date(d).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

export default function ComplaintStatusAction({ complaint, onChanged = async () => {} }) {
  const status = complaint.status;
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");

  const handleStatusChange = async (newStatus) => {
    if (newStatus === status || busy) return;
    setBusy(true);
    setError("");
    try {
      await api.patch(`/admin/complaints/${complaint.id}/status`, { status: newStatus });
      await onChanged();
    } catch (err) {
      setError(err.message || "Could not update the status.");
    } finally {
      setBusy(false);
    }
  };

  const handleSendNote = async (e) => {
    e.preventDefault();
    if (!note.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      await api.post(`/admin/complaints/${complaint.id}/notes`, { message: note.trim() });
      setNote("");
      await onChanged();
    } catch (err) {
      setError(err.message || "Could not send the note.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full rounded-[11px] mt-12 border border-slate-200/90 bg-white p-6 shadow-sm sm:p-7 font-sans text-slate-800">

      {error && (
        <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
      )}

      {/* Status Section */}
      <div>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-slate-900">
          Status
        </h2>

        <div className="flex items-center gap-3">
          <span className="inline-block rounded-md bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            {status}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-400">
          This complaint is awaiting review.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 space-y-3">

        {/* Mark as In Progress */}
        <button
          type="button"
          onClick={() => handleStatusChange("In Progress")}
          className={`flex w-full items-center justify-center gap-2.5 rounded-lg px-5 py-3.5 text-sm font-medium transition-all ${
            status === "In Progress"
              ? "bg-[#252856] text-white ring-2 ring-[#30336b] ring-offset-2"
              : "bg-[#30336b] text-white hover:bg-[#252856]"
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>Mark as In Progress</span>
        </button>

        {/* Mark as Resolved */}
        <button
          type="button"
          onClick={() => handleStatusChange("Resolved")}
          className={`flex w-full items-center justify-center gap-2.5 rounded-lg border px-5 py-3.5 text-sm font-medium transition-all ${
            status === "Resolved"
              ? "border-slate-400 bg-slate-50 text-slate-900"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <Check className="h-4 w-4 text-slate-500" />
          <span>Mark as Resolved</span>
        </button>

        {/* Close Complaint */}
        <button
          type="button"
          onClick={() => handleStatusChange("Closed")}
          className={`flex w-full items-center justify-center gap-2.5 rounded-lg border px-5 py-3.5 text-sm font-medium transition-all ${
            status === "Closed"
              ? "border-slate-400 bg-slate-50 text-slate-900"
              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
          }`}
        >
          <X className="h-4 w-4 text-slate-500" />
          <span>Close Complaint</span>
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-slate-100" />

      {/* Add Note Section */}
      <div>
        <h3 className="mb-3 text-lg font-bold text-slate-900">
          Add Note
        </h3>

        <textarea
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note about this complaint..."
          className="w-full resize-none rounded-lg border border-slate-200 p-4 text-sm text-slate-800 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send Note Button */}
        <button
          type="button"
          onClick={handleSendNote}
          disabled={!note.trim()}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#d4edda] px-6 py-3.5 text-sm font-semibold text-[#155724] transition-colors hover:bg-[#c3e6cb] disabled:cursor-not-allowed disabled:opacity-60"
        >
          Send Note
        </button>
      </div>


      {complaint.notes.length > 0 && (
        <div className="mt-6 border-t border-slate-200 pt-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-900">Notes sent</h3>
          <ul className="space-y-3">
            {complaint.notes.map((n) => (
              <li key={n.id} className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <p className="whitespace-pre-wrap">{n.message}</p>
                <p className="mt-1 text-xs text-slate-400">{n.author} · {fmtDateTime(n.createdAt)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
