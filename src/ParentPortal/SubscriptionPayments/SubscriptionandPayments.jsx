
import React from "react";
import { CreditCard, ReceiptText } from "lucide-react";

export default function SubscriptionPayments({
  onBillingClick,
  onPaymentHistoryClick,
}) {
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
            onClick={onBillingClick}
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
            onClick={onPaymentHistoryClick}
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
    </section>
  );
}
