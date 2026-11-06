import React, { useState } from 'react';
import { CreditCard, ReceiptText, ChevronRight, X, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

const naira = new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 });
const formatNaira = (amount) => naira.format(Number(amount) || 0);

const DAY = 24 * 60 * 60 * 1000;
const PERIOD_DAYS = 30; // each confirmed payment covers 30 days

const formatDate = (value) =>
  new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const STATUS_STYLES = {
  CONFIRMED: { label: 'Paid', className: 'bg-emerald-50 text-emerald-700' },
  PENDING: { label: 'Pending', className: 'bg-amber-50 text-amber-700' },
  FAILED: { label: 'Failed', className: 'bg-red-50 text-red-600' },
};
const METHOD_LABELS = { CARD: 'Card', BANK_TRANSFER: 'Bank transfer' };

const Modal = ({ title, onClose, children }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    onMouseDown={(e) => e.target === e.currentTarget && onClose()}
  >
    <div role="dialog" aria-modal="true" aria-label={title} className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-xl">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <button type="button" onClick={onClose} aria-label="Close" className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  </div>
);

// Billing: GET /payments/quote (monthly cost) + GET /payments (this student's payments)
export default function SubscriptionPayments() {
  const [open, setOpen] = useState(null); // 'billing' | 'history' | null
  const [data, setData] = useState(null); // { quote, payments }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const [payments, quote] = await Promise.all([
        api.get('/payments'),
        api.get('/payments/quote').catch(() => null), // no subjects chosen yet
      ]);
      setData({ payments, quote });
    } catch (err) {
      setError(err.message || 'Could not load your billing details.');
    } finally {
      setLoading(false);
    }
  };

  const openWindow = (which) => {
    setOpen(which);
    if (!data) load();
  };

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

    if (open === 'billing') {
      const lastPaid = data.payments
        .filter((p) => p.status === 'CONFIRMED')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
      const nextDue = lastPaid ? new Date(new Date(lastPaid.createdAt).getTime() + PERIOD_DAYS * DAY) : null;
      let status = 'Not paid yet';
      if (lastPaid) status = nextDue > new Date() ? 'Active' : 'Payment due';
      else if (data.payments.some((p) => p.status === 'PENDING')) status = 'Awaiting confirmation';

      return (
        <div className="rounded-xl border border-gray-200/80 p-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-semibold text-gray-900">Your subscription</h4>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                status === 'Active' ? 'bg-emerald-50 text-emerald-700' : status === 'Payment due' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'
              }`}
            >
              {status}
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-xs text-gray-400">Monthly cost</dt>
              <dd className="font-semibold text-gray-900">
                {data.quote ? formatNaira(data.quote.amount) : '—'}
                {data.quote && (
                  <span className="block text-xs font-normal text-gray-500">
                    {data.quote.subjects} subject{data.quote.subjects === 1 ? '' : 's'}
                  </span>
                )}
                {!data.quote && <span className="block text-xs font-normal text-gray-500">No subjects chosen yet</span>}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Last payment</dt>
              <dd className="font-semibold text-gray-900">{lastPaid ? formatDate(lastPaid.createdAt) : 'No payment yet'}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">Next payment due</dt>
              <dd className="font-semibold text-gray-900">{nextDue ? formatDate(nextDue) : '—'}</dd>
            </div>
          </dl>
          <p className="mt-4 text-xs text-gray-400">
            Each confirmed payment covers {PERIOD_DAYS} days. To renew or ask about billing, message the support team.
          </p>
        </div>
      );
    }

    if (data.payments.length === 0) return <p className="text-sm text-gray-500">You haven't made any payments yet.</p>;
    return (
      <div className="overflow-x-auto rounded-xl border border-gray-200/80">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500">
              <th className="px-4 py-3">Date</th>
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
    <div className="bg-white rounded-2xl mt-10 shadow-sm border border-slate-100 p-6 sm:p-8 w-full max-w-4xl mx-auto">
      {/* Section Heading */}
      <h2 className="text-xl font-bold text-slate-900 mb-6">Subscription & Payments</h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Billing Information Card */}
        <button
          type="button"
          onClick={() => openWindow('billing')}
          className="flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-200 hover:shadow-sm transition-all group text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50/50 text-blue-600 shrink-0 group-hover:bg-blue-100/50 transition-colors">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Billing Information</h3>
              <p className="text-xs text-slate-500 mt-0.5">View your billing details and next payment date</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </button>

        {/* Payment History Card */}
        <button
          type="button"
          onClick={() => openWindow('history')}
          className="flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-200 hover:shadow-sm transition-all group text-left cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50/50 text-blue-600 shrink-0 group-hover:bg-blue-100/50 transition-colors">
              <ReceiptText className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">Payment History</h3>
              <p className="text-xs text-slate-500 mt-0.5">View your past payments</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {open && (
        <Modal title={open === 'billing' ? 'Billing Information' : 'Payment History'} onClose={() => setOpen(null)}>
          {body()}
        </Modal>
      )}
    </div>
  );
}
