import React from "react";
import RevenuePayments from "../../components/Admincomponent/RevenueAndPayments";
import RevenueAnalytics from "../../components/Admincomponent/RevenueAnalytics";
import PaymentTransactions from "../../components/Admincomponent/PaymentTransactions";
// Your existing backend page: confirm / reject bank transfers.
import Payments from "../pages/Payments/Payments";

export default function RevenuePayment() {
  return (
    <div>
      <RevenuePayments />
      <RevenueAnalytics />
      <PaymentTransactions />
      <div className="p-4 sm:p-5">
        <Payments />
      </div>
    </div>
  );
}
