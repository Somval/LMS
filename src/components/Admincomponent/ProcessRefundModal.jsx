
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function ProcessRefundModal({
  transaction,
  onClose,
  onConfirm,
}) {
  const [refundType, setRefundType] = useState("full");
  const [refundAmount, setRefundAmount] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const originalAmount = Number(
    String(transaction?.amount ?? "").replace(/[₦,\s]/g, "")
  );

  const formatCurrency = (amount) =>
    `₦${Number(amount || 0).toLocaleString("en-NG")}`;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount =
      refundType === "full"
        ? originalAmount
        : Number(refundAmount);

    if (!originalAmount || originalAmount <= 0) {
      setError("Invalid original transaction amount.");
      return;
    }

    if (
      refundType === "partial" &&
      (!Number.isFinite(amount) ||
        amount <= 0 ||
        amount >= originalAmount)
    ) {
      setError("Enter a valid partial refund amount.");
      return;
    }

    if (!reason.trim()) {
      setError("Please enter a reason for the refund.");
      return;
    }

    onConfirm({
      transactionId: transaction.transactionId,
      refundAmount: amount,
      refundType,
      reason: reason.trim(),
    });
  };

  if (!transaction || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-slate-900/40 p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="refund-title"
        className="relative my-auto max-h-[95dvh] w-full max-w-[470px] overflow-y-auto rounded-xl bg-white shadow-2xl"
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-[#B7E5D9] via-[#D9C5F2] to-[#F2D0D8]" />

        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-3">
            <div>
              <h2
                id="refund-title"
                className="text-lg font-bold text-slate-900"
              >
                Process Refund
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Enter the refund details to proceed.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close refund modal"
              className="rounded-md p-1 text-slate-500 transition hover:bg-slate-100"
            >
              <X size={22} />
            </button>
          </div>

          {/* Transaction Details */}
          <div className="space-y-5">
            <div className="grid grid-cols-[minmax(110px,42%)_minmax(0,1fr)] gap-3">
              <span className="text-sm text-slate-400">
                Transaction ID
              </span>

              <span className="break-words text-sm font-medium text-slate-900">
                {transaction.transactionId}
              </span>
            </div>

            <div className="grid grid-cols-[minmax(110px,42%)_minmax(0,1fr)] gap-3">
              <span className="text-sm text-slate-400">
                Customer
              </span>

              <div>
                <p className="break-words text-sm font-medium text-slate-900">
                  {transaction.user}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {transaction.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(110px,42%)_minmax(0,1fr)] gap-3">
              <span className="text-sm text-slate-400">
                Original Amount
              </span>

              <span className="text-sm font-medium text-slate-900">
                {formatCurrency(originalAmount)}
              </span>
            </div>

            {/* Refund Amount */}
            <div className="grid grid-cols-[minmax(110px,42%)_minmax(0,1fr)] items-start gap-3">
              <span className="pt-1 text-sm text-slate-400">
                Refund Amount
              </span>

              <div className="min-w-0 space-y-3">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="radio"
                    name="refundType"
                    value="full"
                    checked={refundType === "full"}
                    onChange={() => {
                      setRefundType("full");
                      setError("");
                    }}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#087F19]"
                  />

                  <span className="text-sm leading-6 text-slate-900">
                    Full amount ({formatCurrency(originalAmount)})
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="radio"
                    name="refundType"
                    value="partial"
                    checked={refundType === "partial"}
                    onChange={() => {
                      setRefundType("partial");
                      setError("");
                    }}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#087F19]"
                  />

                  <span className="text-sm leading-6 text-slate-900">
                    Partial amount
                  </span>
                </label>

                {refundType === "partial" && (
                  <input
                    type="number"
                    min="1"
                    max={Math.max(0, originalAmount - 1)}
                    step="1"
                    value={refundAmount}
                    onChange={(event) => {
                      setRefundAmount(event.target.value);
                      setError("");
                    }}
                    placeholder="Enter amount"
                    className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none placeholder:text-slate-400 focus:border-[#087F19] focus:ring-2 focus:ring-[#087F19]/10"
                  />
                )}
              </div>
            </div>

            {/* Refund Reason */}
            <div className="grid grid-cols-[minmax(110px,42%)_minmax(0,1fr)] items-start gap-3">
              <label
                htmlFor="refund-reason"
                className="pt-2 text-sm text-slate-400"
              >
                Reason for Refund
              </label>

              <textarea
                id="refund-reason"
                rows={3}
                maxLength={500}
                value={reason}
                onChange={(event) => {
                  setReason(event.target.value);
                  setError("");
                }}
                placeholder="Write a note..."
                className="w-full resize-y rounded-md border border-slate-200 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-[#087F19] focus:ring-2 focus:ring-[#087F19]/10"
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* Footer */}
          <div className="mt-7 flex justify-end">
            <button
              type="submit"
              className="min-h-11 rounded-md bg-[#064B0D] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#043D09] focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2"
            >
              Confirm Refund
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
