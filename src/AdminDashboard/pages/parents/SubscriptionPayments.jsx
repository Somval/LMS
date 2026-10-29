
import React, { useState } from "react";
import { X, CreditCard, CheckCircle2 } from "lucide-react";

const subscription = {
  currentPlan: "Monthly",
  startDate: "12 Mar 2024",
  nextRenewal: "12 Mar 2025",
  paymentMethod: "Visa •••• 4242",
  status: "Active",
};

const initialPayments = [
  { id: 1, amount: "£29.99", date: "12 Mar 2026", status: "Paid" },
  { id: 2, amount: "£29.99", date: "12 Mar 2026", status: "Paid" },
  { id: 3, amount: "£29.99", date: "12 Mar 2026", status: "Paid" },
];

const subscriptionFields = [
  { label: "Current Plan", key: "currentPlan" },
  { label: "Start Date", key: "startDate" },
  { label: "Next Renewal", key: "nextRenewal" },
  { label: "Payment Method", key: "paymentMethod" },
  { label: "Status", key: "status" },
];

function PaymentTable({ payments, showAllRows = false }) {
  const visiblePayments = showAllRows
    ? payments
    : payments.slice(0, 3);

  return (
    <div className="w-full min-w-0 overflow-hidden rounded-[5px] border border-[#E5E9EF]">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[480px] table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[14%]" />
            <col className="w-[32%]" />
            <col className="w-[28%]" />
            <col className="w-[26%]" />
          </colgroup>

          <thead>
            <tr className="h-[47px] bg-[#EEF3FB] text-[#737D88]">
              <th className="px-5 text-[15px] font-medium sm:text-[17px]">
                #
              </th>
              <th className="px-3 text-[15px] font-medium sm:text-[17px]">
                Amount
              </th>
              <th className="px-3 text-[15px] font-medium sm:text-[17px]">
                Date
              </th>
              <th className="px-3 text-[15px] font-medium sm:text-[17px]">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {visiblePayments.map((payment, index) => (
              <tr
                key={payment.id}
                className="h-[53px] border-t border-[#E0E4EA] bg-white transition-colors hover:bg-[#FAFBFD]"
              >
                <td className="px-5 text-[14px] text-[#737D88] sm:text-[15px]">
                  {index + 1}
                </td>

                <td className="px-3 text-[14px] text-[#737D88] sm:text-[15px]">
                  {payment.amount}
                </td>

                <td className="whitespace-nowrap px-3 text-[13px] text-[#737D88] sm:text-[15px]">
                  {payment.date}
                </td>

                <td className="px-3">
                  <span className="inline-flex min-w-[67px] items-center justify-center rounded-full bg-[#DDF5E6] px-3 py-[5px] text-[12px] font-medium text-[#08A847]">
                    {payment.status}
                  </span>
                </td>
              </tr>
            ))}

            {visiblePayments.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-10 text-center text-sm text-[#737D88]"
                >
                  No payment records available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function SubscriptionPayments() {
  const [isPaymentsOpen, setIsPaymentsOpen] = useState(false);
  const [payments] = useState(initialPayments);

  return (
    <>
      <section className="w-full min-w-0 rounded-[10px] bg-white p-4 sm:p-5">
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E0E4EA] pb-4">
          <h2 className="text-[20px] font-semibold leading-7 tracking-[-0.35px] text-black sm:text-[22px]">
            Subscription &amp; Payments
          </h2>

          <button
            type="button"
            onClick={() => setIsPaymentsOpen(true)}
            className="inline-flex h-[35px] shrink-0 items-center justify-center rounded-[5px] border border-[#16C65A] bg-white px-5 text-[13px] font-medium text-[#16C65A] transition-colors hover:bg-[#EFFFF4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16C65A] focus-visible:ring-offset-2 sm:px-6 sm:text-[14px]"
          >
            View All Payments
          </button>
        </header>

        {/* Main Content */}
        <div className="grid min-w-0 grid-cols-1 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)]">
          {/* Subscription Details */}
          <div className="min-w-0 py-3 md:border-r md:border-[#D9DEE6] md:py-4 md:pr-5">
            <div className="space-y-[17px]">
              {subscriptionFields.map((field) => (
                <div
                  key={field.key}
                  className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-2"
                >
                  <span className="min-w-0 text-[15px] font-normal leading-5 text-[#737D88] sm:text-[17px]">
                    {field.label}
                  </span>

                  <span
                    className={`min-w-0 break-words text-[15px] font-medium leading-5 sm:text-[17px] ${
                      field.key === "status"
                        ? "text-black"
                        : "text-black"
                    }`}
                  >
                    {subscription[field.key]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payment History */}
          <div className="min-w-0 border-t border-[#D9DEE6] py-4 md:border-l-0 md:border-t-0 md:pl-[15px]">
            <PaymentTable payments={payments} />
          </div>
        </div>
      </section>

      {/* View All Payments Modal */}
      {isPaymentsOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsPaymentsOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="all-payments-title"
            className="my-auto w-full max-w-[800px] overflow-hidden rounded-xl border border-[#E5E9EF] bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-4 border-b border-[#E5E9EF] px-5 py-5 sm:px-6">
              <div>
                <h3
                  id="all-payments-title"
                  className="text-lg font-semibold text-[#111827] sm:text-xl"
                >
                  Payment History
                </h3>

                <p className="mt-1 text-sm text-[#737D88]">
                  Review your subscription payment records.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsPaymentsOpen(false)}
                aria-label="Close payment history"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#737D88] transition hover:bg-[#F3F5F9] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Subscription Summary */}
            <div className="grid grid-cols-1 gap-3 border-b border-[#E5E9EF] bg-[#FAFBFD] p-5 sm:grid-cols-2 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E5F7EB] text-[#159A42]">
                  <CreditCard size={20} />
                </div>

                <div>
                  <p className="text-xs text-[#737D88]">
                    Subscription Plan
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#111827]">
                    {subscription.currentPlan}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E5F7EB] text-[#159A42]">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-xs text-[#737D88]">
                    Account Status
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#111827]">
                    {subscription.status}
                  </p>
                </div>
              </div>
            </div>

            {/* All Payments */}
            <div className="max-h-[55vh] overflow-y-auto p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h4 className="text-sm font-semibold text-[#111827]">
                  All Transactions
                </h4>

                <span className="text-xs text-[#737D88]">
                  {payments.length} payments
                </span>
              </div>

              <PaymentTable payments={payments} showAllRows />
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-[#E5E9EF] bg-[#FAFBFD] px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setIsPaymentsOpen(false)}
                className="inline-flex h-10 items-center justify-center rounded-md bg-[#159A42] px-5 text-sm font-medium text-white transition hover:bg-[#128238] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#159A42] focus-visible:ring-offset-2"
              >
                Close
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
