import React, { useState } from "react";
import RevenuePayments from "../../components/Admincomponent/RevenueAndPayments";
import RevenueAnalytics from "../../components/Admincomponent/RevenueAnalytics";
import PaymentTransactions from "../../components/Admincomponent/PaymentTransactions";
// Your existing backend page: confirm / reject bank transfers.
import Payments from "../pages/Payments/Payments";
import { defaultRange, useRevenueSummary } from "../hooks/useAdminPayments";

export default function RevenuePayment() {
  // One date range drives the cards, charts, table and export.
  const [range, setRange] = useState(defaultRange);
  // Bumped whenever a payment is confirmed, rejected or refunded so every section reloads.
  const [version, setVersion] = useState(0);
  const refresh = () => setVersion((v) => v + 1);

  const { summary, loading, error } = useRevenueSummary(range, version);

  return (
    <div>
      <RevenuePayments
        range={range}
        onRangeChange={setRange}
        summary={summary}
        loading={loading}
        error={error}
      />
      <RevenueAnalytics summary={summary} loading={loading} />
      <PaymentTransactions range={range} version={version} onChanged={refresh} />
      <div className="p-4 sm:p-5">
        <Payments onChanged={refresh} />
      </div>
    </div>
  );
}
