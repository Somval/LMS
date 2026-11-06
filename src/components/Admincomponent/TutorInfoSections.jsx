import React, { useState } from "react";
import { BadgeCheck, Eye, FileText } from "lucide-react";
import { api, openPrivateFile } from "../../lib/api";

const DOC_LABELS = {
  qualification: "Qualification certificate",
  governmentId: "Government ID",
  supportingDoc: "Resume / CV",
  additionalCertificate: "Additional certificate",
};

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

const fmtTime = (t) => {
  const m = /^(\d{1,2}):(\d{2})/.exec(t || "");
  if (!m) return t || "";
  const h = Number(m[1]);
  return `${h % 12 || 12}:${m[2]} ${h >= 12 ? "PM" : "AM"}`;
};

function Card({ title, children }) {
  return (
    <section className="w-full min-w-0 rounded-[10px] bg-white p-4 font-sans sm:p-5">
      <h2 className="border-b border-[#dedfe3] pb-3 text-lg font-semibold text-[#111111] sm:text-[20px]">{title}</h2>
      <div className="pt-3">{children}</div>
    </section>
  );
}

function Row({ label, value }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 border-b border-[#e0e1e5] px-1 py-2.5 last:border-b-0">
      <span className="break-words text-sm text-[#92929a] sm:text-base">{label}</span>
      <span className="break-words text-sm text-[#374151] sm:text-base">{value || "—"}</span>
    </div>
  );
}

const Empty = ({ children }) => <p className="py-4 text-sm text-[#98A2B3]">{children}</p>;

export default function TutorInfoSections({ tutor, onChanged = async () => {} }) {
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const view = (doc) => openPrivateFile(doc.fileUrl).catch((e) => setError(e.message));
  const toggleVerified = async (doc) => {
    setBusyId(doc.id);
    setError("");
    try {
      await api.patch(`/admin/tutors/documents/${doc.id}/verify`, { verified: !doc.verified });
      await onChanged();
    } catch (err) {
      setError(err.message || "Could not update the document.");
    } finally {
      setBusyId(null);
    }
  };

  const av = tutor.availability;
  const availability =
    av.days.length || av.from
      ? `${av.days.join(", ") || "Days not set"}${av.from && av.to ? ` · ${fmtTime(av.from)} – ${fmtTime(av.to)}` : ""}`
      : "";

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <Card title="Basic Information">
        <Row label="Full Name" value={tutor.name} />
        <Row label="Email Address" value={tutor.email} />
        <Row label="Phone Number" value={tutor.phoneNumber} />
        <Row label="Date Joined" value={fmtDate(tutor.joinedAt)} />
        <Row label="Years of Teaching Experience" value={tutor.experience} />
        <Row label="Availability" value={availability} />
        {tutor.bio && <Row label="Bio" value={tutor.bio} />}
      </Card>

      <Card title="Subjects and Levels Taught">
        {tutor.subjects.length === 0 ? (
          <Empty>No subjects selected.</Empty>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {tutor.subjects.map((s) => (
                <span key={s.id} className="rounded-full bg-[#EEF1FF] px-3 py-1 text-sm font-medium text-[#34368C]">{s.name}</span>
              ))}
            </div>
            <p className="text-sm text-[#92929a]">
              Year levels: <span className="text-[#374151]">{tutor.yearLevels.join(", ") || "—"}</span>
            </p>
          </div>
        )}
      </Card>

      <Card title="Qualifications">
        {tutor.qualifications.length === 0 ? (
          <Empty>No qualifications added.</Empty>
        ) : (
          tutor.qualifications.map((q) => (
            <Row key={q.id} label={q.year ? String(q.year) : "—"} value={`${q.title} — ${q.institution}`} />
          ))
        )}
      </Card>

      <Card title="Teaching Experience">
        {tutor.experienceHistory.length === 0 ? (
          <Empty>No teaching experience added.</Empty>
        ) : (
          <div className="space-y-3">
            {tutor.experienceHistory.map((e, i) => (
              <article key={i} className="rounded-lg border border-[#E7E9EF] p-4 text-sm text-[#374151]">
                <p className="font-semibold text-[#171717]">{e.role || "Role not set"}{e.institution ? ` · ${e.institution}` : ""}</p>
                <p className="mt-1 text-[#92929a]">
                  {[e.startDate, e.endDate].filter(Boolean).join(" – ") || "Dates not set"}
                </p>
                {(e.subjects || e.yearLevels) && (
                  <p className="mt-1">
                    {[Array.isArray(e.subjects) ? e.subjects.join(", ") : e.subjects, Array.isArray(e.yearLevels) ? e.yearLevels.join(", ") : e.yearLevels].filter(Boolean).join(" · ")}
                  </p>
                )}
                {e.description && <p className="mt-2 leading-6">{e.description}</p>}
              </article>
            ))}
          </div>
        )}
      </Card>

      <Card title="Verification Documents">
        {error && <p role="alert" className="mb-3 rounded-md bg-[#FDE7E7] px-3 py-2 text-sm text-[#D14343]">{error}</p>}
        {tutor.documents.length === 0 ? (
          <Empty>No documents uploaded.</Empty>
        ) : (
          <ul className="divide-y divide-[#EDF0F3]">
            {tutor.documents.map((doc) => (
              <li key={doc.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <span className="inline-flex min-w-0 items-center gap-2 text-sm text-[#374151]">
                  <FileText size={18} className="shrink-0 text-[#92929a]" />
                  {DOC_LABELS[doc.kind] || doc.kind}
                  {doc.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                      <BadgeCheck size={14} /> Verified
                    </span>
                  )}
                </span>
                <span className="flex gap-2">
                  <button type="button" onClick={() => view(doc)} className="inline-flex items-center gap-1.5 rounded-md border border-[#c9cbd4] px-3 py-1.5 text-xs font-medium text-[#414152] hover:bg-gray-50">
                    <Eye size={14} /> View
                  </button>
                  <button type="button" disabled={busyId === doc.id} onClick={() => toggleVerified(doc)} className="rounded-md border border-[#86EFAC] px-3 py-1.5 text-xs font-medium text-[#15803D] hover:bg-emerald-50 disabled:opacity-50">
                    {doc.verified ? "Unverify" : "Mark verified"}
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
