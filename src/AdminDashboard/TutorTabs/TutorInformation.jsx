
import React, { useState } from "react";
import { Pencil, Check, X } from "lucide-react";
import EditBasicInformation from "../../components/Admincomponent/EditBasicInformation";
import SubjectsLevelsTaught from "../pages/Tutor/SubjectsLevelsTaught";

const initialTutorInfo = [
  { label: "Full Name", value: "Sarah Johnson" },
  { label: "Email Address", value: "sarah.j@email.com" },
  { label: "Phone Number", value: "+44 7700 123456" },
  { label: "Date Joined", value: "12 Mar 2024" },
  { label: "Years of Teaching Experience", value: "5 years" },
];

const initialAvailability = {
  days: ["Mon", "Tue", "Wed", "Fri"],
  startTime: "16:00",
  endTime: "20:00",
};

const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatTime(time) {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  const hour = Number(hours);

  return `${hour % 12 || 12}:${minutes} ${hour >= 12 ? "PM" : "AM"}`;
}

export default function BasicInformation() {
  const [tutorInfo, setTutorInfo] = useState(initialTutorInfo);
  const [availability, setAvailability] = useState(initialAvailability);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  const handleSave = (updatedInfo, updatedAvailability) => {
    setTutorInfo(updatedInfo);
    setAvailability({
      ...updatedAvailability,
      days: [...updatedAvailability.days].sort(
        (a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b)
      ),
    });
    setIsEditing(false);
    setShowSaved(true);
  };

  return (
    <>
      <section className="w-full min-w-0 rounded-[10px] bg-white p-4 font-sans sm:p-[15px]">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-[#dedfe3] px-1 pb-3 sm:pb-[13px]">
          <h2 className="text-lg font-semibold tracking-[-0.35px] text-[#111111] sm:text-[21px]">
            Basic Information
          </h2>

          <button
            type="button"
            onClick={() => {
              setShowSaved(false);
              setIsEditing(true);
            }}
            className="inline-flex h-[34px] shrink-0 items-center justify-center gap-2 rounded-[4px] border border-[#c9cbd4] bg-white px-3 text-sm font-medium text-[#414252] transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:min-w-[93px]"
          >
            <Pencil size={16} strokeWidth={1.6} />
            <span>Edit</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-5 pt-2 sm:gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-5">
          {/* Personal Information */}
          <div className="min-w-0">
            {tutorInfo.map((item, index) => (
              <div
                key={item.label}
                className={`grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-3 border-b border-[#e0e1e5] px-2 py-[9px] sm:gap-4 sm:px-2 sm:py-[9px] ${
                  index === tutorInfo.length - 1 ? "border-b-0" : ""
                }`}
              >
                <span className="min-w-0 break-words text-sm leading-5 text-[#92929a] sm:text-[17px] sm:leading-[22px]">
                  {item.label}
                </span>
                <span className="min-w-0 break-words text-sm leading-5 text-[#92929a] sm:text-[17px] sm:leading-[22px]">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* Teaching Availability */}
          <div className="min-w-0 border-t border-[#e0e1e5] pt-4 sm:pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-1">
            <h3 className="border-b border-[#dedfe3] px-1 pb-2 text-lg font-semibold leading-6 text-[#111111] sm:text-[20px]">
              Teaching Availability
            </h3>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e0e1e5] px-2 py-[10px]">
              <span className="text-sm leading-5 text-[#92929a] sm:text-[17px]">
                Days Available
              </span>

              <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-[10px]">
                {availability.days.map((day) => (
                  <span
                    key={day}
                    className="inline-flex min-w-[43px] items-center justify-center rounded-[5px] bg-[#d1f8e2] px-2 py-[5px] text-xs font-medium leading-4 text-[#00b94b] sm:min-w-[44px] sm:text-[15px] sm:leading-[17px]"
                  >
                    {day}
                  </span>
                ))}

                {availability.days.length === 0 && (
                  <span className="text-sm text-[#92929a]">
                    No days selected
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-[#e0e1e5] px-2 py-[11px]">
              <span className="text-sm leading-5 text-[#92929a] sm:text-[17px]">
                Teaching Hours
              </span>

              <span className="text-right text-xs leading-5 text-[#92929a] sm:text-[16px]">
                {availability.days.length > 0
                  ? `${formatTime(availability.startTime)} – ${formatTime(
                      availability.endTime
                    )}`
                  : "Not Available"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Separate Edit Component */}
      <EditBasicInformation
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        tutorInfo={tutorInfo}
        availability={availability}
        onSave={handleSave}
      />

      {/* Save Confirmation */}
      {showSaved && (
        <div className="fixed bottom-5 right-5 z-[110] flex max-w-[calc(100%-40px)] items-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
          <Check size={18} className="shrink-0" />
          <span>Information updated successfully</span>
          <button
            type="button"
            onClick={() => setShowSaved(false)}
            aria-label="Dismiss notification"
            className="ml-1 rounded p-1 transition hover:bg-white/15"
          >
            <X size={15} />
          </button>
        </div>
      )}
     
    </>
  );
}
