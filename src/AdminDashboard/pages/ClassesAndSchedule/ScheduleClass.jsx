import React, { useEffect, useState } from "react";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../lib/api";

const select =
  "w-full appearance-none rounded-xl border border-[#cbd5e1] bg-white px-3.5 py-3 text-xs sm:text-sm text-[#334155] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 disabled:bg-[#f1f5f9]";
const input = select.replace("appearance-none ", "");

const today = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Schedules class sessions: POST /classes (one per week when repeating).
export default function ScheduleClassForm({ onBack }) {
  const navigate = useNavigate();

  const [subjects, setSubjects] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loadError, setLoadError] = useState("");

  const [subjectId, setSubjectId] = useState("");
  const [tutorId, setTutorId] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(today());
  const [startTime, setStartTime] = useState("13:00");
  const [endTime, setEndTime] = useState("14:00");
  const [weeks, setWeeks] = useState(1);
  const [meetingUrl, setMeetingUrl] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // GET /subjects
  useEffect(() => {
    api.get("/subjects").then(setSubjects).catch((err) => setLoadError(err.message || "Could not load subjects."));
  }, []);

  // GET /admin/subjects/:id/tutors: approved, active tutors who teach the chosen subject
  useEffect(() => {
    setTutorId("");
    setTutors([]);
    if (!subjectId) return;
    api
      .get(`/admin/subjects/${subjectId}/tutors`)
      .then(setTutors)
      .catch((err) => setLoadError(err.message || "Could not load tutors."));
  }, [subjectId]);

  const tutor = tutors.find((t) => String(t.id) === String(tutorId));

  const handleBack = () => (onBack ? onBack() : navigate(-1));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const starts = new Date(`${date}T${startTime}`);
    const ends = new Date(`${date}T${endTime}`);
    if (ends <= starts) return setError("The end time must be after the start time.");
    if (starts < new Date()) return setError("You can't schedule a class in the past.");

    setIsSubmitting(true);
    const created = [];
    try {
      for (let week = 0; week < weeks; week += 1) {
        const offset = week * 7 * 24 * 60 * 60 * 1000;
        const body = {
          subjectId: Number(subjectId),
          tutorId: Number(tutorId),
          title: title.trim(),
          startsAt: new Date(starts.getTime() + offset).toISOString(),
          endsAt: new Date(ends.getTime() + offset).toISOString(),
          ...(meetingUrl.trim() ? { meetingUrl: meetingUrl.trim() } : {}),
        };
        await api.post("/classes", body);
        created.push(week + 1);
      }
      navigate("/admin/classes");
    } catch (err) {
      setError(
        created.length
          ? `Week ${created.length} of ${weeks} was scheduled, but week ${created.length + 1} failed: ${err.message}`
          : err.message || "Could not schedule the class."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f4f7fb] px-4 py-6 sm:px-8 sm:py-8 font-sans antialiased text-[#1e293b]">
      <div className="w-full">
        {/* Back Link */}
        <button
          type="button"
          onClick={handleBack}
          className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Classes &amp; Schedule</span>
        </button>

        {/* Page Title & Subtitle */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0f172a]">Schedule Class</h1>
          <p className="mt-1 text-xs sm:text-sm text-[#64748b]">
            Schedule a class for a subject. Every student taking the subject is notified.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="w-full rounded-2xl bg-white p-5 sm:p-8 shadow-xs border border-[#e2e8f0]">
            {loadError && <p role="alert" className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{loadError}</p>}

            {/* 1. Select Subject */}
            <div className="space-y-1.5 w-full">
              <label htmlFor="subject" className="block text-xs sm:text-sm font-bold text-[#0f172a]">1. Select Subject</label>
              <p className="text-xs text-[#64748b]">Choose the subject for this class.</p>
              <div className="relative mt-2 w-full">
                <select id="subject" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className={select} required>
                  <option value="" disabled>Select subject</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#64748b]"><ChevronDown className="h-4 w-4" /></div>
              </div>
            </div>

            <hr className="my-6 border-[#f1f5f9]" />

            {/* 2. Assign Tutor */}
            <div className="space-y-1.5 w-full">
              <label htmlFor="tutor" className="block text-xs sm:text-sm font-bold text-[#0f172a]">2. Assign Tutor</label>
              <p className="text-xs text-[#64748b]">Choose the tutor who will deliver the class.</p>
              <div className="relative mt-2 w-full">
                <select id="tutor" value={tutorId} onChange={(e) => setTutorId(e.target.value)} className={select} required disabled={!subjectId}>
                  <option value="" disabled>{subjectId ? (tutors.length ? "Select tutor" : "No approved tutors teach this subject") : "Choose a subject first"}</option>
                  {tutors.map((t) => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#64748b]"><ChevronDown className="h-4 w-4" /></div>
              </div>
              {tutor && (
                <p className="text-xs text-[#64748b] pt-1">Available: {tutor.days} · {tutor.time}</p>
              )}
            </div>

            <hr className="my-6 border-[#f1f5f9]" />

            {/* 3. Class title */}
            <div className="space-y-1.5 w-full">
              <label htmlFor="title" className="block text-xs sm:text-sm font-bold text-[#0f172a]">3. Class Title</label>
              <p className="text-xs text-[#64748b]">What students will see, for example "Fractions: Week 1".</p>
              <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} minLength={2} maxLength={200} required className={`${input} mt-2`} />
            </div>

            <hr className="my-6 border-[#f1f5f9]" />

            {/* 4. Date and time */}
            <div className="space-y-3 w-full">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-[#0f172a]">4. Set Date &amp; Time</label>
                <p className="text-xs text-[#64748b] mt-0.5">Pick when the class starts and ends. A tutor can't have two classes at the same time.</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <label className="text-xs font-semibold text-[#475569]">
                  Date
                  <input type="date" value={date} min={today()} onChange={(e) => setDate(e.target.value)} required className={`${input} mt-1`} />
                </label>
                <label className="text-xs font-semibold text-[#475569]">
                  Starts
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required className={`${input} mt-1`} />
                </label>
                <label className="text-xs font-semibold text-[#475569]">
                  Ends
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required className={`${input} mt-1`} />
                </label>
              </div>

              <label className="block text-xs font-semibold text-[#475569] sm:max-w-xs">
                Repeat weekly
                <div className="relative mt-1">
                  <select value={weeks} onChange={(e) => setWeeks(Number(e.target.value))} className={select}>
                    <option value={1}>Just this once</option>
                    {[2, 3, 4, 6, 8, 12].map((n) => (
                      <option key={n} value={n}>For {n} weeks</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#64748b]"><ChevronDown className="h-4 w-4" /></div>
                </div>
              </label>

              <label className="block text-xs font-semibold text-[#475569]">
                Meeting link (optional)
                <input type="url" value={meetingUrl} onChange={(e) => setMeetingUrl(e.target.value)} placeholder="https://" className={`${input} mt-1`} />
              </label>
            </div>
          </div>

          {error && <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          {/* Action Button Footer */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-xl bg-[#2563eb] px-6 py-3 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? "Scheduling..." : weeks > 1 ? `Schedule ${weeks} Classes` : "Schedule Class"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
