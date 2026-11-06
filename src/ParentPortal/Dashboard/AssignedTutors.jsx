
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Star, Flag, X } from "lucide-react";
import { api } from "../../lib/api";
import { initials } from "./dashboardData";

// Modal used by both Rate and Report.
function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1 text-gray-400 hover:bg-gray-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Rate: POST /tutors/:id/reviews  (one review per tutor, editable)
function RateForm({ tutor, onClose, onSaved }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!rating) return setError("Please choose a star rating.");
    setSaving(true);
    try {
      await api.post(`/tutors/${tutor.id}/reviews`, {
        rating,
        ...(comment.trim() ? { comment: comment.trim() } : {}),
      });
      setDone(true);
      onSaved();
    } catch (err) {
      setError(err.message || "Could not save your rating.");
    } finally {
      setSaving(false);
    }
  };

  if (done) {
    return (
      <>
        <p className="text-sm text-emerald-600">Thank you. Your rating for {tutor.name} has been saved.</p>
        <button type="button" onClick={onClose} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white">Done</button>
      </>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-sm text-gray-500">How would you rate {tutor.name}?</p>
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} star${n === 1 ? "" : "s"}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => { setRating(n); setError(""); }}
          >
            <Star className={`h-8 w-8 ${(hover || rating) >= n ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
          </button>
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        maxLength={2000}
        rows={4}
        placeholder="Add a comment (optional)"
        className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-indigo-400"
      />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={saving} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
        {saving ? "Saving…" : "Submit rating"}
      </button>
    </form>
  );
}

// Report: sent to the admin team as a message (same way Settings → Support works).
function ReportForm({ tutor, onClose }) {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (text.trim().length < 10) return setError("Please describe the problem in a few words.");
    setSending(true);
    try {
      const people = await api.get("/messages/contacts");
      const admin = people.find((p) => p.role === "ADMIN");
      if (!admin) throw new Error("The support team isn't available right now. Please try again later.");
      await api.post("/messages", {
        recipientId: admin.id,
        body: `Tutor report: ${tutor.name} (tutor ID ${tutor.id})\n\n${text.trim()}`,
      });
      setDone(true);
    } catch (err) {
      setError(err.message || "Could not send your report.");
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <>
        <p className="text-sm text-emerald-600">Your report has been sent to the admin team.</p>
        <button type="button" onClick={onClose} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white">Done</button>
      </>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <p className="text-sm text-gray-500">Tell us what went wrong with {tutor.name}. Only the admin team will see this.</p>
      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setError(""); }}
        maxLength={2000}
        rows={5}
        placeholder="Describe the problem"
        className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-red-400"
      />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={sending} className="w-full rounded-lg bg-red-500 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
        {sending ? "Sending…" : "Send report"}
      </button>
    </form>
  );
}

export default function AssignedTutor({ data }) {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState(null); // { type: "rate" | "report", tutor }
  const [fresh, setFresh] = useState({}); // tutorId -> { average, count } after a new rating

  // After saving a rating, pull the tutor's new average so the card updates.
  const refreshRating = async (tutorId) => {
    try {
      const res = await api.get(`/tutors/${tutorId}/reviews`);
      setFresh((f) => ({ ...f, [tutorId]: { average: res.stats.average, count: res.stats.count } }));
    } catch {
      /* the saved rating still counts; the card updates on next load */
    }
  };

  const tutorsData = (data?.tutors ?? []).map((tutor) => ({
    id: tutor.id,
    name: tutor.name,
    role: `${tutor.subjects.join(", ")} Tutor`,
    rating: fresh[tutor.id] ? fresh[tutor.id].average : tutor.rating, // null until a parent has reviewed them
    reviews: (fresh[tutor.id] ? fresh[tutor.id].count : tutor.reviews)
      ? `${fresh[tutor.id] ? fresh[tutor.id].count : tutor.reviews} review${(fresh[tutor.id] ? fresh[tutor.id].count : tutor.reviews) === 1 ? "" : "s"}`
      : "no reviews yet",
    initials: initials(tutor.name),
  }));

  const actions = [
    {
      label: "Message",
      Icon: MessageSquare,
      color: "text-purple-600",
      border: "border-purple-200",
      hover: "hover:bg-purple-50 hover:border-purple-300",
      ring: "focus-visible:ring-purple-500",
    },
    {
      label: "Rate",
      Icon: Star,
      color: "text-amber-500",
      border: "border-amber-200",
      hover: "hover:bg-amber-50 hover:border-amber-300",
      ring: "focus-visible:ring-amber-500",
    },
    {
      label: "Report",
      Icon: Flag,
      color: "text-red-500",
      border: "border-red-200",
      hover: "hover:bg-red-50 hover:border-red-300",
      ring: "focus-visible:ring-red-500",
    },
  ];

  return (
    <section className="box-border mb-5 lg:mb-1 w-full min-w-0 max-w-none rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
        <h2 className="text-base font-bold text-gray-900 sm:text-lg">
          Assigned Tutors
        </h2>

        <span className="shrink-0 rounded-full bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 sm:text-sm">
          {tutorsData.length} tutors
        </span>
      </div>

      {tutorsData.length === 0 && (
        <p className="text-sm text-gray-400">
          No tutors are teaching your child's subjects yet.
        </p>
      )}

      {/* TUTOR CARDS */}
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {tutorsData.map((tutor) => (
          <article
            key={tutor.id}
            className="box-border flex min-h-[170px] w-full min-w-0 flex-col justify-between rounded-xl border border-gray-200 bg-white p-3 transition-shadow duration-200 hover:shadow-md sm:min-h-[180px] sm:p-4 lg:p-5"
          >
            {/* TUTOR INFORMATION */}
            <div className="flex min-w-0 items-center gap-3">
              <div
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700 ring-2 ring-gray-100 sm:h-12 sm:w-12"
              >
                {tutor.initials}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-bold leading-5 text-gray-900 sm:text-base">
                  {tutor.name}
                </h3>

                <p className="mt-0.5 truncate text-xs text-gray-500 sm:text-sm">
                  {tutor.role}
                </p>

                {/* RATING */}
                <div className="mt-1.5 flex min-w-0 flex-wrap items-center gap-1.5">
                  <Star
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400"
                    strokeWidth={2}
                  />

                  <span className="text-xs font-semibold text-gray-800">
                    {tutor.rating === null ? "New" : tutor.rating.toFixed(1)}
                  </span>

                  <span className="text-[10px] text-gray-400 sm:text-xs">
                    ({tutor.reviews})
                  </span>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {actions.map(({ label, Icon, color, border, hover, ring }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (label === "Message") navigate("/parent/messages");
                    else setDialog({ type: label === "Rate" ? "rate" : "report", tutor });
                  }}
                  aria-label={`${label} ${tutor.name}`}
                  className={`flex min-h-[48px] min-w-0 items-center justify-center gap-1.5 rounded-lg border ${border} px-1.5 py-2 ${color} ${hover} transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 ${ring} sm:gap-2 sm:px-2`}
                >
                  <Icon
                    aria-hidden="true"
                    className={`h-4 w-4 shrink-0 ${
                      label === "Rate" ? "fill-amber-100" : ""
                    }`}
                    strokeWidth={2}
                  />

                  <span className="text-[10px] font-semibold leading-none sm:text-xs">
                    {label}
                  </span>
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>

      {dialog?.type === "rate" && (
        <Modal title={`Rate ${dialog.tutor.name}`} onClose={() => setDialog(null)}>
          <RateForm tutor={dialog.tutor} onClose={() => setDialog(null)} onSaved={() => refreshRating(dialog.tutor.id)} />
        </Modal>
      )}
      {dialog?.type === "report" && (
        <Modal title={`Report ${dialog.tutor.name}`} onClose={() => setDialog(null)}>
          <ReportForm tutor={dialog.tutor} onClose={() => setDialog(null)} />
        </Modal>
      )}
    </section>
  );
}
