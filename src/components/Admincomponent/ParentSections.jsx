import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import Avatar from "../Avatar";

const fmtDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

const money = (n, currency = "NGN") =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(n ?? 0);

const ago = (d) => {
  const mins = Math.round((Date.now() - new Date(d).getTime()) / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  const days = Math.round(hrs / 24);
  return days < 30 ? `${days} day${days === 1 ? "" : "s"} ago` : fmtDate(d);
};

const humanize = (v) => String(v || "").toLowerCase().replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

const payBadge = (status) =>
  status === "CONFIRMED"
    ? "bg-[#E2F5D8] text-[#1E7212]"
    : status === "PENDING"
    ? "bg-[#FFF0D9] text-[#B96A08]"
    : "bg-[#FDE2E2] text-[#E53E3E]";

function Card({ title, action, children }) {
  return (
    <section className="w-full min-w-0 rounded-[10px] bg-white p-4 font-sans sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-[#dedfe3] pb-3">
        <h2 className="text-lg font-semibold text-[#111111] sm:text-[20px]">{title}</h2>
        {action}
      </div>
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

export default function ParentSections({ parent, onChanged = async () => {} }) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const active = parent.status === "Active";
  const toggleStatus = async () => {
    if (active && !window.confirm(`Suspend ${parent.name}? They will no longer be able to sign in.`)) return;
    setBusy(true);
    setError("");
    try {
      await api.patch(`/admin/users/${parent.id}/status`, { status: active ? "SUSPENDED" : "ACTIVE" });
      await onChanged();
    } catch (err) {
      setError(err.message || "Could not update the account.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex w-full min-w-0 flex-col gap-4">
      <Card
        title="Parent Information"
        action={
          <button
            type="button"
            disabled={busy}
            onClick={toggleStatus}
            className="rounded-md border border-[#c9cbd4] px-3 py-1.5 text-sm font-medium text-[#414152] hover:bg-gray-50 disabled:opacity-50"
          >
            {active ? "Suspend account" : "Reactivate account"}
          </button>
        }
      >
        {error && <p role="alert" className="mb-3 rounded-md bg-[#FDE7E7] px-3 py-2 text-sm text-[#D14343]">{error}</p>}
        <Row label="Full Name" value={parent.name} />
        <Row label="Email Address" value={parent.email} />
        <Row label="Phone Number" value={parent.phoneNumber} />
        <Row label="Date Joined" value={fmtDate(parent.joinedAt)} />
        <Row label="Account Status" value={parent.status} />
        <Row label="Children" value={String(parent.stats.linkedChildren)} />
      </Card>

      <Card title="Linked Children">
        {parent.children.length === 0 ? (
          <Empty>No children are linked to this account.</Empty>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {parent.children.map((child) => (
              <article key={child.studentId} className="min-w-0 rounded-lg border border-[#E7E9EF] p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={child.name} avatarUrl={child.avatarUrl} className="h-10 w-10 rounded-full" textClassName="text-sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-[#171717]">{child.name}</p>
                    <p className="truncate text-xs text-[#92929a]">{child.learnerId} · {child.status}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/admin/users/students/${child.userId}`)}
                    className="shrink-0 rounded-md border border-[#86EFAC] px-3 py-1.5 text-xs font-medium text-[#15803D] hover:bg-emerald-50"
                  >
                    View
                  </button>
                </div>
                {child.subjects.length === 0 ? (
                  <p className="mt-3 text-sm text-[#98A2B3]">Not enrolled in any subjects.</p>
                ) : (
                  <ul className="mt-3 divide-y divide-[#EDF0F3] text-sm text-[#374151]">
                    {child.subjects.map((s) => (
                      <li key={s.name} className="flex flex-wrap justify-between gap-2 py-1.5">
                        <span>{s.name}{s.level ? ` · ${s.level}` : ""}</span>
                        <span className="text-[#92929a]">{s.tutor ? `Tutor: ${s.tutor}` : "No tutor assigned"}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </Card>

      <Card title="Payments">
        {parent.payments.length === 0 ? (
          <Empty>No payments yet.</Empty>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="bg-[#eef1f4] text-[#4B5563]">
                  <th className="px-3 py-2.5 font-medium">Date</th>
                  <th className="px-3 py-2.5 font-medium">Student</th>
                  <th className="px-3 py-2.5 font-medium">Amount</th>
                  <th className="px-3 py-2.5 font-medium">Method</th>
                  <th className="px-3 py-2.5 font-medium">Reference</th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {parent.payments.map((p) => (
                  <tr key={p.id} className="border-b border-[#EDF0F3] text-[#374151]">
                    <td className="px-3 py-2.5">{fmtDate(p.createdAt)}</td>
                    <td className="px-3 py-2.5">{p.student}</td>
                    <td className="px-3 py-2.5">{money(p.amount, p.currency)}</td>
                    <td className="px-3 py-2.5">{humanize(p.method)}</td>
                    <td className="px-3 py-2.5 font-mono text-xs">{p.reference}</td>
                    <td className="px-3 py-2.5">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${payBadge(p.status)}`}>{humanize(p.status)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card title="Recent Activity">
        {parent.activity.length === 0 ? (
          <Empty>No activity yet.</Empty>
        ) : (
          <ul className="divide-y divide-[#EDF0F3]">
            {parent.activity.map((a, i) => (
              <li key={i} className="flex flex-wrap items-center justify-between gap-2 py-2.5 text-sm text-[#374151]">
                <span>{a.text}</span>
                <span className="text-xs text-[#92929a]">{ago(a.at)}</span>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
