import { dayLabel } from "./classFormat";

const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (iso) =>
  new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

// Maximum score: quiz = sum of question points (sent by the API), assignment = 100.
export const maxScore = (w) => (w.type === "QUIZ" ? w.totalPoints || 0 : 100);

// One row of the "To do" list.
export const toTodo = (w) => {
  const done = !!w.submission;
  const assigned = dayLabel(w.createdAt);
  return {
    id: w.id,
    type: done ? "completed" : w.type === "QUIZ" ? "quiz" : "assignment",
    date: assigned.date,
    dateSub: assigned.day,
    subject: w.subject?.name ?? "General",
    task: w.title,
    taskType: w.type === "QUIZ" ? "Quiz" : "Assignment",
    due: w.dueAt ? fmtDate(w.dueAt) : "No deadline",
    dueTime: w.dueAt ? fmtTime(w.dueAt) : "",
    status: done ? (w.submission.gradedAt ? "Completed" : "Submitted") : w.status === "OVERDUE" ? "Overdue" : "Pending",
    action: done ? "View Result" : w.status === "OVERDUE" ? "View" : w.type === "QUIZ" ? "Start Quiz" : "View Assignment",
  };
};

// One row of the "Completed" list.
export const toCompleted = (w) => ({
  id: w.id,
  submitted: fmtDate(w.submission.submittedAt),
  submittedTime: fmtTime(w.submission.submittedAt),
  subject: w.subject?.name ?? "General",
  task: w.title,
  type: w.type === "QUIZ" ? "Quiz" : "Assignment",
  grade: w.submission.gradedAt ? `${w.submission.score}/${maxScore(w)}` : "Awaiting grade",
  action: w.submission.gradedAt ? "View Feedback" : "View Submission",
});
