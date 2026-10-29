
import React, { useEffect, useState } from "react";
import { X, Save, UserRound, CalendarDays, Clock } from "lucide-react";

const DAYS = [
  { label: "Monday", short: "Mon" },
  { label: "Tuesday", short: "Tue" },
  { label: "Wednesday", short: "Wed" },
  { label: "Thursday", short: "Thu" },
  { label: "Friday", short: "Fri" },
  { label: "Saturday", short: "Sat" },
  { label: "Sunday", short: "Sun" },
];

export default function EditBasicInformation({
  isOpen,
  onClose,
  tutorInfo,
  availability,
  onSave,
}) {
  const [formInfo, setFormInfo] = useState([]);
  const [formAvailability, setFormAvailability] = useState({
    days: [],
    startTime: "16:00",
    endTime: "20:00",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormInfo(tutorInfo.map((item) => ({ ...item })));
      setFormAvailability({
        ...availability,
        days: [...availability.days],
      });
      setError("");
    }
  }, [isOpen, tutorInfo, availability]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const updateField = (index, value) => {
    setFormInfo((current) =>
      current.map((item, i) =>
        i === index ? { ...item, value } : item
      )
    );
    setError("");
  };

  const toggleDay = (day) => {
    setFormAvailability((current) => ({
      ...current,
      days: current.days.includes(day)
        ? current.days.filter((item) => item !== day)
        : [
            ...current.days,
            day,
          ].sort(
            (a, b) =>
              DAYS.findIndex((item) => item.short === a) -
              DAYS.findIndex((item) => item.short === b)
          ),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (
      !formInfo[0]?.value.trim() ||
      !formInfo[1]?.value.trim() ||
      !formInfo[2]?.value.trim()
    ) {
      setError("Please complete the name, email address, and phone number.");
      return;
    }

    if (
      formAvailability.days.length > 0 &&
      (!formAvailability.startTime ||
        !formAvailability.endTime ||
        formAvailability.startTime >= formAvailability.endTime)
    ) {
      setError("Please select a valid start time and end time.");
      return;
    }

    onSave(
      formInfo.map((item) => ({ ...item })),
      {
        ...formAvailability,
        days: [...formAvailability.days],
      }
    );
  };

  const inputClass =
    "h-11 w-full rounded-lg border border-[#d9dce5] bg-white px-3 text-sm text-[#252638] outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/45 p-3 backdrop-blur-[2px] sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-basic-information-title"
        className="my-auto flex max-h-[94vh] w-full max-w-[650px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-4 sm:px-7 sm:py-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-[#34358b]">
              <UserRound size={21} />
            </div>

            <div className="min-w-0">
              <h2
                id="edit-basic-information-title"
                className="text-lg font-semibold tracking-tight text-gray-900 sm:text-xl"
              >
                Edit Basic Information
              </h2>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Update tutor details and availability.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close edit form"
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="min-h-0 flex-1 overflow-y-auto"
        >
          <div className="space-y-7 px-5 py-5 sm:px-7 sm:py-6">
            {/* Personal Information */}
            <section>
              <div className="mb-4 flex items-center gap-2">
                <UserRound size={17} className="text-[#34358b]" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {formInfo.map((item, index) => (
                  <label
                    key={item.label}
                    className={`block min-w-0 ${
                      index === 4 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span className="mb-1.5 block text-sm font-medium text-gray-700">
                      {item.label}
                      {[0, 1, 2].includes(index) && (
                        <span className="text-red-500"> *</span>
                      )}
                    </span>

                    <input
                      type={index === 1 ? "email" : "text"}
                      value={item.value}
                      required={[0, 1, 2].includes(index)}
                      onChange={(event) =>
                        updateField(index, event.target.value)
                      }
                      placeholder={`Enter ${item.label.toLowerCase()}`}
                      className={inputClass}
                    />
                  </label>
                ))}
              </div>
            </section>

            {/* Teaching Availability */}
            <section className="border-t border-gray-100 pt-6">
              <div className="mb-1 flex items-center gap-2">
                <CalendarDays size={17} className="text-[#34358b]" />
                <h3 className="text-sm font-semibold text-gray-900">
                  Teaching Availability
                </h3>
              </div>

              <p className="mb-4 text-sm text-gray-500">
                Select the days the tutor is available to teach.
              </p>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {DAYS.map((day) => {
                  const selected = formAvailability.days.includes(day.short);

                  return (
                    <label
                      key={day.short}
                      className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                        selected
                          ? "border-emerald-300 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleDay(day.short)}
                        className="h-4 w-4 accent-emerald-600"
                      />
                      <span>{day.label}</span>
                    </label>
                  );
                })}
              </div>

              {formAvailability.days.length > 0 ? (
                <div className="mt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <Clock size={17} className="text-[#34358b]" />
                    <h4 className="text-sm font-semibold text-gray-900">
                      Teaching Hours
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <label>
                      <span className="mb-1.5 block text-sm font-medium text-gray-700">
                        Start Time
                      </span>
                      <input
                        type="time"
                        required
                        value={formAvailability.startTime}
                        onChange={(event) =>
                          setFormAvailability((current) => ({
                            ...current,
                            startTime: event.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </label>

                    <label>
                      <span className="mb-1.5 block text-sm font-medium text-gray-700">
                        End Time
                      </span>
                      <input
                        type="time"
                        required
                        value={formAvailability.endTime}
                        onChange={(event) =>
                          setFormAvailability((current) => ({
                            ...current,
                            endTime: event.target.value,
                          }))
                        }
                        className={inputClass}
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-700">
                  No days selected. The tutor will be marked as unavailable.
                </p>
              )}
            </section>

            {error && (
              <p
                role="alert"
                className="rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600"
              >
                {error}
              </p>
            )}
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 flex shrink-0 flex-col-reverse gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-7">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-lg border border-gray-300 px-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#34358b] px-5 text-sm font-semibold text-white transition hover:bg-[#292a72] focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
            >
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
