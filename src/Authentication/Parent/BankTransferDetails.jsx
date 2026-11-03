
import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function BankTransferDetails({ totalAmount = 0, bank, reference }) {
  const [copiedField, setCopiedField] = useState(null);

  const bankInfo = {
    bankName: bank?.name || "Not set yet",
    accountName: bank?.accountName || "Not set yet",
    accountNumber: bank?.accountNumber || "Not set yet",
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);

      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy account details:", error);
    }
  };

  return (
    <div className="space-y-4 font-sans text-gray-800">
      <div className="border-b border-gray-100 pb-4">
        <h3 className="text-base font-bold text-gray-900">
          Bank Account Information
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          Complete your transfer using the information below.
        </p>
      </div>

      <p className="text-sm leading-relaxed text-gray-600">
        Transfer the exact total amount of{" "}
        <span className="font-bold text-gray-900">
          ₦{Number(totalAmount).toLocaleString()}
        </span>{" "}
        to the account below.
      </p>

      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
          <span className="block text-xs font-medium text-gray-500">
            Bank Name
          </span>

          <span className="mt-1 block font-bold text-gray-900">
            {bankInfo.bankName}
          </span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-3">
          <span className="block text-xs font-medium text-gray-500">
            Account Name
          </span>

          <span className="mt-1 block truncate font-bold text-gray-900">
            {bankInfo.accountName}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3 sm:col-span-2">
          <div className="min-w-0">
            <span className="block text-xs font-medium text-gray-500">
              Account Number
            </span>

            <span className="mt-1 block font-mono font-bold text-gray-900">
              {bankInfo.accountNumber}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              copyToClipboard(bankInfo.accountNumber, "account")
            }
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-white hover:text-blue-600"
            aria-label="Copy account number"
            title="Copy account number"
          >
            {copiedField === "account" ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {reference && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900">
          Use <span className="font-mono font-bold">{reference}</span> as the transfer narration so we can match your payment.
        </div>
      )}
      {copiedField === "account" && (
        <p className="text-xs font-medium text-green-600" role="status">
          Account number copied successfully.
        </p>
      )}
    </div>
  );
}
