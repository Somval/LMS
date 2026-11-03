import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BarChart3, Calendar, Clock, FileText, Paperclip } from "lucide-react";
import { api, openPrivateFile } from "../../lib/api";
import { fullDate, timeAgo } from "../../StudentPortal/classFormat";

const card = "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6";
const input = "h-10 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-blue-500";

function SubmissionRow({ sub, isQuiz, max, onSaved }) {
  const [open, setOpen] = useState(false);
  const [score, setScore] = useState(sub.score ?? "");
  const [feedback, setFeedback] = useState(sub.feedback ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async (e) => {
    e.preventDefault();
    const n = Number(score);
    if (score === "" || !Number.isInteger(n) || n < 0 || n > max) return setError(`Enter a whole score from 0 to ${max}.`);
    setSaving(true);
    setError("");
    try {
      await api.patch(`/coursework/submissions/${sub.id}/grade`, { score: n, feedback: feedback.trim() || undefined });
      await onSaved();
      setOpen(false);
    } catch (err) {
      setError(err.message || "Could not save the grade.");
    } finally {
      setSaving(false);
    }
  };

  const answerText = typeof sub.answers === "string" ? sub.answers : null;

  return (
    <li className="py-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{sub.student.user.fullName}</p>
          <p className="text-xs text-slate-400">{sub.student.learnerId} · submitted {timeAgo(sub.submittedAt)}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${sub.gradedAt ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
            {sub.gradedAt ? `${sub.score}/${max}` : "Needs grading"}
          </span>
          <button type="button" onClick={() => setOpen((o) => !o)} className="text-sm font-semibold text-blue-600 hover:underline">
            {open ? "Close" : sub.gradedAt ? "Review" : "Grade"}
          </button>
        </div>
      </div>

      {open && (
        <form onSubmit={save} className="mt-4 space-y-4 rounded-xl bg-slate-50 p-4">
          {!isQuiz && (
            <div className="space-y-3">
              {answerText && <p className="whitespace-pre-wrap rounded-lg bg-white p-3 text-sm text-slate-700">{answerText}</p>}
              {sub.fileUrl && (
                <button type="button" onClick={() => openPrivateFile(sub.fileUrl).catch((e) => setError(e.message))}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:border-slate-300">
                  <Paperclip className="h-4 w-4 text-blue-600" /> Open attached file
                </button>
              )}
              {!answerText && !sub.fileUrl && <p className="text-sm text-slate-400">No answer content.</p>}
            </div>
          )}
          {isQuiz && <p className="text-sm text-slate-500">Quizzes are marked automatically. You can still adjust the score below.</p>}

          <div className="flex flex-wrap items-end gap-3">
            <label className="text-xs font-semibold text-slate-600">Score (out of {max})
              <input className={`${input} mt-1 block w-28`} inputMode="numeric" value={score} onChange={(e) => { setScore(e.target.value); setError(""); }} />
            </label>
            <label className="min-w-[220px] flex-1 text-xs font-semibold text-slate-600">Feedback for the student
              <input className={`${input} mt-1 block w-full`} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Well done, but check question 3…" />
            </label>
            <button type="submit" disabled={saving} className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
              {saving ? "Saving…" : "Save grade"}
            </button>
          </div>
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        </form>
      )}
    </li>
  );
}

export default function AssessmentDetail() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [subs, setSubs] = useState({ totalPoints: 0, submissions: [] });
  const [students, setStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const [w, s, mine] = await Promise.all([
        api.get(`/coursework/${assessmentId}`),
        api.get(`/coursework/${assessmentId}/submissions`),
        api.get("/tutors/students"),
      ]);
      setWork(w);
      setSubs(s);
      setStudents(mine.filter((st) => st.subjects.some((x) => x.id === w.subjectId)).length);
      setError("");
    } catch (err) {
      setError(err.message || "Could not load this assessment.");
    } finally {
      setLoading(false);
    }
  }, [assessmentId]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <p className="py-10 text-center text-sm text-slate-400">Loading…</p>;
  if (!work) return <p role="alert" className="py-10 text-center text-sm text-red-600">{error || "Not found."}</p>;

  const isQuiz = work.type === "QUIZ";
  const max = isQuiz ? subs.totalPoints : 100;
  const graded = subs.submissions.filter((s) => s.gradedAt);
  const average = graded.length ? Math.round(graded.reduce((n, s) => n + (s.score / max) * 100, 0) / graded.length) : null;

  const details = [
    { label: "Type", value: isQuiz ? "Quiz" : "Assignment", icon: FileText },
    { label: "Subject", value: work.subject?.name ?? "—", icon: Calendar },
    { label: "Deadline", value: work.dueAt ? fullDate(work.dueAt) : "No deadline", icon: Clock },
    { label: "Total marks", value: `${max} marks`, icon: BarChart3 },
    { label: "Status", value: work.published ? "Published" : "Draft", icon: FileText },
    { label: "Created", value: fullDate(work.createdAt), icon: Calendar },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-1 py-4">
      <button type="button" onClick={() => navigate("/tutor/assignment-quize")} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Back to assignments and quizzes
      </button>

      <section className={card}>
        <h1 className="text-xl font-bold text-slate-900">{work.title}</h1>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {details.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-start gap-3">
              <Icon className="mt-0.5 h-4 w-4 text-slate-400" />
              <div><dt className="text-xs font-semibold uppercase text-slate-400">{label}</dt><dd className="text-sm text-slate-800">{value}</dd></div>
            </div>
          ))}
        </dl>
        {work.instructions && <p className="mt-5 whitespace-pre-wrap rounded-xl bg-slate-50 p-4 text-sm text-slate-600">{work.instructions}</p>}
      </section>

      {isQuiz && (
        <section className={card}>
          <h2 className="mb-3 text-base font-bold text-slate-900">Questions</h2>
          <ol className="space-y-4">
            {work.questions.map((q, i) => (
              <li key={q.id ?? i} className="text-sm">
                <p className="font-semibold text-slate-900">{i + 1}. {q.text} <span className="font-normal text-slate-400">({q.points ?? 1} mark{(q.points ?? 1) === 1 ? "" : "s"})</span></p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((o, oi) => (
                    <li key={oi} className={oi === q.correctIndex ? "font-semibold text-emerald-700" : "text-slate-600"}>
                      {String.fromCharCode(65 + oi)}. {o}{oi === q.correctIndex ? "  ✓" : ""}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className={card}>
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900">Submissions</h2>
          <p className="text-sm text-slate-500">
            {subs.submissions.length} of {students} student{students === 1 ? "" : "s"} submitted
            {average != null && ` · class average ${average}%`}
          </p>
        </div>
        {error && <p role="alert" className="mb-2 text-sm text-red-600">{error}</p>}
        {subs.submissions.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">No submissions yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {subs.submissions.map((s) => <SubmissionRow key={s.id} sub={s} isQuiz={isQuiz} max={max} onSaved={load} />)}
          </ul>
        )}
      </section>
    </div>
  );
}
