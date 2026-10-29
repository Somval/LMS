
import React from "react";
import ProfileInformation from "./ProfileInformation";
import LinkedChildrenSection from "./linkedchildren";
import NotificationPreferences from "./NotificationPreferences";
import SecurityAndPreferences from "./Security";
import PrivacyAndSupport from "./PrivacySupport";
import AccountManagement from "./Account";
import SubscriptionPayments from "../SubscriptionPayments/SubscriptionandPayments";

export default function SettingsInitiator() {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      {/* Top Row: Profile & Linked Children */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <ProfileInformation />
        <LinkedChildrenSection />
      </div>

      {/* Second Row: Notifications & Security */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
        <NotificationPreferences />
        <SecurityAndPreferences />
      </div>

      {/* Subscription & Payments */}
      <SubscriptionPayments/>

      {/* Full Width Sections */}
      <PrivacyAndSupport />
      <AccountManagement />
    </div>
  );
}
