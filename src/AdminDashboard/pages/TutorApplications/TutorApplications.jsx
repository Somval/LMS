import React, { useCallback, useEffect, useState } from "react";
import { BadgeCheck, ChevronDown, FileText, Mail, Phone } from "lucide-react";
import { api, openPrivateFile } from "../../../lib/api";

const TABS = [
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
];

const DOC_LABELS = {
  qualification: "Qualification certificate",
  governmentId: "Government ID",
  supportingDoc: "Resume / CV",
  additionalCertificate: "Additional certificate",
};

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

function Application({ tutor, onChanged }) {
  const [open, setOpen] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const run = async (fn) => {
    setBusy(true);
    setError("");
    try {
      await fn();
      await onChanged();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  };

  const review = (status) =>
    run(() => api.patch(`/admin/tutors/${tutor.id}/review`, { status, reviewNote: note.trim() || undefined }));
  const verify = (doc) => run(() => api.patch(`/admin/tutors/documents/${doc.id}/verify`, { verified: !doc.verified }));
  const view = (doc) => openPrivateFile(doc.fileUrl).catch((e) => setError(e.message));

  const submitted = !!tutor.submittedAt;
  const history = Array.isArray(tutor.experienceHistory) ? tutor.experienceHistory : [];

  return (
    <article className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <div className="min-w-0">
          <h3 className="truncate text-base font-bold text-gray-900">{tutor.user.fullName}</h3>
          <p className="mt-0.5 truncate text-sm text-gray-500">
            {tutor.subjects.map((s) => s.subject.name).join(", ") || "No subject selected"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${submitted ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
            {submitted ? `Submitted ${fmtDate(tutor.submittedAt)}` : "Not submitted"}
          </span>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="space-y-5 border-t border-gray-100 p-5 text-sm text-gray-700">
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-gray-500">
            <span className="inline-flex items-center gap-1.5"><Mail className="h-4 w-4" />{tutor.user.email}</span>
            <span className="inline-flex items-center gap-1.5"><Phone className="h-4 w-4" />{tutor.user.phoneNumber || "—"}</span>
            <span>Registered {fmtDate(tutor.createdAt)}</span>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div><dt className="text-xs font-semibold uppercase text-gray-400">Experience</dt><dd>{tutor.experience || "—"}</dd></div>
            <div><dt className="text-xs font-semibold uppercase text-gray-400">Year levels</dt><dd>{(tutor.yearLevels || []).join(", ") || "—"}</dd></div>
            <div><dt className="text-xs font-semibold uppercase text-gray-400">Availability</dt>
              <dd>{(tutor.availableDays || []).join(", ") || "—"}{tutor.availableFrom ? ` · ${tutor.availableFrom} – ${tutor.availableTo || ""}` : ""}</dd></div>
          </dl>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Qualifications</h4>
            {tutor.qualifications?.length ? tutor.qualifications.map((q) => (
              <p key={q.id}>{q.title} — {q.institution}{q.year ? ` (${q.year})` : ""}</p>
            )) : <p className="text-gray-400">None added</p>}
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Teaching experience</h4>
            {history.length ? history.map((h, i) => (
              <p key={i}>{h.role || "Teacher"} at {h.institution || "—"}{h.startDate ? ` (${h.startDate}${h.endDate ? ` – ${h.endDate}` : ""})` : ""}</p>
            )) : <p className="text-gray-400">None added</p>}
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase text-gray-400">Verification documents</h4>
            {tutor.documents?.length ? (
              <ul className="space-y-2">
                {tutor.documents.map((d) => (
                  <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gray-50 px-4 py-2.5">
                    <span className="inline-flex items-center gap-2"><FileText className="h-4 w-4 text-indigo-600" />{DOC_LABELS[d.kind] || d.kind}</span>
                    <span className="flex items-center gap-2">
                      <button type="button" onClick={() => view(d)} className="text-sm font-semibold text-indigo-600 hover:underline">View</button>
                      <button type="button" disabled={busy} onClick={() => verify(d)}
                        className={`inline-flex items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold ${d.verified ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-600"}`}>
                        <BadgeCheck className="h-3.5 w-3.5" />{d.verified ? "Verified" : "Mark verified"}
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            ) : <p className="text-gray-400">No documents uploaded</p>}
          </div>

          {tutor.reviewNote && <p className="rounded-xl bg-gray-50 p-3 text-gray-600"><span className="font-semibold">Review note:</span> {tutor.reviewNote}</p>}
          {error && <p role="alert" className="text-red-600">{error}</p>}

          {tutor.status !== "APPROVED" || tutor.status === "PENDING" ? (
            <div className="space-y-3 border-t border-gray-100 pt-4">
              {rejecting && (
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Reason for rejection (the tutor will see this)"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-indigo-600" />
              )}
              <div className="flex flex-wrap gap-3">
                {tutor.status !== "APPROVED" && (
                  <button type="button" disabled={busy} onClick={() => review("APPROVED")}
                    className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60">Approve</button>
                )}
                {tutor.status !== "REJECTED" && (rejecting ? (
                  <button type="button" disabled={busy} onClick={() => review("REJECTED")}
                    className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60">Confirm rejection</button>
                ) : (
                  <button type="button" onClick={() => setRejecting(true)}
                    className="rounded-xl border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50">Reject</button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </article>
  );
}

export default function TutorApplications() {
  const [tab, setTab] = useState("PENDING");
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setTutors(await api.get("/admin/tutors", { status: tab }));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load applications.");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { setLoading(true); load(); }, [load]);

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tutor applications</h1>
        <p className="mt-1 text-sm text-[#8181A5]">Review documents and approve tutors before they can teach.</p>
      </div>

      <div className="flex gap-2">
        {TABS.map((t) => (
          <button key={t.key} type="button" onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === t.key ? "bg-[#2F327D] text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}
      {loading && <p className="py-10 text-center text-sm text-gray-400">Loading…</p>}
      {!loading && !error && tutors.length === 0 && (
        <p className="rounded-2xl bg-white py-12 text-center text-sm text-gray-400">No {tab.toLowerCase()} applications.</p>
      )}
      <div className="space-y-3">
        {tutors.map((t) => <Application key={t.id} tutor={t} onChanged={load} />)}
      </div>
    </section>
  );
}
