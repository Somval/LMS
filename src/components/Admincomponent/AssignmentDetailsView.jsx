import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const fmtDateTime = (d) =>
  d
    ? new Date(d).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })
    : "—";

function Card({ title, children }) {
  return (
    <section className="w-full min-w-0 rounded-[10px] bg-white p-4 sm:p-5">
      <h2 className="border-b border-[#E5E7EB] pb-3 text-lg font-semibold text-[#111827]">{title}</h2>
      <div className="pt-3">{children}</div>
    </section>
  );
}

const Meta = ({ label, value }) => (
  <div className="min-w-0">
    <p className="text-xs text-[#6B7280]">{label}</p>
    <p className="mt-0.5 break-words text-sm font-medium text-[#111827]">{value || "—"}</p>
  </div>
);

export default function AssignmentDetailsView({ assignment: a }) {
  const navigate = useNavigate();
  const isQuiz = a.type === "Quiz";
  const submitted = a.submissions.length;

  return (
    <main className="min-h-screen w-full min-w-0 bg-[#F4F7FD] px-4 py-5 font-sans text-[#252B35] sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex w-full max-w-[1600px] min-w-0 flex-col gap-5">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-[#0F172A] hover:opacity-80"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Assignments & Quizzes
        </button>

        <Card title={a.title}>
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-semibold text-[#4F46E5]">{a.type}</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                a.published ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#F3F4F6] text-[#6B7280]"
              }`}
            >
              {a.published ? "Published" : "Draft"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Meta label="Subject" value={a.subject} />
            <Meta label="Tutor" value={a.tutorName} />
            <Meta label="Due" value={a.dueAt ? fmtDateTime(a.dueAt) : "No due date"} />
            <Meta label="Submissions" value={a.expected == null ? String(submitted) : `${submitted}/${a.expected}`} />
          </div>
          {a.instructions && (
            <p className="mt-4 whitespace-pre-wrap rounded-lg bg-[#F9FAFB] p-4 text-sm leading-6 text-[#374151]">
              {a.instructions}
            </p>
          )}
        </Card>

        {isQuiz && (
          <Card title={`Questions (${a.questions.length} · ${a.totalPoints} points)`}>
            {a.questions.length === 0 ? (
              <p className="py-4 text-sm text-[#98A2B3]">This quiz has no questions.</p>
            ) : (
              <ol className="space-y-4">
                {a.questions.map((q, i) => (
                  <li key={q.id ?? i} className="rounded-lg border border-[#E5E7EB] p-4">
                    <p className="text-sm font-semibold text-[#111827]">
                      {i + 1}. {q.text} <span className="font-normal text-[#6B7280]">({q.points ?? 1} pt)</span>
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {q.options.map((opt, j) => (
                        <li
                          key={j}
                          className={`rounded-md px-3 py-1.5 text-sm ${
                            j === q.correctIndex ? "bg-[#DCFCE7] font-medium text-[#166534]" : "bg-[#F9FAFB] text-[#374151]"
                          }`}
                        >
                          {opt}
                          {j === q.correctIndex && " ✓"}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            )}
          </Card>
        )}

        <Card title={`Student submissions (${submitted})`}>
          {submitted === 0 ? (
            <p className="py-4 text-sm text-[#98A2B3]">No submissions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="bg-[#F3F4F6] text-[#4B5563]">
                    <th className="px-3 py-2.5 font-medium">Student</th>
                    <th className="px-3 py-2.5 font-medium">Submitted</th>
                    <th className="px-3 py-2.5 font-medium">Score</th>
                    <th className="px-3 py-2.5 font-medium">Status</th>
                    <th className="px-3 py-2.5 font-medium">Feedback</th>
                  </tr>
                </thead>
                <tbody>
                  {a.submissions.map((s) => {
                    const graded = s.score != null || s.gradedAt;
                    return (
                      <tr key={s.id} className="border-b border-[#EDF0F3] text-[#374151]">
                        <td className="px-3 py-2.5">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/users/students/${s.studentUserId}`)}
                            className="font-medium text-[#111827] hover:underline"
                          >
                            {s.studentName}
                          </button>
                          <span className="ml-2 font-mono text-[10px] text-[#9CA3AF]">{s.learnerId}</span>
                        </td>
                        <td className="px-3 py-2.5">{fmtDateTime(s.submittedAt)}</td>
                        <td className="px-3 py-2.5">
                          {s.score != null ? (isQuiz ? `${s.score}/${a.totalPoints}` : s.score) : "—"}
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              graded ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#FFF0D9] text-[#B96A08]"
                            }`}
                          >
                            {graded ? "Graded" : "Awaiting grading"}
                          </span>
                          {s.hasFile && <span className="ml-2 text-xs text-[#6B7280]">File attached</span>}
                        </td>
                        <td className="max-w-[260px] px-3 py-2.5 text-xs text-[#6B7280]">{s.feedback || "—"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
