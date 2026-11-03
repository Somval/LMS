
import React, { useState } from "react";
import { Bell } from "lucide-react";

// NOTIFICATION SETTINGS DATA
const notificationSettings = [
  {
    emailNotifications: true,
    inAppNotifications: true,
    smsNotifications: true,
  },
];

export default function Notifications() {
  const settings = notificationSettings[0];

  const [emailNotifications, setEmailNotifications] = useState(
    settings.emailNotifications
  );

  const [inAppNotifications, setInAppNotifications] = useState(
    settings.inAppNotifications
  );

  const [smsNotifications, setSmsNotifications] = useState(
    settings.smsNotifications
  );

  // REUSABLE TOGGLE SWITCH
  const ToggleSwitch = ({ enabled, onToggle, label }) => (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onToggle(!enabled)}
      className={`relative flex h-[23px] w-[37px] shrink-0 items-center rounded-full transition-colors duration-200 ${
        enabled ? "bg-[#087333]" : "bg-[#C8CDD5]"
      }`}
    >
      <span
        className={`absolute h-[13px] w-[13px] rounded-full bg-white shadow-sm transition-all duration-200 ${
          enabled ? "left-[20px]" : "left-[4px]"
        }`}
      />
    </button>
  );

  // REUSABLE NOTIFICATION ROW
  const NotificationItem = ({
    title,
    description,
    enabled,
    onToggle,
    label,
    border = true,
  }) => (
    <div
      className={`flex min-w-0 items-center justify-between gap-4 py-[17px] ${
        border ? "border-b border-[#EEEEEE]" : ""
      }`}
    >
      <div className="min-w-0">
        <h3 className="text-[13px] font-semibold leading-[18px] text-[#171717]">
          {title}
        </h3>

        <p className="mt-[2px] text-[11px] font-normal leading-[16px] text-[#788391]">
          {description}
        </p>
      </div>

      <ToggleSwitch
        enabled={enabled}
        onToggle={onToggle}
        label={label}
      />
    </div>
  );

  return (
    <section className="w-full">

      {/* NOTIFICATIONS CARD */}
      <div className="min-h-[226px] w-full max-w-[1093px] rounded-[10px] border border-[#F0F1F4] bg-white p-4 sm:p-5">

        <div className="grid h-full grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">

          {/* LEFT SECTION */}
          <div className="flex items-start gap-4 border-b border-[#F0F1F4] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">

            {/* NOTIFICATION ICON */}
            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#E0F4E6]">

              <Bell
                size={20}
                strokeWidth={1.7}
                className="text-[#17652F]"
              />

            </div>

            {/* TITLE AND DESCRIPTION */}
            <div className="min-w-0 pt-[1px]">

              <h2 className="text-[16px] font-semibold leading-[21px] tracking-[-0.2px] text-[#111111]">
                Notifications
              </h2>

              <p className="mt-[2px] max-w-[190px] text-[11px] font-normal leading-[15px] text-[#788391]">
                Choose how notifications are sent and what you want to receive.
              </p>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="min-w-0 lg:pl-[15px] lg:pt-[1px]">

            {/* EMAIL NOTIFICATIONS */}
            <NotificationItem
              title="Email notifications"
              description="Receive important updates via email."
              enabled={emailNotifications}
              onToggle={setEmailNotifications}
              label="Email notifications"
            />

            {/* IN-APP NOTIFICATIONS */}
            <NotificationItem
              title="In-app notifications"
              description="Show notifications in the platform."
              enabled={inAppNotifications}
              onToggle={setInAppNotifications}
              label="In-app notifications"
            />

            {/* SMS NOTIFICATIONS */}
            <NotificationItem
              title="SMS notifications"
              description="Receive SMS for critical updates."
              enabled={smsNotifications}
              onToggle={setSmsNotifications}
              label="SMS notifications"
              border={false}
            />

          </div>

        </div>
      </div>

    </section>
  );
}
