
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const DEFAULTS = {
  assignments: true,
  liveClasses: true,
  announcements: true,
  grades: true,
  tutorMessages: true,
  achievements: true,
};

export default function NotificationsSettings() {
  const { user } = useAuth();
  const storageKey = `student-notification-preferences:${user?.id}`;

  // Choices are remembered on this device (the browser's storage).
  const [notifications, setNotifications] = useState(() => {
    try {
      return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
    } catch {
      return DEFAULTS;
    }
  });

  const notificationItems = [
    {
      key: "assignments",
      title: "Assignment & Quiz updates",
      description:
        "Receive notifications for new assignments and quiz updates",
    },
    {
      key: "liveClasses",
      title: "Live class reminders",
      description: "Get reminded before your live classes start",
    },
    {
      key: "announcements",
      title: "Platform Announcements",
      description: "Important updates from LMS.",
    },
    {
      key: "grades",
      title: "Grades & Feedback",
      description: "When an assignment or quiz has been graded.",
    },
    {
      key: "tutorMessages",
      title: "Tutor Messages",
      description: "Receive notifications when your tutor sends you a message.",
    },
    {
      key: "achievements",
      title: "Achievement & Reward Notifications",
      description: "Get notified when you earn a new achievement or reward.",
    },
  ];

  const handleToggle = (key) => {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // storage unavailable (private mode): the choice just won't be remembered
      }
      return next;
    });
  };

  return (
    <section className="w-full rounded-[6px] border border-[#E5E9F2] bg-white px-3 py-3 sm:px-5">
      {/* Header */}
      <header className="mb-1">
        <h2 className="text-[14px] font-semibold leading-5 text-[#171717]">
          Notifications
        </h2>

        <p className="mt-0.5 text-[11px] leading-4 text-[#7B8493] sm:text-[11.5px]">
          Choose which notifications you want to see. Saved on this device.
        </p>
      </header>

      {/* Notification Settings */}
      <div className="w-full">
        {notificationItems.map((item) => {
          const isEnabled = notifications[item.key];

          return (
            <div
              key={item.key}
              className="flex min-h-[57px] w-full items-center justify-between gap-4 border-b border-[#EDF0F5] py-[10px] last:border-b-0"
            >
              {/* Text */}
              <div className="min-w-0 flex-1">
                <h3 className="text-[12px] font-semibold leading-[17px] text-[#171717]">
                  {item.title}
                </h3>

                <p className="mt-1 text-[10px] leading-[15px] text-[#87909E] sm:text-[10.5px]">
                  {item.description}
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isEnabled}
                aria-label={`Toggle ${item.title}`}
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-[24px] w-[38px] shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#306BFF] focus-visible:ring-offset-2 ${
                  isEnabled ? "bg-[#326BFF]" : "bg-[#D9DEE8]"
                }`}
              >
                <span
                  className={`pointer-events-none absolute left-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-200 ${
                    isEnabled ? "translate-x-[14px]" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
