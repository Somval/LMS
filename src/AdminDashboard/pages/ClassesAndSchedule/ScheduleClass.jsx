import React, { useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DAYS = [
  { id: "mon", label: "Mon" },
  { id: "tue", label: "Tue" },
  { id: "wed", label: "Wed" },
  { id: "thu", label: "Thu" },
  { id: "fri", label: "Fri" },
  { id: "sat", label: "Sat" },
];

const TIME_SLOTS = [
  { id: "12:00", label: "12:00 PM – 1:00 PM", available: false },
  { id: "13:00", label: "1:00 PM – 2:00 PM", available: true },
  { id: "14:00", label: "2:00 PM – 3:00 PM", available: true },
  { id: "15:00", label: "3:00 PM – 4:00 PM", available: true },
  { id: "16:00", label: "4:00 PM – 5:00 PM", available: false },
];

export default function ScheduleClassForm({
  students = ["John Doe", "Jane Smith", "Ogungbe Oluwatosin"],
  subjects = ["Mathematics - Year 1", "English - Year 2", "Science - Year 3"],
  tutors = ["Dr. Alabi", "Mr. Johnson", "Ms. Sarah"],
  onBack,
  onSchedule,
}) {
  const navigate = useNavigate();

  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || "");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [selectedDays, setSelectedDays] = useState(["Mon", "Tue", "Wed", "Thu"]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("1:00 PM – 2:00 PM");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    navigate(-1);
  };

  const toggleDay = (dayLabel) => {
    setSelectedDays((prev) =>
      prev.includes(dayLabel)
        ? prev.filter((d) => d !== dayLabel)
        : [...prev, dayLabel]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      student: selectedStudent,
      subject: selectedSubject,
      tutor: selectedTutor,
      days: selectedDays,
      timeSlot: selectedTimeSlot,
    };

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSchedule) {
        onSchedule(payload);
      } else {
        alert("Class scheduled successfully!");
      }
    }, 500);
  };

  return (
    <main className="min-h-screen w-full bg-[#f4f7fb] px-4 py-6 sm:px-8 sm:py-8 font-sans antialiased text-[#1e293b]">
      <div className="w-full">
        {/* Back Link */}
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer focus:outline-none"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Classes &amp; Schedule</span>
        </button>

        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">
            Schedule Class
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
            Assign a recurring class schedule for a student or group.
          </p>
        </div>

        {/* Full Width Form Card Container */}
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="w-full rounded-2xl bg-white p-5 sm:p-8 shadow-xs border border-[#e2e8f0]">
            
            {/* 1. Select Student */}
            <div className="space-y-1.5 w-full">
              <label className="block text-xs sm:text-sm font-bold text-[#0f172a]">
                1. Select Student
              </label>
              <p className="text-xs text-[#64748b]">
                Choose the student who will attend this class.
              </p>
              <div className="relative mt-2 w-full">
                <select
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-3 text-xs sm:text-sm text-[#334155] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Select student
                  </option>
                  {students.map((student) => (
                    <option key={student} value={student}>
                      {student}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#64748b]">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <hr className="my-6 border-[#f1f5f9]" />

            {/* 2. Select Subject */}
            <div className="space-y-1.5 w-full">
              <label className="block text-xs sm:text-sm font-bold text-[#0f172a]">
                2. Select Subject
              </label>
              <p className="text-xs text-[#64748b]">
                Choose the subject for this class.
              </p>
              <div className="relative mt-2 w-full">
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-3 text-xs sm:text-sm text-[#334155] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 cursor-pointer"
                  required
                >
                  {subjects.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#64748b]">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <hr className="my-6 border-[#f1f5f9]" />

            {/* 3. Assign Tutor */}
            <div className="space-y-1.5 w-full">
              <label className="block text-xs sm:text-sm font-bold text-[#0f172a]">
                3. Assign Tutor
              </label>
              <p className="text-xs text-[#64748b]">
                Choose the tutor who will deliver the class.
              </p>
              <div className="relative mt-2 w-full">
                <select
                  value={selectedTutor}
                  onChange={(e) => setSelectedTutor(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-3 text-xs sm:text-sm text-[#334155] outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 cursor-pointer"
                  required
                >
                  <option value="" disabled>
                    Select tutor
                  </option>
                  {tutors.map((tutor) => (
                    <option key={tutor} value={tutor}>
                      {tutor}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#64748b]">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            <hr className="my-6 border-[#f1f5f9]" />

            {/* 4. Set Class Schedule */}
            <div className="space-y-3 w-full">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#0f172a]">
                  4. Set Class Schedule
                </label>
                <p className="text-xs text-[#64748b] mt-0.5">
                  Choose a day from the student’s preferred days.
                </p>
              </div>

              {/* Day Selector Buttons */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {DAYS.map((day) => {
                  const isSelected = selectedDays.includes(day.label);
                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => toggleDay(day.label)}
                      className={`min-w-[64px] rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#2563eb] bg-white text-[#2563eb] shadow-2xs ring-2 ring-[#2563eb]/10"
                          : "border-[#cbd5e1] bg-white text-[#475569] hover:bg-[#f8fafc]"
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Helper Text */}
              <p className="text-[11px] sm:text-xs text-[#64748b] pt-2">
                Available time slots for the tutor on the day(s) you selected (within the student’s preferred time).
              </p>

              {/* Time Slot Chips */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {TIME_SLOTS.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.label;
                  return (
                    <button
                      key={slot.id}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedTimeSlot(slot.label)}
                      className={`rounded-xl border px-4 py-2.5 text-xs font-semibold transition-all ${
                        !slot.available
                          ? "border-[#e2e8f0] bg-[#f1f5f9] text-[#94a3b8] cursor-not-allowed"
                          : isSelected
                          ? "border-[#0f172a] bg-white text-[#0f172a] ring-2 ring-[#0f172a]/10 cursor-pointer shadow-2xs"
                          : "border-[#cbd5e1] bg-white text-[#334155] hover:bg-[#f8fafc] cursor-pointer"
                      }`}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Action Button Footer */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-[#1d4ed8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Scheduling..." : "Schedule Class"}
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}