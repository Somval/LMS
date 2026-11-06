
import React, { useEffect, useMemo, useState } from "react";
import { useTransactions } from "../../AdminDashboard/hooks/useAdminPayments";
import { api } from "../../lib/api";
import { createPortal } from "react-dom";

import {
  Search,
  ChevronDown,
  MoreVertical,
  Eye,
  Download,
  RefreshCcw,
  X,
  CheckCircle2,
  CreditCard,
  UserRound,
  Receipt,
} from "lucide-react";

import ProcessRefundModal from "./ProcessRefundModal";


const statusStyles = {
  Successful: "bg-[#DDF7E7] text-[#16A34A]",
  Pending: "bg-[#F5E8FA] text-[#A020C0]",
  Failed: "bg-[#FCE1E5] text-[#E5485D]",
  Refunded: "bg-[#DCE8FF] text-[#326BFA]",
};

const PAGE_SIZE = 15;
const STATUS_PARAM = { Successful: "CONFIRMED", Pending: "PENDING", Failed: "FAILED", Refunded: "REFUNDED" };
const METHOD_FILTERS = ["All Methods", "Card", "Bank transfer"];
const METHOD_PARAM = { Card: "CARD", "Bank transfer": "BANK_TRANSFER" };

export default function PaymentTransactions({ range, version = 0, onChanged }) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("All Methods");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [page, setPage] = useState(1);
  const [localVersion, setLocalVersion] = useState(0);

  const [openMenu, setOpenMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [refundTransaction, setRefundTransaction] = useState(null);
  const [notification, setNotification] = useState("");

  // Wait for a pause in typing before searching, and go back to page 1 when filters change.
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 300);
    return () => clearTimeout(t);
  }, [search]);
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedMethod, selectedStatus, range.from, range.to]);

  // Filtering, search and paging all happen on the server.
  const { rows, total, loading, error } = useTransactions({
    range,
    status: STATUS_PARAM[selectedStatus],
    method: METHOD_PARAM[selectedMethod],
    search: debouncedSearch,
    page,
    pageSize: PAGE_SIZE,
    version: version + localVersion,
  });
  const filteredTransactions = rows;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const showNotification = (message) => {
    setNotification(message);
  };

  const handleViewReceipt = (transaction) => {
    setOpenMenu(null);
    setSelectedTransaction(transaction);
  };

  const handleDownloadReceipt = (transaction) => {
    const receiptContent = [
      "PAYMENT RECEIPT",
      "-----------------------------",
      `Transaction ID: ${transaction.transactionId}`,
      `Customer: ${transaction.user}`,
      `Date: ${transaction.date}`,
      `Time: ${transaction.time}`,
      `Transaction Type: ${transaction.type}`,
      `Learner ID: ${transaction.learnerId}`,
      `Amount: ${transaction.amount}`,
      `Status: ${transaction.status}`,
      `Payment Method: ${transaction.paymentMethod}`,
      transaction.refundReason
        ? `Refund Reason: ${transaction.refundReason}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    const blob = new Blob([receiptContent], {
      type: "text/plain;charset=utf-8",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `receipt-${transaction.transactionId}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    setOpenMenu(null);
    showNotification("Receipt downloaded successfully.");
  };

  const handleProcessRefund = (transaction) => {
    setOpenMenu(null);

    if (transaction.status !== "Successful") {
      showNotification(
        "Only successful payments can be selected for refund."
      );
      return;
    }

    setRefundTransaction(transaction);
  };

  const handleConfirmRefund = async (refundDetails) => {
    const partial = refundDetails.refundType === "partial";
    try {
      await api.post(`/payments/admin/${refundTransaction.id}/refund`, {
        type: partial ? "PARTIAL" : "FULL",
        ...(partial && { amount: refundDetails.refundAmount }),
        reason: refundDetails.reason,
      });
      setRefundTransaction(null);
      setLocalVersion((v) => v + 1);
      onChanged?.();
      showNotification(
        `Refund of ₦${refundDetails.refundAmount.toLocaleString("en-NG")} recorded. For card payments, also refund the customer in Paystack.`
      );
    } catch (err) {
      setLocalVersion((v) => v + 1);
      showNotification(err.message || "Could not record the refund.");
    }
  };

  // Transaction action menu
  const TransactionMenu = ({ transaction }) => {
    const isOpen = openMenu === transaction.id;

    const handleToggle = (event) => {
      if (isOpen) {
        setOpenMenu(null);
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const menuWidth = 200;
      const menuHeight = 145;
      const gap = 8;

      const left = Math.max(
        8,
        Math.min(
          rect.right - menuWidth,
          window.innerWidth - menuWidth - 8
        )
      );

      const spaceBelow = window.innerHeight - rect.bottom;

      const top =
        spaceBelow >= menuHeight + gap
          ? rect.bottom + gap
          : Math.max(8, rect.top - menuHeight - gap);

      setMenuPosition({ top, left });
      setOpenMenu(transaction.id);
    };

    return (
      <>
        <button
          type="button"
          onClick={handleToggle}
          aria-label={`Actions for ${transaction.transactionId}`}
          aria-expanded={isOpen}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#D8E0EA] bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-800"
        >
          <MoreVertical size={17} />
        </button>

        {isOpen &&
          createPortal(
            <>
              <button
                type="button"
                aria-label="Close transaction menu"
                onClick={() => setOpenMenu(null)}
                className="fixed inset-0 z-[9998] cursor-default"
              />

              <div
                className="fixed z-[9999] w-[200px] rounded-lg border border-slate-100 bg-white p-2 shadow-xl"
                style={{
                  top: menuPosition.top,
                  left: menuPosition.left,
                }}
              >
                <button
                  type="button"
                  onClick={() => handleViewReceipt(transaction)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  <Eye size={16} />
                  View Receipt
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadReceipt(transaction)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50"
                >
                  <Download size={16} />
                  Download Receipt
                </button>

                <button
                  type="button"
                  disabled={transaction.status !== "Successful"}
                  onClick={() => handleProcessRefund(transaction)}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <RefreshCcw size={16} />
                  Process Refund
                </button>
              </div>
            </>,
            document.body
          )}
      </>
    );
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-semibold ${
        statusStyles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );

  const MobileDetail = ({ label, value }) => (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="text-xs font-medium text-slate-400">
        {label}
      </span>

      <span className="break-words text-sm font-medium text-slate-700">
        {value}
      </span>
    </div>
  );

  return (
    <section className="w-full rounded-xl bg-[#F4F7FD] p-3 sm:p-5">
      {/* Search and Filters */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:items-center">
        <div className="relative w-full lg:max-w-[300px]">
          <Search
            size={17}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or transaction ID..."
            className="h-11 w-full rounded-lg border border-[#D9E0EA] bg-white pl-10 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="relative w-full lg:w-[160px]">
          <select
            value={selectedMethod}
            onChange={(event) => setSelectedMethod(event.target.value)}
            className="h-11 w-full appearance-none rounded-lg border border-[#D9E0EA] bg-white px-3.5 pr-9 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            {METHOD_FILTERS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>

        <div className="relative w-full lg:w-[160px]">
          <select
            value={selectedStatus}
            onChange={(event) => setSelectedStatus(event.target.value)}
            className="h-11 w-full appearance-none rounded-lg border border-[#D9E0EA] bg-white px-3.5 pr-9 text-sm text-slate-700 outline-none focus:border-blue-400"
          >
            <option>All Status</option>
            <option>Successful</option>
            <option>Pending</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden w-full overflow-x-auto rounded-lg md:block">
        <table className="w-full min-w-[950px] border-collapse text-left">
          <thead>
            <tr className="h-12 bg-[#E8EEF8] text-xs font-semibold text-slate-700">
              <th className="rounded-l-lg px-3">#</th>
              <th className="px-3">Date &amp; Time</th>
              <th className="px-3">User</th>
              <th className="px-3">Type</th>
              <th className="px-3">Learner ID</th>
              <th className="px-3">Amount</th>
              <th className="px-3">Status</th>
              <th className="px-3">Payment Method</th>
              <th className="rounded-r-lg px-3" />
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="h-[66px] border-b border-[#E0E6EF] text-xs text-slate-500 transition hover:bg-white/70"
              >
                <td className="whitespace-nowrap px-3 font-medium">
                  {transaction.transactionId}
                </td>

                <td className="whitespace-nowrap px-3">
                  <div>{transaction.date}</div>
                  <div className="mt-1 text-xs text-slate-400">
                    {transaction.time}
                  </div>
                </td>

                <td className="px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-[#D8D8D8]" />

                    <div>
                      <p className="whitespace-nowrap text-xs font-semibold text-slate-800">
                        {transaction.user}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-400">
                        {transaction.role}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="whitespace-nowrap px-3">
                  {transaction.type}
                </td>

                <td className="whitespace-nowrap px-3">
                  {transaction.learnerId}
                </td>

                <td className="whitespace-nowrap px-3 font-semibold text-slate-700">
                  {transaction.amount}
                </td>

                <td className="px-3">
                  <StatusBadge status={transaction.status} />
                </td>

                <td className="whitespace-nowrap px-3">
                  {transaction.paymentMethod}
                </td>

                <td className="px-3">
                  <TransactionMenu transaction={transaction} />
                </td>
              </tr>
            ))}

            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan="9" className="h-40 text-center">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search size={25} className="text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">
                      {loading ? "Loading transactions…" : "No transactions found"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {error || (loading ? "" : "Try changing your search or filters.")}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Transaction Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {filteredTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="rounded-xl border border-[#E2E8F0] bg-white p-4 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E8EEF8] text-slate-600">
                  <Receipt size={19} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">
                    {transaction.transactionId}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {transaction.date} · {transaction.time}
                  </p>
                </div>
              </div>

              <TransactionMenu transaction={transaction} />
            </div>

            <div className="mb-4 flex items-center justify-between gap-3 rounded-lg bg-[#F5F7FC] p-3">
              <div>
                <p className="text-xs text-slate-400">
                  Transaction Amount
                </p>

                <h3 className="mt-1 text-lg font-bold text-slate-900">
                  {transaction.amount}
                </h3>

                {transaction.refundAmount && (
                  <p className="mt-1 text-xs text-slate-500">
                    Refunded: ₦
                    {transaction.refundAmount.toLocaleString("en-NG")}
                  </p>
                )}
              </div>

              <StatusBadge status={transaction.status} />
            </div>

            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E5E7EB]">
                <UserRound size={17} className="text-slate-500" />
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {transaction.user}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {transaction.role}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-slate-100 pt-4">
              <MobileDetail
                label="Transaction Type"
                value={transaction.type}
              />

              <MobileDetail
                label="Learner ID"
                value={transaction.learnerId}
              />

              <MobileDetail
                label="Payment Method"
                value={transaction.paymentMethod}
              />

              <MobileDetail
                label="Transaction Date"
                value={transaction.date}
              />
            </div>
          </div>
        ))}

        {filteredTransactions.length === 0 && (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-5 text-center">
            <Search size={28} className="mb-3 text-slate-300" />

            <h3 className="text-sm font-semibold text-slate-700">
              {loading ? "Loading transactions…" : "No transactions found"}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {error || (loading ? "" : "Try changing your search or filters.")}
            </p>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredTransactions.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {total}
          </span>{" "}
          transactions
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1 || loading}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-md border border-[#D9E0EA] bg-white px-3 py-1.5 text-xs font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-md border border-[#D9E0EA] bg-white px-3 py-1.5 text-xs font-medium text-slate-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {(search ||
          selectedMethod !== "All Methods" ||
          selectedStatus !== "All Status") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedMethod("All Methods");
              setSelectedStatus("All Status");
            }}
            className="text-xs font-semibold text-blue-600 transition hover:text-blue-800"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-5 right-4 z-[100000] flex max-w-[calc(100%-2rem)] items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg sm:right-5 sm:max-w-[380px]">
          <CheckCircle2
            size={19}
            className="mt-0.5 shrink-0 text-green-600"
          />

          <p className="flex-1 text-sm leading-5 text-slate-600">
            {notification}
          </p>

          <button
            type="button"
            onClick={() => setNotification("")}
            className="text-slate-400 hover:text-slate-700"
            aria-label="Close notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* View Receipt Modal */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedTransaction(null);
            }
          }}
        >
          <div className="my-auto w-full max-w-[420px] rounded-xl bg-white p-5 shadow-xl sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">
                  Payment Receipt
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Transaction details
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedTransaction(null)}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                aria-label="Close receipt"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mb-5 flex flex-col items-center rounded-xl bg-[#F4F7FD] p-5">
              <CreditCard size={27} className="mb-3 text-slate-500" />

              <p className="text-xs text-slate-500">
                Total Amount
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                {selectedTransaction.amount}
              </h2>

              <div className="mt-3">
                <StatusBadge status={selectedTransaction.status} />
              </div>
            </div>

            <div className="space-y-4">
              {[
                ["Transaction ID", selectedTransaction.transactionId],
                ["Customer", selectedTransaction.user],
                ["Date", selectedTransaction.date],
                ["Time", selectedTransaction.time],
                ["Transaction Type", selectedTransaction.type],
                ["Learner ID", selectedTransaction.learnerId],
                ["Payment Method", selectedTransaction.paymentMethod],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3"
                >
                  <span className="text-xs text-slate-400">
                    {label}
                  </span>

                  <span className="max-w-[60%] text-right text-xs font-semibold text-slate-700">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                handleDownloadReceipt(selectedTransaction);
                setSelectedTransaction(null);
              }}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#087F79] text-sm font-semibold text-white transition hover:bg-[#066D68]"
            >
              <Download size={17} />
              Download Receipt
            </button>
          </div>
        </div>
      )}

      {/* Process Refund Modal */}
      {refundTransaction && (
        <ProcessRefundModal
          transaction={refundTransaction}
          onClose={() => setRefundTransaction(null)}
          onConfirm={handleConfirmRefund}
        />
      )}
    </section>
  );
}
