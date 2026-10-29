import React from 'react';
import { CreditCard, ReceiptText, ChevronRight } from 'lucide-react';

export default function SubscriptionPayments() {
  const handleCardClick = (section) => {
    console.log(`Navigating to: ${section}`);
  };

  return (
    <div className="bg-white rounded-2xl mt-10 shadow-sm border border-slate-100 p-6 sm:p-8 w-full max-w-4xl mx-auto">
      
      {/* Section Heading */}
      <h2 className="text-xl font-bold text-slate-900 mb-6">
        Subscription & Payments
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Billing Information Card */}
        <button
          type="button"
          onClick={() => handleCardClick('Billing Information')}
          className="flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-sm transition-all text-left cursor-pointer group outline-none focus:ring-2 focus:ring-blue-100"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50/50 text-blue-600 shrink-0 group-hover:bg-blue-100/50 transition-colors">
              <CreditCard className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                Billing Information
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                View your billing details and next payment date
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
        </button>

        {/* Payment History Card */}
        <button
          type="button"
          onClick={() => handleCardClick('Payment History')}
          className="flex items-center justify-between p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 hover:shadow-sm transition-all text-left cursor-pointer group outline-none focus:ring-2 focus:ring-blue-100"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-50/50 text-blue-600 shrink-0 group-hover:bg-blue-100/50 transition-colors">
              <ReceiptText className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                Payment History
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                View your past payments
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
        </button>

      </div>
    </div>
  );
}