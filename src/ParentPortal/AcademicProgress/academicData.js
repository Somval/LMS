// Helpers for the parent's Academic Progress page.
// Everything is worked out from GET /dashboard/parent/:studentId.

export const PERIODS = [
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "year", label: "This Year" },
];

const DAY = 24 * 60 * 60 * 1000;

const startOfDay = (value) => {
  const d = new Date(value);
  d.setHours(0, 0, 0, 0);
  return d;
};

// First day of the chosen period (a week starts on Monday).
export const periodStart = (periodId, now = new Date()) => {
  const today = startOfDay(now);
  if (periodId === "week") {
    return new Date(today.getTime() - ((today.getDay() + 6) % 7) * DAY);
  }
  if (periodId === "month") return new Date(now.getFullYear(), now.getMonth(), 1);
  return new Date(now.getFullYear(), 0, 1);
};

const shortDate = (date) =>
  date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

// Share of lessons completed by a moment in time, as a whole percentage.
const progressAt = (times, total, moment) =>
  total
    ? Math.min(100, Math.round((times.filter((t) => t <= moment).length / total) * 100))
    : 0;

const toTimes = (dates = []) =>
  dates.map((value) => new Date(value).getTime()).sort((a, b) => a - b);

// Points for the Learning Progress chart across the chosen period,
// plus how many percentage points progress moved in that period.
export const progressSeries = (dates, total, periodId, now = new Date(), points = 8) => {
  const times = toTimes(dates);
  const start = periodStart(periodId, now).getTime();
  const end = now.getTime();
  const span = Math.max(end - start, 0);

  const series = Array.from({ length: points }, (_, index) => {
    const moment = start + (span * index) / (points - 1);
    return { label: shortDate(new Date(moment)), progress: progressAt(times, total, moment) };
  });

  const before = progressAt(times, total, start - 1);
  const after = progressAt(times, total, end);
  return { series, change: after - before, current: after };
};

// Progress now compared with 30 days ago (used on each subject's card).
export const monthlyChange = (dates, total, now = new Date()) => {
  const times = toTimes(dates);
  const after = progressAt(times, total, now.getTime());
  const before = progressAt(times, total, now.getTime() - 30 * DAY);
  return { after, before, change: after - before };
};

// How a subject is going: from its graded work if there is any, otherwise from lessons completed.
export const statusOf = (subject) => {
  if (subject.averageScore != null) {
    if (subject.averageScore >= 85) return "Ahead";
    if (subject.averageScore >= 65) return "On Track";
    return "Improving";
  }
  return subject.lessonProgress > 0 ? "On Track" : "Not Started";
};

export const STATUS_DOT = {
  Ahead: "bg-emerald-500",
  "On Track": "bg-emerald-500",
  Improving: "bg-rose-500",
  "Not Started": "bg-slate-300",
};

export const STATUS_HEADLINE = {
  Ahead: "Excellent progress",
  "On Track": "Good progress",
  Improving: "Needs more practice",
  "Not Started": "Not started yet",
};

export const statusDescription = (status, name, subject) =>
  ({
    Ahead: `${name} is ahead in ${subject}.`,
    "On Track": `${name} is on track in ${subject}.`,
    Improving: `${name} would benefit from more practice in ${subject}.`,
    "Not Started": `${name} hasn't started ${subject} yet.`,
  })[status];

// Graded work split into "going well" (70% and over) and "needs practice" (under 70%).
// One entry per title, using the most recent result.
export const splitAssessments = (assessments = []) => {
  const seen = new Set();
  const latest = assessments.filter((item) => {
    if (seen.has(item.title)) return false;
    seen.add(item.title);
    return true;
  });
  return {
    goingWell: latest
      .filter((item) => item.percent >= 70)
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 4),
    needsPractice: latest
      .filter((item) => item.percent < 70)
      .sort((a, b) => a.percent - b.percent)
      .slice(0, 4),
  };
};

// Colours for the subject cards, repeated if there are more subjects than colours.
export const SUBJECT_COLORS = [
  { bg: "bg-[#3730A3]", selected: "bg-purple-50/70 border border-purple-200/80" },
  { bg: "bg-amber-400", selected: "bg-amber-50/60 border border-amber-200/80" },
  { bg: "bg-emerald-500", selected: "bg-emerald-50/60 border border-emerald-200/80" },
  { bg: "bg-sky-500", selected: "bg-sky-50/60 border border-sky-200/80" },
  { bg: "bg-rose-500", selected: "bg-rose-50/60 border border-rose-200/80" },
  { bg: "bg-teal-500", selected: "bg-teal-50/60 border border-teal-200/80" },
];

// A short summary of how the child is doing, written from their own numbers.
export const buildInsight = (firstName, data) => {
  const subjects = data.subjects;
  const worked = subjects.filter((s) => s.lessonProgress > 0 || s.averageScore != null);

  if (worked.length === 0) {
    return {
      text: `${firstName} hasn't completed any lessons or graded work yet. Insights will appear here once learning begins.`,
      focus: subjects[0] ?? null,
    };
  }

  const score = (s) => s.averageScore ?? s.lessonProgress;
  const best = [...worked].sort((a, b) => score(b) - score(a))[0];
  const weakest = [...worked].sort((a, b) => score(a) - score(b))[0];

  const parts = [
    best.averageScore != null
      ? `${firstName} is doing best in ${best.subject}, with an average score of ${best.averageScore}%.`
      : `${firstName} has made the most progress in ${best.subject}, with ${best.lessonProgress}% of its lessons completed.`,
  ];

  if (weakest.subjectId !== best.subjectId && score(weakest) < 65) {
    parts.push(
      `A little more practice in ${weakest.subject} will help ${firstName} keep improving.`
    );
  }

  const pending = data.overall.pendingCoursework;
  if (pending > 0) {
    parts.push(
      `${pending} piece${pending === 1 ? "" : "s"} of coursework ${pending === 1 ? "is" : "are"} still waiting to be handed in.`
    );
  }

  return {
    text: parts.join(" "),
    focus: weakest.subjectId !== best.subjectId && score(weakest) < 65 ? weakest : best,
  };
};
