import React from "react";
import { X, Save } from "lucide-react";

// Quick edit from the list: rename, change the deadline, publish or keep as a draft.
export default function EditAssessmentModal({ isOpen, onClose, assessment, onSave, onChange }) {
  if (!isOpen || !assessment) return null;

  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500";
  const input = "h-11 w-full rounded-xl border border-slate-200 px-4 text-sm text-slate-800 outline-none focus:border-blue-500";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h3 className="text-lg font-bold text-slate-900">Edit {assessment.type}</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-4 p-6">
          <div>
            <label className={label} htmlFor="edit-title">Title</label>
            <input id="edit-title" className={input} value={assessment.title} onChange={(e) => onChange("title", e.target.value)} />
          </div>

          <div>
            <label className={label} htmlFor="edit-due">Deadline <span className="font-normal normal-case text-slate-400">(leave empty for none)</span></label>
            <input id="edit-due" type="datetime-local" className={input} value={assessment.dueInput} onChange={(e) => onChange("dueInput", e.target.value)} />
          </div>

          <label className="flex items-center gap-3 text-sm text-slate-700">
            <input type="checkbox" checked={assessment.published} onChange={(e) => onChange("published", e.target.checked)} className="h-4 w-4 accent-blue-600" />
            Published (students can see and submit it)
          </label>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button type="button" onClick={onClose} className="rounded-xl px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700">
              <Save className="h-4 w-4" /> <span>Save changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
