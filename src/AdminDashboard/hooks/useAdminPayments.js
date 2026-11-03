import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/api";

const STATUSES = ["PENDING", "CONFIRMED", "FAILED"];

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
export const naira = (n) => `₦${Number(n || 0).toLocaleString("en-NG")}`;

// Maps a backend payment to the row shape the Revenue & Payments design uses.
const toRow = (p) => ({
  id: p.id,
  transactionId: p.reference,
  date: fmtDate(p.createdAt),
  time: fmtTime(p.createdAt),
  user: p.student?.user?.fullName || "—",
  role: "Student",
  type: "Subscription",
  plan: p.planName || p.plan || "—",
  amount: naira(p.amount),
  rawAmount: Number(p.amount) || 0,
  status: p.status === "CONFIRMED" ? "Successful" : p.status === "FAILED" ? "Failed" : "Pending",
  paymentMethod: p.method === "CARD" ? "Card" : "Bank transfer",
});

// Loads payments for every status from GET /payments/admin and totals them.
export default function useAdminPayments() {
  const [rows, setRows] = useState([]);
  const [totals, setTotals] = useState({ revenue: 0, successful: 0, pending: 0, failed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const results = await Promise.all(
        STATUSES.map((status) => api.get("/payments/admin", { status, pageSize: 50 }))
      );
      const all = results.flatMap((r) => r.payments || []);
      const sum = (s) =>
        all.filter((p) => p.status === s).reduce((t, p) => t + (Number(p.amount) || 0), 0);
      const successful = sum("CONFIRMED");
      setTotals({ revenue: successful, successful, pending: sum("PENDING"), failed: sum("FAILED") });
      setRows(
        all.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(toRow)
      );
      setError("");
    } catch (err) {
      setError(err.message || "Could not load payments.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { rows, totals, loading, error, reload: load };
}
