import React, { useCallback, useEffect, useState } from "react";
import { api, openPrivateFile } from "../../../lib/api";

const TABS = [
  { key: "PENDING", label: "Pending" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "FAILED", label: "Failed" },
];

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const naira = (n) => `₦${Number(n).toLocaleString()}`;

export default function Payments({ onChanged }) {
  const [tab, setTab] = useState("PENDING");
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const res = await api.get("/payments/admin", { status: tab, pageSize: 50 });
      setRows(res.payments);
      setTotal(res.total);
      setError("");
    } catch (err) {
      setError(err.message || "Could not load payments.");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => { setLoading(true); load(); }, [load]);

  const decide = async (payment, status) => {
    setBusyId(payment.id);
    setError("");
    try {
      await api.patch(`/payments/admin/${payment.id}`, { status });
      await load();
      onChanged?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Revenue &amp; payments</h1>
        <p className="mt-1 text-sm text-[#8181A5]">Confirm bank transfers once the money has arrived. Card payments confirm themselves.</p>
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

      <div className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-gray-100 text-xs uppercase text-gray-400">
            <tr>
              <th className="px-5 py-3">Date</th><th className="px-5 py-3">Student</th><th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Method</th><th className="px-5 py-3">Reference</th><th className="px-5 py-3">Receipt</th><th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading && <tr><td colSpan={7} className="py-10 text-center text-gray-400">Loading…</td></tr>}
            {!loading && rows.length === 0 && <tr><td colSpan={7} className="py-10 text-center text-gray-400">No {tab.toLowerCase()} payments.</td></tr>}
            {rows.map((p) => (
              <tr key={p.id} className="text-gray-700">
                <td className="px-5 py-3">{fmtDate(p.createdAt)}</td>
                <td className="px-5 py-3"><div className="font-medium text-gray-900">{p.student.user.fullName}</div><div className="text-xs text-gray-400">{p.student.learnerId}</div></td>
                <td className="px-5 py-3 font-semibold">{naira(p.amount)}</td>
                <td className="px-5 py-3">{p.method === "CARD" ? "Card" : "Bank transfer"}</td>
                <td className="px-5 py-3 font-mono text-xs">{p.reference}</td>
                <td className="px-5 py-3">
                  {p.proofUrl
                    ? <button type="button" onClick={() => openPrivateFile(p.proofUrl).catch((e) => setError(e.message))} className="font-semibold text-indigo-600 hover:underline">View</button>
                    : <span className="text-gray-300">—</span>}
                </td>
                <td className="px-5 py-3 text-right">
                  {p.status === "PENDING" && p.method === "BANK_TRANSFER" && (
                    <span className="inline-flex gap-2">
                      <button type="button" disabled={busyId === p.id || !p.proofUrl} onClick={() => decide(p, "CONFIRMED")}
                        title={p.proofUrl ? "" : "No receipt uploaded yet"}
                        className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-40">Confirm</button>
                      <button type="button" disabled={busyId === p.id} onClick={() => decide(p, "FAILED")}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-40">Reject</button>
                    </span>
                  )}
                  {p.status === "PENDING" && p.method === "CARD" && <span className="text-xs text-gray-400">Awaiting card</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && total > rows.length && <p className="text-xs text-gray-400">Showing the latest {rows.length} of {total}.</p>}
    </section>
  );
}
