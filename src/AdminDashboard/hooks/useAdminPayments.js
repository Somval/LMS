import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
export const naira = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

const iso = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// First of this month through today.
export const defaultRange = () => {
  const now = new Date();
  return { from: iso(new Date(now.getFullYear(), now.getMonth(), 1)), to: iso(now) };
};

// Maps a backend payment to the row shape the transactions table uses.
export const toRow = (p) => {
  const refunded = Number(p.refundedAmount) > 0;
  return {
    id: p.id,
    transactionId: p.reference,
    date: fmtDate(p.createdAt),
    time: fmtTime(p.createdAt),
    user: p.student?.user?.fullName || "—",
    role: "Student",
    learnerId: p.student?.learnerId || "—",
    type: refunded ? "Refund" : (p.purpose || "subscription").replace(/^./, (c) => c.toUpperCase()),
    amount: naira(p.amount),
    rawAmount: Number(p.amount) || 0,
    status: refunded
      ? "Refunded"
      : p.status === "CONFIRMED" ? "Successful" : p.status === "FAILED" ? "Failed" : "Pending",
    paymentMethod: p.method === "CARD" ? "Card" : "Bank transfer",
    ...(refunded && {
      refundAmount: Number(p.refundedAmount),
      refundType: p.refundType,
      refundReason: p.refundReason,
    }),
  };
};

// Totals, trend and method split for a date range (GET /payments/admin/summary).
// Pass a changing `version` to force a reload after something was confirmed or refunded.
export function useRevenueSummary(range, version = 0) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get("/payments/admin/summary", { from: range.from, to: range.to })
      .then((data) => {
        if (cancelled) return;
        setSummary(data);
        setError("");
      })
      .catch((err) => !cancelled && setError(err.message || "Could not load revenue figures."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range.from, range.to, version]);

  return { summary, loading, error };
}

// One page of transactions, filtered on the server (GET /payments/admin).
export function useTransactions({ range, status, method, search, page, pageSize, version = 0 }) {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    api
      .get("/payments/admin", {
        from: range.from,
        to: range.to,
        status: status || undefined,
        method: method || undefined,
        search: search || undefined,
        page,
        pageSize,
      })
      .then((res) => {
        if (cancelled) return;
        setRows(res.payments.map(toRow));
        setTotal(res.total);
        setError("");
      })
      .catch((err) => !cancelled && setError(err.message || "Could not load transactions."))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [range.from, range.to, status, method, search, page, pageSize, version]);

  return { rows, total, loading, error };
}

// Downloads a CSV: the summary figures followed by every transaction in the range (up to 5,000).
export async function exportRevenueCsv(range, summary) {
  const { payments } = await api.get("/payments/admin/export", { from: range.from, to: range.to });
  // A leading quote stops spreadsheet apps from running text such as "=SUM(...)" as a formula.
  const esc = (v) => {
    const text = typeof v === "string" && /^[=+\-@\t\r]/.test(v) ? `'${v}` : v;
    return `"${String(text ?? "").replace(/"/g, '""')}"`;
  };
  const t = summary?.totals;
  const lines = [
    ["Revenue & Payments Report"],
    ["From", range.from],
    ["To", range.to],
    [],
    ...(t
      ? [
          ["Revenue (after refunds)", t.revenue],
          ["Successful payments", t.successful],
          ["Refunded", t.refunded],
          ["Pending payments", t.pending],
          ["Failed payments", t.failed],
          [],
        ]
      : []),
    ["Reference", "Date", "Student", "Learner ID", "Type", "Amount (NGN)", "Refunded (NGN)", "Status", "Method"],
    ...payments.map((p) => {
      const r = toRow(p);
      return [
        r.transactionId,
        new Date(p.createdAt).toISOString().slice(0, 10),
        r.user,
        r.learnerId,
        r.type,
        r.rawAmount,
        Number(p.refundedAmount) || 0,
        r.status,
        r.paymentMethod,
      ];
    }),
    ...(payments.length >= 5000 ? [[], ["Showing the latest 5,000 transactions only"]] : []),
  ];

  const blob = new Blob(["\uFEFF" + lines.map((row) => row.map(esc).join(",")).join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `revenue-payments-${range.from}-to-${range.to}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
