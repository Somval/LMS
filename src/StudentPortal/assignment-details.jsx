import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CalendarDays, CheckCircle2, ChevronRight, FileText, Send, XCircle } from "lucide-react";
import { api, openPrivateFile } from "../lib/api";

const fmtDue = (iso) =>
  `${new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}, ${new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`;

export default function AssignmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [work, setWork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Answers: quiz = chosen option index per question, assignment = free text.
  const [choices, setChoices] = useState({});
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      setWork(await api.get(`/coursework/${id}`));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load this task.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const isQuiz = work?.type === "QUIZ";
  const submission = work?.submission ?? null;
  const overdue = !submission && work?.dueAt && new Date(work.dueAt) < new Date();
  const total = isQuiz ? (work.questions ?? []).reduce((n, q) => n + (q.points ?? 1), 0) : 100;

  const submit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");

    let body;
    if (isQuiz) {
      const answers = work.questions.map((_, i) => choices[i]);
      if (answers.some((a) => a === undefined)) return setError("Answer every question before submitting.");
      body = { answers };
    } else {
      if (!text.trim() && !file) return setError("Write your answer or attach a file.");
      body = { answers: text.trim() || undefined };
    }

    setSubmitting(true);
    try {
      if (!isQuiz && file) body.fileUrl = (await api.upload("/uploads/submissions", file)).url;
      await api.post(`/coursework/${id}/submit`, body);
      await load();
    } catch (err) {
      setError(err.message || "Could not submit.");
    } finally {
      setSubmitting(false);
    }
  };

  const pickFile = (f) => {
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) return setError("The file must not exceed 15 MB.");
    setError("");
    setFile(f);
  };

  return (
    <div className="min-h-screen w-full px-3 py-4 sm:px-5 sm:py-6 md:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-[1100px]">
        <div className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)]">
          {/* Header */}
          <div className="px-4 pb-4 pt-4 sm:px-6 sm:pb-5 sm:pt-5 md:px-7 lg:px-8">
            <div className="mb-4 flex items-center gap-1.5 text-[10px] font-medium text-[#2E6DFF] sm:text-xs">
              <span className="cursor-pointer hover:text-blue-700" onClick={() => navigate("/student/assignments")}>Assignments &amp; Quiz</span>
              <ChevronRight className="h-3 w-3 text-[#8B98AA]" />
              <span className="text-[#64748B]">{isQuiz ? "Quiz" : "Assignment"} Details</span>
            </div>

            {loading && <p className="py-6 text-sm text-slate-400">Loading…</p>}
            {work && (
              <div className="min-w-0">
                <h1 className="text-base font-bold tracking-[-0.01em] text-[#111827] sm:text-lg md:text-xl">{work.title}</h1>
                <p className="mt-0.5 text-[10px] font-medium text-[#374151] sm:text-xs">{work.subject?.name}</p>
                <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[9px] text-[#64748B] sm:text-[10px]">
                  <span className="flex items-center gap-1.5"><CalendarDays className="h-3 w-3" />{work.dueAt ? `Due ${fmtDue(work.dueAt)}` : "No deadline"}</span>
                  {isQuiz && <span>{work.questions.length} questions · {total} marks</span>}
                </div>
              </div>
            )}
          </div>

          {error && <p role="alert" className="mx-4 mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 sm:mx-6">{error}</p>}

          {work && (
            <div className="space-y-3 px-3 pb-4 sm:space-y-4 sm:px-5 sm:pb-6 md:px-6 lg:px-7">
              {/* Result banner */}
              {submission && (
                <section className={`rounded-lg px-4 py-3 sm:px-5 sm:py-4 ${submission.gradedAt ? "bg-emerald-50" : "bg-[#FFF7E6]"}`}>
                  <h2 className="text-xs font-bold text-[#1E293B]">
                    {submission.gradedAt ? `Score: ${submission.score}/${total}` : "Submitted. Waiting for your tutor to grade it."}
                  </h2>
                  {submission.feedback && <p className="mt-1 text-xs text-[#475569]"><span className="font-semibold">Feedback:</span> {submission.feedback}</p>}
                </section>
              )}
              {overdue && <p className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-600">The deadline for this task has passed, so it can no longer be submitted.</p>}

              {/* Instructions */}
              {work.instructions && (
                <section className="rounded-lg bg-[#EAF0FF] px-4 py-3 sm:px-5 sm:py-4">
                  <h2 className="text-[10px] font-bold text-[#1E293B] sm:text-xs">Instructions</h2>
                  <p className="mt-1 max-w-4xl whitespace-pre-wrap text-[9px] leading-[1.55] text-[#64748B] sm:text-[10px] md:text-xs">{work.instructions}</p>
                </section>
              )}

              <form onSubmit={submit} className="space-y-3 sm:space-y-4">
                {/* QUIZ */}
                {isQuiz && work.questions.map((q, i) => {
                  const mine = submission ? submission.answers?.[i] : choices[i];
                  const revealed = !!submission?.gradedAt && q.correctIndex !== undefined;
                  return (
                    <section key={q.id ?? i} className="rounded-lg bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <p className="text-xs font-semibold text-[#111827] sm:text-sm">{i + 1}. {q.text}</p>
                        <span className="shrink-0 text-[10px] text-[#64748B]">{q.points ?? 1} mark{(q.points ?? 1) === 1 ? "" : "s"}</span>
                      </div>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const isMine = mine === oi;
                          const isRight = revealed && q.correctIndex === oi;
                          const isWrong = revealed && isMine && q.correctIndex !== oi;
                          return (
                            <label key={oi} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-xs sm:text-sm ${
                              isRight ? "border-emerald-300 bg-emerald-50" : isWrong ? "border-red-300 bg-red-50" : isMine ? "border-[#2E6DFF] bg-[#F5F8FF]" : "border-slate-200 hover:border-slate-300"} ${submission ? "cursor-default" : ""}`}>
                              <input type="radio" name={`q-${i}`} checked={isMine} disabled={!!submission || overdue}
                                onChange={() => setChoices((c) => ({ ...c, [i]: oi }))} className="accent-[#2E6DFF]" />
                              <span className="flex-1">{opt}</span>
                              {isRight && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                              {isWrong && <XCircle className="h-4 w-4 text-red-500" />}
                            </label>
                          );
                        })}
                      </div>
                    </section>
                  );
                })}

                {/* ASSIGNMENT */}
                {!isQuiz && (
                  <section className="rounded-lg bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.04)] sm:p-5">
                    <h2 className="mb-2 text-xs font-bold text-[#1E293B] sm:text-sm">Your answer</h2>
                    {submission ? (
                      <div className="space-y-3">
                        {typeof submission.answers === "string" && <p className="whitespace-pre-wrap text-xs text-[#374151] sm:text-sm">{submission.answers}</p>}
                        {submission.fileUrl && (
                          <button type="button" onClick={() => openPrivateFile(submission.fileUrl).catch((e) => setError(e.message))}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 hover:border-slate-300">
                            <FileText className="h-4 w-4 text-[#2E6DFF]" /> Open your attached file
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={overdue} rows={8} placeholder="Type your answer here…"
                          className="w-full rounded-lg border border-slate-200 p-3 text-xs outline-none focus:border-[#2E6DFF] sm:text-sm" />
                        <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#2E6DFF]">
                          <FileText className="h-4 w-4" />
                          {file ? file.name : "Attach a file (PDF, image, Word or text, up to 15 MB)"}
                          <input type="file" accept=".pdf,.png,.jpg,.jpeg,.txt,.docx" className="sr-only" disabled={overdue} onChange={(e) => pickFile(e.target.files?.[0])} />
                        </label>
                      </div>
                    )}
                  </section>
                )}

                {!submission && !overdue && (
                  <button type="submit" disabled={submitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2E6DFF] px-6 py-3 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60 sm:text-sm">
                    <Send className="h-4 w-4" /> {submitting ? "Submitting…" : isQuiz ? "Submit Quiz" : "Submit Assignment"}
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
