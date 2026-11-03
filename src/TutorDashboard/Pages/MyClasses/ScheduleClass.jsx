import React, { useEffect, useState } from "react";
import { api } from "../../../lib/api";
import {
  ArrowLeft,
  ChevronDown,
  CalendarDays,
  Clock3,
  CheckCircle2,
  X,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScheduleClass = ({ onBack, onSave }) => {
const navigate = useNavigate()
  const Back =()=>{
    navigate("/Tutor/class")
  }
  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    date: "",
    startTime: "",
    endTime: "",
    students: "All Students",
    meetingUrl: "",
  });
  const [mySubjects, setMySubjects] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api
      .get("/tutors/me")
      .then((me) => setMySubjects(me.subjects.map((s) => s.subject)))
      .catch(() => {});
  }, []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // Get today's date using local time
  const getTodayDate = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Close alert
  const closeAlert = () => {
    setAlert({
      show: false,
      message: "",
      type: "success",
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove only the changed field's error
    setErrors((prev) => {
      if (!prev[name]) {
        return prev;
      }

      const updatedErrors = { ...prev };
      delete updatedErrors[name];

      return updatedErrors;
    });

    // Hide validation alert when user starts correcting the form
    if (alert.show && alert.type === "error") {
      closeAlert();
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    const subject = String(formData.subject).trim();
    const topic = formData.topic.trim();
    const date = formData.date;
    const startTime = formData.startTime;
    const endTime = formData.endTime;
    const students = formData.students.trim();

    /*
     * SUBJECT
     */
    if (!subject) {
      newErrors.subject = "Please select a subject.";
    }

    /*
     * TOPIC
     */
    if (!topic) {
      newErrors.topic = "Please enter a lesson topic.";
    } else if (topic.length < 3) {
      newErrors.topic = "Lesson topic must be at least 3 characters.";
    } else if (topic.length > 150) {
      newErrors.topic = "Lesson topic cannot exceed 150 characters.";
    }

    /*
     * DATE
     */
    if (!date) {
      newErrors.date = "Please select a class date.";
    } else {
      const today = getTodayDate();

      if (date < today) {
        newErrors.date = "Class date cannot be in the past.";
      }
    }

    /*
     * START TIME
     */
    if (!startTime) {
      newErrors.startTime = "Please select a start time.";
    }

    /*
     * END TIME
     */
    if (!endTime) {
      newErrors.endTime = "Please select an end time.";
    }

    /*
     * TIME ORDER
     */
    if (startTime && endTime && endTime <= startTime) {
      newErrors.endTime = "End time must be later than start time.";
    }

    /*
     * IF CLASS IS TODAY,
     * START TIME MUST BE IN THE FUTURE
     */
    if (
      date === getTodayDate() &&
      startTime &&
      !newErrors.date &&
      !newErrors.startTime
    ) {
      const now = new Date();

      const [hours, minutes] = startTime.split(":").map(Number);

      const selectedStartTime = new Date();

      selectedStartTime.setHours(hours, minutes, 0, 0);

      if (selectedStartTime <= now) {
        newErrors.startTime =
          "Start time must be later than the current time.";
      }
    }

    /*
     * STUDENTS
     */
    if (!students) {
      newErrors.students = "Please select the students for this class.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Validate before starting loader
    const isValid = validateForm();

    if (!isValid) {
      setAlert({
        show: true,
        message: "Please review the highlighted fields and try again.",
        type: "error",
      });

      return;
    }

    try {
      setIsSubmitting(true);

      // Dates are typed in the tutor's own timezone, so build them locally.
      await api.post("/classes", {
        subjectId: Number(formData.subject),
        title: formData.topic.trim(),
        startsAt: new Date(`${formData.date}T${formData.startTime}`).toISOString(),
        endsAt: new Date(`${formData.date}T${formData.endTime}`).toISOString(),
        meetingUrl: formData.meetingUrl.trim() || undefined,
      });
      if (onSave) await onSave(formData);

      setAlert({
        show: true,
        message: "Class scheduled successfully. Your students have been notified.",
        type: "success",
      });
      setTimeout(() => navigate("/tutor/class"), 1200);
    } catch (error) {
      setAlert({
        show: true,
        message: error.message || "Unable to schedule the class. Please try again.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FC] px-4 py-5 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mx-auto flex max-w-[1100px] items-start justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={Back}
            disabled={isSubmitting}
            className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md text-[#64748B] transition hover:bg-white hover:text-[#1E293B] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Go back"
          >
            <ArrowLeft size={17} strokeWidth={2} />
          </button>

          <div>
            <h1 className="text-[15px] font-semibold leading-5 text-[#172033]">
              Schedule Class
            </h1>

            <p className="mt-0.5 text-[10px] leading-4 text-[#8A94A6]">
              Create a new class session for your students.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <main className="mx-auto mt-5 max-w-[1100px]">
        <div className="rounded-[9px] bg-white px-5 py-5 shadow-[0_1px_4px_rgba(15,23,42,0.04)] sm:px-7 sm:py-6">
          {/* Card Heading */}
          <div className="mb-5">
            <h2 className="text-[13px] font-semibold leading-5 text-[#172033]">
              Class Details
            </h2>

            <p className="mt-0.5 text-[10px] leading-4 text-[#8A94A6]">
              Provide the basic information about your class.
            </p>
          </div>

          {/* Alert */}
          {alert.show && (
            <div
              role="alert"
              aria-live="polite"
              className={`mb-5 flex items-center justify-between rounded-[6px] border px-4 py-3 text-[11px] ${
                alert.type === "success"
                  ? "border-[#E1F7ED] bg-[#F1FBF6] text-[#0A733E]"
                  : "border-[#FEE2E2] bg-[#FFF5F5] text-[#DC2626]"
              }`}
            >
              <div className="flex items-center gap-2">
                {alert.type === "success" ? (
                  <CheckCircle2
                    size={15}
                    className="shrink-0"
                    strokeWidth={2}
                  />
                ) : (
                  <AlertCircle size={15} className="shrink-0" strokeWidth={2} />
                )}

                <span className="font-medium">{alert.message}</span>
              </div>

              <button
                type="button"
                onClick={closeAlert}
                className="ml-3 shrink-0 opacity-75 transition hover:opacity-100"
                aria-label="Close alert"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="mb-1.5 block text-[10px] font-semibold text-[#202938]"
              >
                Subject <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? "subject-error" : undefined
                  }
                  className={`h-9 w-full appearance-none rounded-[4px] border bg-white px-3 pr-9 text-[10px] text-[#202938] outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:opacity-70 ${
                    errors.subject
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-[#E4E8EF] focus:border-[#2F6BFF] focus:ring-[#2F6BFF]/10"
                  }`}
                >
                  <option value="">Select a subject</option>
                  {mySubjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A94A6]"
                />
              </div>

              {errors.subject && (
                <p
                  id="subject-error"
                  className="mt-1 text-[9px] font-medium text-red-500"
                >
                  {errors.subject}
                </p>
              )}
            </div>

            {/* Topic */}
            <div>
              <label
                htmlFor="topic"
                className="mb-1.5 block text-[10px] font-semibold text-[#202938]"
              >
                Topic / Lesson Title <span className="text-red-500">*</span>
              </label>

              <input
                id="topic"
                name="topic"
                type="text"
                value={formData.topic}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={150}
                aria-invalid={Boolean(errors.topic)}
                aria-describedby={errors.topic ? "topic-error" : undefined}
                placeholder="Enter lesson topic or title..."
                className={`h-9 w-full rounded-[4px] border bg-white px-3 text-[10px] text-[#202938] outline-none transition placeholder:text-[#A0A8B5] focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:opacity-70 ${
                  errors.topic
                    ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                    : "border-[#E4E8EF] focus:border-[#2F6BFF] focus:ring-[#2F6BFF]/10"
                }`}
              />

              {errors.topic && (
                <p
                  id="topic-error"
                  className="mt-1 text-[9px] font-medium text-red-500"
                >
                  {errors.topic}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="mb-1.5 block text-[10px] font-semibold text-[#202938]"
              >
                Date <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <CalendarDays
                  size={14}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]"
                />

                <input
                  id="date"
                  name="date"
                  type="date"
                  min={getTodayDate()}
                  value={formData.date}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className={`h-9 w-full rounded-[4px] border bg-white pl-9 pr-3 text-[10px] text-[#202938] outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:opacity-70 ${
                    errors.date
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-[#E4E8EF] focus:border-[#2F6BFF] focus:ring-[#2F6BFF]/10"
                  }`}
                />
              </div>

              {errors.date && (
                <p
                  id="date-error"
                  className="mt-1 text-[9px] font-medium text-red-500"
                >
                  {errors.date}
                </p>
              )}
            </div>

            {/* Times */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Start Time */}
              <div>
                <label
                  htmlFor="startTime"
                  className="mb-1.5 block text-[10px] font-semibold text-[#202938]"
                >
                  Start Time <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Clock3
                    size={13}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]"
                  />

                  <input
                    id="startTime"
                    name="startTime"
                    type="time"
                    value={formData.startTime}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.startTime)}
                    aria-describedby={
                      errors.startTime ? "start-time-error" : undefined
                    }
                    className={`h-9 w-full rounded-[4px] border bg-white pl-9 pr-3 text-[10px] text-[#202938] outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:opacity-70 ${
                      errors.startTime
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                        : "border-[#E4E8EF] focus:border-[#2F6BFF] focus:ring-[#2F6BFF]/10"
                    }`}
                  />
                </div>

                {errors.startTime && (
                  <p
                    id="start-time-error"
                    className="mt-1 text-[9px] font-medium text-red-500"
                  >
                    {errors.startTime}
                  </p>
                )}
              </div>

              {/* End Time */}
              <div>
                <label
                  htmlFor="endTime"
                  className="mb-1.5 block text-[10px] font-semibold text-[#202938]"
                >
                  End Time <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <Clock3
                    size={13}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8A94A6]"
                  />

                  <input
                    id="endTime"
                    name="endTime"
                    type="time"
                    value={formData.endTime}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    aria-invalid={Boolean(errors.endTime)}
                    aria-describedby={
                      errors.endTime ? "end-time-error" : undefined
                    }
                    className={`h-9 w-full rounded-[4px] border bg-white pl-9 pr-3 text-[10px] text-[#202938] outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:opacity-70 ${
                      errors.endTime
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                        : "border-[#E4E8EF] focus:border-[#2F6BFF] focus:ring-[#2F6BFF]/10"
                    }`}
                  />
                </div>

                {errors.endTime && (
                  <p
                    id="end-time-error"
                    className="mt-1 text-[9px] font-medium text-red-500"
                  >
                    {errors.endTime}
                  </p>
                )}
              </div>
            </div>

            {/* Meeting link */}
            <div>
              <label htmlFor="meetingUrl" className="mb-1.5 block text-[10px] font-semibold text-[#344054]">
                Meeting link <span className="font-normal text-[#94A3B8]">(optional, e.g. Google Meet or Zoom)</span>
              </label>
              <input
                id="meetingUrl"
                name="meetingUrl"
                type="url"
                value={formData.meetingUrl}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="https://meet.google.com/..."
                className="h-9 w-full rounded-[4px] border border-[#E4E8EF] bg-white px-3 text-[10px] text-[#202938] outline-none transition focus:border-[#2F6BFF] focus:ring-2 focus:ring-[#2F6BFF]/10 disabled:opacity-70"
              />
            </div>

            {/* Students */}
            <div>
              <label
                htmlFor="students"
                className="mb-1.5 block text-[10px] font-semibold text-[#202938]"
              >
                Students <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  id="students"
                  name="students"
                  value={formData.students}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.students)}
                  aria-describedby={
                    errors.students ? "students-error" : undefined
                  }
                  className={`h-9 w-full appearance-none rounded-[4px] border bg-white px-3 pr-9 text-[10px] text-[#202938] outline-none transition focus:ring-2 disabled:cursor-not-allowed disabled:bg-[#F8FAFC] disabled:opacity-70 ${
                    errors.students
                      ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
                      : "border-[#E4E8EF] focus:border-[#2F6BFF] focus:ring-[#2F6BFF]/10"
                  }`}
                >
                  <option value="All Students">All students enrolled in this subject</option>
                </select>

                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#8A94A6]"
                />
              </div>

              {errors.students && (
                <p
                  id="students-error"
                  className="mt-1 text-[9px] font-medium text-red-500"
                >
                  {errors.students}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-[4px] bg-[#2F6BFF] text-[11px] font-semibold text-white shadow-[0_2px_4px_rgba(47,107,255,0.18)] transition hover:bg-[#245CE6] active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-[#2F6BFF]"
            >
              {isSubmitting ? (
                <>
                  <Loader2
                    size={14}
                    strokeWidth={2}
                    className="animate-spin"
                  />
                  Scheduling Class...
                </>
              ) : (
                "Schedule Class"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ScheduleClass;