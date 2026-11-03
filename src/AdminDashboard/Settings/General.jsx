
import React from "react";
import { Settings, ChevronDown } from "lucide-react";

// GENERAL SETTINGS DATA
const generalSettings = [
  {
    platformName: "LMS Platform",
    supportEmail: "support@edulearn.com",
    supportPhone: "+234 801 234 5678",
    timezone: "(GMT+01:00) West Africa Time (Lagos)",
    language: "English (Default)",
  },
];

export default function GeneralSettings() {
  const settings = generalSettings[0];

  const inputClass =
    "h-[35px] w-full min-w-0 rounded-[6px] border border-[#DCDCDC] bg-white px-3 text-[11px] font-normal text-[#171717] outline-none transition focus:border-[#A5B4C8]";

  const labelClass =
    "mb-[7px] block text-[11px] font-normal leading-[15px] text-[#788391]";

  return (
    <section className="w-full">

      {/* GENERAL SETTINGS CARD */}
      <div className="min-h-[226px] w-full max-w-[1093px] rounded-[10px] border border-[#F0F1F4] bg-white p-4 sm:p-5">

        <div className="grid h-full grid-cols-1 lg:grid-cols-[264px_minmax(0,1fr)]">

          {/* LEFT SECTION */}
          <div className="flex items-start gap-4 border-b border-[#F0F1F4] pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">

            {/* ICON */}
            <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-[#E0F4E6]">
              <Settings
                size={20}
                strokeWidth={1.8}
                className="text-[#17652F]"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="min-w-0 pt-[1px]">
              <h2 className="text-[16px] font-semibold leading-[21px] text-[#111111]">
                General
              </h2>

              <p className="mt-[2px] max-w-[190px] text-[11px] font-normal leading-[15px] text-[#788391]">
                Basic information and preferences for your platform.
              </p>
            </div>

          </div>

          {/* RIGHT SECTION */}
          <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-5 pt-5 lg:grid-cols-6 lg:pl-[15px] lg:pt-[9px]">

            {/* PLATFORM NAME */}
            <div className="min-w-0 lg:col-span-2">
              <label className={labelClass}>
                Platform Name
              </label>

              <input
                type="text"
                name="platformName"
                defaultValue={settings.platformName}
                className={inputClass}
              />
            </div>

            {/* SUPPORT EMAIL */}
            <div className="min-w-0 lg:col-span-2">
              <label className={labelClass}>
                Support Email
              </label>

              <input
                type="email"
                name="supportEmail"
                defaultValue={settings.supportEmail}
                className={inputClass}
              />
            </div>

            {/* SUPPORT PHONE */}
            <div className="min-w-0 lg:col-span-2">
              <label className={labelClass}>
                Support Phone Number
              </label>

              <input
                type="tel"
                name="supportPhone"
                defaultValue={settings.supportPhone}
                className={inputClass}
              />
            </div>

            {/* TIME ZONE */}
            <div className="relative min-w-0 lg:col-span-3">
              <label className={labelClass}>
                Time Zone
              </label>

              <select
                name="timezone"
                defaultValue={settings.timezone}
                className={`${inputClass} appearance-none pr-9`}
              >
                <option value="(GMT+01:00) West Africa Time (Lagos)">
                  (GMT+01:00) West Africa Time (Lagos)
                </option>

                <option value="(GMT+00:00) Greenwich Mean Time">
                  (GMT+00:00) Greenwich Mean Time
                </option>

                <option value="(GMT+02:00) Central Africa Time">
                  (GMT+02:00) Central Africa Time
                </option>

                <option value="(GMT-05:00) Eastern Time">
                  (GMT-05:00) Eastern Time
                </option>
              </select>

              <ChevronDown
                size={14}
                strokeWidth={1.7}
                className="pointer-events-none absolute right-3 top-[32px] text-[#222222]"
              />
            </div>

            {/* LANGUAGE */}
            <div className="relative min-w-0 lg:col-span-3">
              <label className={labelClass}>
                Language
              </label>

              <select
                name="language"
                defaultValue={settings.language}
                className={`${inputClass} appearance-none pr-9`}
              >
                <option value="English (Default)">
                  English (Default)
                </option>

                <option value="English (UK)">
                  English (UK)
                </option>

                <option value="English (US)">
                  English (US)
                </option>

                <option value="French">
                  French
                </option>
              </select>

              <ChevronDown
                size={14}
                strokeWidth={1.7}
                className="pointer-events-none absolute right-3 top-[32px] text-[#222222]"
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
