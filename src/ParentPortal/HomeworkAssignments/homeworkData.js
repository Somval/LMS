// Helpers for the parent's Homework & Assignments page.
// Data comes from GET /coursework?studentId= (list) and GET /coursework/:id?studentId= (one item).

const DAY = 24 * 60 * 60 * 1000;

export const TABS = ["All", "Pending", "Completed", "Overdue"];

// Which statuses each tab shows. "Completed" means handed in (marked or not).
export const tabMatches = (tab, status) => {
  if (tab === "Pending") return status === "PENDING";
  if (tab === "Completed") return status === "SUBMITTED" || status === "GRADED";
  if (tab === "Overdue") return status === "OVERDUE";
  return true;
};

// Work that still needs doing comes first (overdue, then soonest due).
// Work already handed in follows, most recent first.
export const sortWork = (rows) => {
  const isOpen = (row) => row.status === "PENDING" || row.status === "OVERDUE";
  const due = (row) => (row.dueAt ? new Date(row.dueAt).getTime() : null);

  const open = rows
    .filter(isOpen)
    .sort((a, b) => (due(a) ?? Infinity) - (due(b) ?? Infinity));
  const done = rows
    .filter((row) => !isOpen(row))
    .sort((a, b) => (due(b) ?? -Infinity) - (due(a) ?? -Infinity));

  return [...open, ...done];
};

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const formatWeekday = (value) =>
  new Date(value).toLocaleDateString("en-US", { weekday: "short" });

const startOfDay = (value) => {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

// Whole days from today to the due date (negative once it has passed).
export const daysUntil = (dueAt) => Math.round((startOfDay(dueAt) - startOfDay(new Date())) / DAY);

// Highest possible score: a quiz adds up its question points, other work is marked out of 100.
export const maxScore = (work) => (work.type === "QUIZ" ? work.totalPoints || 0 : 100);

export const scorePercent = (score, max) => (max ? Math.round((score / max) * 100) : null);

// The coloured badge for a row.
export const statusBadge = (work) => {
  if (work.status === "OVERDUE") {
    return { label: "Overdue", className: "bg-[#FEE2E2] text-[#DC2626]" };
  }
  if (work.status === "SUBMITTED") {
    return { label: "Submitted", className: "bg-blue-50 text-blue-700" };
  }
  if (work.status === "GRADED") {
    const percent = scorePercent(work.submission?.score ?? 0, maxScore(work));
    return {
      label: percent == null ? "Graded" : `Graded · ${percent}%`,
      className: "bg-emerald-50 text-emerald-700",
    };
  }
  // Pending: only "Due Soon" when the deadline is close.
  if (work.dueAt && daysUntil(work.dueAt) <= 3) {
    return { label: "Due Soon", className: "bg-[#FFEDD5] text-[#C2410C]" };
  }
  return { label: "Pending", className: "bg-slate-100 text-slate-700" };
};

// "Quiz · 5 questions" or the first line of the tutor's instructions.
export const shortDescription = (work) => {
  const firstLine = (work.instructions || "").split("\n").find((line) => line.trim());
  if (firstLine) return firstLine.length > 70 ? `${firstLine.slice(0, 67)}…` : firstLine;
  if (work.type === "QUIZ") {
    const count = work.questionCount ?? work.questions?.length ?? 0;
    return `Quiz · ${count} question${count === 1 ? "" : "s"}`;
  }
  return "Assignment";
};

// "due in 2 days", "due today", "was due 3 days ago"
export const dueText = (dueAt) => {
  if (!dueAt) return "There is no due date for this assignment.";
  const days = daysUntil(dueAt);
  if (days === 0) return "This assignment is due today.";
  if (days === 1) return "This assignment is due tomorrow.";
  if (days > 1) return `This assignment is due in ${days} days.`;
  if (days === -1) return "This assignment was due yesterday.";
  return `This assignment was due ${Math.abs(days)} days ago.`;
};
