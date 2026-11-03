import React, { useState } from "react";
import { CreditCard, ReceiptText, X, Loader2 } from "lucide-react";
import { api } from "../../lib/api";

const naira = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 });
const formatNaira = (amount) => naira.format(Number(amount) || 0);

const DAY = 24 * 60 * 60 * 1000;
const PERIOD_DAYS = 30; // each confirmed payment covers 30 days

const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const STATUS_STYLES = {
  CONFIRMED: { label: "Paid", className: "bg-emerald-50 text-emerald-700" },
  PENDING: { label: "Pending", className: "bg-amber-50 text-amber-700" },
  FAILED: { label: "Failed", className: "bg-red-50 text-red-600" },
};

const METHOD_LABELS = { CARD: "Card", BANK_TRANSFER: "Bank transfer" };

// Per child: what they cost each month, the last confirmed payment and when the next one is due.
export const billingRows = (children, payments, quotes) =>
  children.map((child) => {
    const lastPaid = payments
      .filter((p) => p.studentId === child.id && p.status === "CONFIRMED")
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    const nextDue = lastPaid ? new Date(new Date(lastPaid.createdAt).getTime() + PERIOD_DAYS * DAY) : null;

    let status = "Not paid yet";
    if (lastPaid) status = nextDue > new Date() ? "Active" : "Payment due";
    else if (payments.some((p) => p.studentId === child.id && p.status === "PENDING")) status = "Awaiting confirmation";

    return { child, quote: quotes[child.id] ?? null, lastPaid, nextDue, status };
  });

const Modal = ({ title, onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    <div role="dialog" aria-modal="true" aria-label={title} className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button type="button" onClick={onClose} aria-label="Close" className="p-1 text-gray-400 hover:text-gray-600 rounded-lg">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  </div>
);

export default function SubscriptionPayments({
  onBillingClick,
  onPaymentHistoryClick,
}) {
  const [open, setOpen] = useState(null); // 'billing' | 'history' | null
  const [data, setData] = useState(null); // { children, payments, quotes }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Everything both windows need, loaded when one is first opened.
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [children, payments] = await Promise.all([api.get("/parent/children"), api.get("/payments")]);
      const quotes = {};
      await Promise.all(
        children.map((child) =>
          api
            .get("/payments/quote", { studentId: child.id })
            .then((q) => { quotes[child.id] = q; })
            .catch(() => { quotes[child.id] = null; }) // no subjects chosen yet
        )
      );
      setData({ children, payments, quotes });
    } catch (err) {
      setError(err.message || "Could not load your billing details.");
    } finally {
      setLoading(false);
    }
  };

  const openWindow = (which, callback) => {
    callback?.();
    setOpen(which);
    if (!data) load();
  };

  const nameOf = (studentId) => data?.children.find((c) => c.id === studentId)?.fullName ?? "—";

  const body = () => {
    if (error) {
      return (
        <div className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
          <p>{error}</p>
          <button type="button" onClick={load} className="mt-3 rounded-lg border border-red-300 px-3 py-1.5 font-semibold hover:bg-red-100">
            Try again
          </button>
        </div>
      );
    }
    if (loading || !data) {
      return (
        <div className="flex items-center justify-center p-10">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      );
    }

    if (open === "billing") {
      const rows = billingRows(data.children, data.payments, data.quotes);
      if (rows.length === 0) return <p className="text-sm text-gray-500">No child is linked to your account yet.</p>;
      return (
        <div className="space-y-3">
          {rows.map(({ child, quote, lastPaid, nextDue, status }) => (
            <div key={child.id} className="rounded-xl border border-gray-200/80 p-4">
              <div className="flex items-center justify-between gap-3">
                <h4 className="font-semibold text-gray-900">{child.fullName}</h4>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    status === "Active" ? "bg-emerald-50 text-emerald-700" : status === "Payment due" ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {status}
                </span>
              </div>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <dt className="text-xs text-gray-400">Monthly cost</dt>
                  <dd className="font-semibold text-gray-900">
                    {quote ? `${formatNaira(quote.amount)}` : "—"}
                    {quote && <span className="block text-xs font-normal text-gray-500">{quote.subjects} subject{quote.subjects === 1 ? "" : "s"} × {formatNaira(quote.pricePerSubject ?? quote.amount / quote.subjects)}</span>}
                    {!quote && <span className="block text-xs font-normal text-gray-500">No subjects chosen yet</span>}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">Last payment</dt>
                  <dd className="font-semibold text-gray-900">{lastPaid ? formatDate(lastPaid.createdAt) : "No payment yet"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">Next payment due</dt>
                  <dd className="font-semibold text-gray-900">{nextDue ? formatDate(nextDue) : "—"}</dd>
                </div>
              </dl>
            </div>
          ))}
          <p className="text-xs text-gray-400">
            Each confirmed payment covers {PERIOD_DAYS} days. To renew or ask about billing, message the support team.
          </p>
        </div>
      );
    }

    if (data.payments.length === 0) return <p className="text-sm text-gray-500">You haven't made any payments yet.</p>;
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200/80">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500">
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Child</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.payments.map((payment) => {
              const status = STATUS_STYLES[payment.status] ?? STATUS_STYLES.PENDING;
              return (
                <tr key={payment.id}>
                  <td className="px-4 py-3 whitespace-nowrap">{formatDate(payment.createdAt)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{nameOf(payment.studentId)}</td>
                  <td className="px-4 py-3 whitespace-nowrap font-semibold">{formatNaira(payment.amount)}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{METHOD_LABELS[payment.method] ?? payment.method}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${status.className}`}>{status.label}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <section className="w-full  p-2 sm:p-4">
      {/* Main Container: 1054px × 227px */}
      <div className="box-border min-h-[227px] w-full max-w-[1054px] rounded-[6px] border border-[#E7E9EF] bg-white px-5 py-5 sm:px-[19px] sm:py-[17px]">
        {/* Heading */}
        <h2 className="mb-[17px] text-[14px] font-bold leading-[18px] text-[#171717]">
          Subscription &amp; Payments
        </h2>

        {/* Billing Information and Payment History */}
        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-[14px]">
          {/* Billing Information */}
          <button
            type="button"
            onClick={() => openWindow("billing", onBillingClick)}
            className="flex min-h-[60px] w-full min-w-0 items-start gap-[10px] rounded-[6px] border border-[#E9EBF0] bg-[#F8F9FB] px-[9px] py-[10px] text-left transition-colors duration-200 hover:border-[#C9D7FF] hover:bg-[#F5F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3366FF] focus-visible:ring-offset-2"
          >
            <span className="mt-[1px] flex h-[21px] w-[21px] shrink-0 items-center justify-center text-[#3366FF]">
              <CreditCard
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[11px] font-bold leading-[15px] text-[#171717]">
                Billing Information
              </span>

              <span className="mt-[5px] text-[10px] font-normal leading-[13px] text-[#8181A5]">
                View your billing details and next payment date
              </span>
            </span>
          </button>

          {/* Payment History */}
          <button
            type="button"
            onClick={() => openWindow("history", onPaymentHistoryClick)}
            className="flex min-h-[60px] w-full min-w-0 items-start gap-[10px] rounded-[6px] border border-[#E9EBF0] bg-[#F8F9FB] px-[9px] py-[10px] text-left transition-colors duration-200 hover:border-[#C9D7FF] hover:bg-[#F5F7FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3366FF] focus-visible:ring-offset-2"
          >
            <span className="mt-[1px] flex h-[21px] w-[21px] shrink-0 items-center justify-center text-[#3366FF]">
              <ReceiptText
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>

            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-[11px] font-bold leading-[15px] text-[#171717]">
                Payment History
              </span>

              <span className="mt-[5px] text-[10px] font-normal leading-[13px] text-[#8181A5]">
                View your past payments
              </span>
            </span>
          </button>
        </div>
      </div>

      {open && (
        <Modal title={open === "billing" ? "Billing Information" : "Payment History"} onClose={() => setOpen(null)}>
          {body()}
        </Modal>
      )}
    </section>
  );
}
