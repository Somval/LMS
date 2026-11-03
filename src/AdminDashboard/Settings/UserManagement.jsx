
import React, { useState } from "react";
import { UsersRound } from "lucide-react";

// USER MANAGEMENT SETTINGS DATA
const userManagementSettings = [
  {
    allowStudentRegistration: true,
    allowParentRegistration: true,
    allowTutorRegistration: true,
  },
];

export default function UserManagement() {
  const settings = userManagementSettings[0];

  const [studentRegistration, setStudentRegistration] = useState(
    settings.allowStudentRegistration
  );

  const [parentRegistration, setParentRegistration] = useState(
    settings.allowParentRegistration
  );

  const [tutorRegistration, setTutorRegistration] = useState(
    settings.allowTutorRegistration
  );

  // REUSABLE TOGGLE SWITCH
  const ToggleSwitch = ({ enabled, onToggle, label }) => (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onToggle(!enabled)}
      className={`relative flex h-[18px] w-[28px] shrink-0 items-center rounded-full transition-colors duration-200 ${
        enabled ? "bg-[#087333]" : "bg-[#C8CDD5]"
      }`}
    >
      <span
        className={`absolute h-[11px] w-[11px] rounded-full bg-white shadow-sm transition-all duration-200 ${
          enabled ? "left-[14px]" : "left-[3px]"
        }`}
      />
    </button>
  );

  // REUSABLE REGISTRATION ITEM
  const RegistrationItem = ({
    title,
    description,
    enabled,
    onToggle,
    label,
    border = false,
  }) => (
    <div
      className={`flex min-w-0 flex-col gap-2 ${
        border
          ? "border-t border-[#F0F1F4] pt-4 lg:border-l lg:border-t-0 lg:py-2 lg:pl-3 lg:pt-0"
          : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">

        <h3 className="min-w-0 text-[11px] font-semibold leading-[15px] text-[#171717]">
          {title}
        </h3>

        <ToggleSwitch
          enabled={enabled}
          onToggle={onToggle}
          label={label}
        />

      </div>

      <p className="max-w-[190px] text-[10px] font-normal leading-[15px] text-[#788391]">
        {description}
      </p>
    </div>
  );

  return (
    <section className="w-full">

      {/* USER MANAGEMENT CARD */}
      <div className="min-h-[119px] w-full max-w-[1093px] rounded-[10px] border border-[#F0F1F4] bg-white p-4 sm:p-5">

        <div className="grid h-full grid-cols-1 lg:grid-cols-[248px_minmax(0,1fr)]">

          {/* LEFT SECTION */}
          <div className="flex items-start gap-4 border-b border-[#F0F1F4] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-4">

            {/* ICON */}
            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#E0F4E6]">

              <UsersRound
                size={20}
                strokeWidth={1.7}
                className="text-[#17652F]"
              />

            </div>

            {/* TITLE AND DESCRIPTION */}
            <div className="min-w-0 pt-[1px]">

              <h2 className="text-[16px] font-semibold leading-[21px] tracking-[-0.2px] text-[#111111]">
                User Management
              </h2>

              <p className="mt-[2px] max-w-[190px] text-[11px] font-normal leading-[15px] text-[#788391]">
                Control who can create accounts on the platform.
              </p>

            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="grid min-w-0 grid-cols-1 gap-4 pt-5 lg:grid-cols-3 lg:gap-0 lg:pl-[15px] lg:pt-[9px]">

            {/* STUDENT REGISTRATION */}
            <RegistrationItem
              title="Allow student registration"
              description="Let new students sign up on the platform."
              enabled={studentRegistration}
              onToggle={setStudentRegistration}
              label="Allow student registration"
            />

            {/* PARENT REGISTRATION */}
            <RegistrationItem
              title="Allow parent registration"
              description="Let parents create accounts on the platform."
              enabled={parentRegistration}
              onToggle={setParentRegistration}
              label="Allow parent registration"
              border
            />

            {/* TUTOR REGISTRATION */}
            <RegistrationItem
              title="Allow tutor registration"
              description="Let new tutors sign up on this platform."
              enabled={tutorRegistration}
              onToggle={setTutorRegistration}
              label="Allow tutor registration"
              border
            />

          </div>

        </div>
      </div>

    </section>
  );
}
