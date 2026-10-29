
import React from "react";

import StudentsHeader from "../../../components/Admincomponent/parentheader";
import ParentOverviewCards from "../../../components/Admincomponent/ParentOverviewCards";

import ParentInformation from "./ParentInformation";
import LinkedChildren from "./LinkedChildren";
import SubscriptionPayments from "./SubscriptionPayments";
import RecentActivity from "./RecentActivity";

export default function ParentDetails() {
  return (
    <main className="min-h-screen w-full min-w-0 bg-[#F5F7FD]">
      <div className="flex w-full min-w-0 flex-col gap-4 p-3 sm:gap-5 sm:p-5 lg:gap-6 lg:p-6">
        {/* Parent Profile Header */}
        <section className="w-full min-w-0">
          <StudentsHeader />
        </section>

        {/* Parent Overview Statistics */}
        <section className="w-full min-w-0">
          <ParentOverviewCards />
        </section>

        {/* Parent Information */}
        <section className="w-full min-w-0">
          <ParentInformation />
        </section>

        {/* Linked Children */}
        <section className="w-full min-w-0">
          <LinkedChildren />
        </section>

        {/* Subscription and Payments */}
        <section className="w-full min-w-0">
          <SubscriptionPayments />
        </section>

        {/* Recent Activity */}
        <section className="w-full min-w-0">
          <RecentActivity />
        </section>
      </div>
    </main>
  );
}
