// Helpers for the parent's Progress Reports page.
// Data comes from GET /dashboard/parent/:studentId/reports: one report per calendar month.

const fmt = (value, options) => new Date(value).toLocaleDateString("en-US", options);

export const formatDate = (value) => fmt(value, { month: "short", day: "numeric", year: "numeric" });

export const formatTime = (value) =>
  new Date(value).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });

// "2026-11" -> "November 2026"
export const monthTitle = (report) => {
  const [year, month] = report.month.split("-").map(Number);
  return new Date(year, month - 1, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
};

// "Nov 1–Nov 30, 2026"
export const periodText = (report) =>
  `${fmt(report.start, { month: "short", day: "numeric" })}–${formatDate(report.end)}`;

// A finished month is dated its last day; the month in progress is dated today.
export const reportDate = (report, generatedAt) => (report.isCurrent ? generatedAt : report.end);

// A plain-language summary written from the month's own numbers.
export const summaryText = (firstName, report) => {
  const month = monthTitle(report);
  const { lessons, attendance, work, achievements } = report;

  const nothing =
    lessons.completed === 0 && attendance.held === 0 && work.submitted === 0 && achievements.length === 0;
  if (nothing) {
    return `${firstName} has no recorded activity for ${month} yet.`;
  }

  const parts = [];
  parts.push(`completed ${lessons.completed} lesson${lessons.completed === 1 ? "" : "s"}`);
  if (attendance.held > 0) {
    parts.push(
      `attended ${attendance.present + attendance.late} of ${attendance.held} class${attendance.held === 1 ? "" : "es"} (${attendance.rate}%)`
    );
  }
  if (work.submitted > 0) {
    parts.push(
      `handed in ${work.submitted} piece${work.submitted === 1 ? "" : "s"} of work` +
        (work.averageScore != null ? ` with an average score of ${work.averageScore}%` : "")
    );
  }
  const list = parts.length > 1 ? `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}` : parts[0];
  const badges = achievements.length
    ? ` ${firstName} also earned ${achievements.length} achievement${achievements.length === 1 ? "" : "s"}.`
    : "";
  return `In ${month}, ${firstName} ${list}.${badges}`;
};

export const escapeHtml = (value) =>
  String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

// A self-contained, print-friendly page for one report (the browser's "Save as PDF" turns it into a file).
export const buildReportHtml = (report, student, generatedAt) => {
  const firstName = student.fullName.split(/\s+/)[0];
  const e = escapeHtml;
  const rows = (items, cells) =>
    items.length
      ? items.map((item) => `<tr>${cells(item).map((c) => `<td>${e(c)}</td>`).join("")}</tr>`).join("")
      : `<tr><td colspan="3" class="muted">Nothing recorded.</td></tr>`;

  return `<!doctype html><html><head><meta charset="utf-8"><title>${e(monthTitle(report))} Progress Report – ${e(student.fullName)}</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;color:#0f172a;margin:32px;line-height:1.5}
  h1{font-size:22px;margin:0}h2{font-size:15px;margin:24px 0 8px;border-bottom:1px solid #e2e8f0;padding-bottom:4px}
  .muted{color:#64748b;font-size:12px}.tiles{display:flex;gap:12px;margin:16px 0}
  .tile{flex:1;border:1px solid #e2e8f0;border-radius:8px;padding:12px}.tile b{display:block;font-size:22px}
  table{width:100%;border-collapse:collapse;font-size:13px}td,th{text-align:left;padding:6px 8px;border-bottom:1px solid #f1f5f9}
  th{background:#f1f5f9}.note{background:#fffbeb;border:1px solid #fde68a;padding:8px 12px;border-radius:6px;font-size:12px}
</style></head><body>
<h1>${e(monthTitle(report))} Progress Report</h1>
<p class="muted">${e(student.fullName)} · Learner ID ${e(student.learnerId)} · ${e(periodText(report))}<br>Generated ${e(formatDate(generatedAt))} at ${e(formatTime(generatedAt))}</p>
${report.isCurrent ? '<p class="note">This month is not over yet, so these figures are the totals so far.</p>' : ""}
<p>${e(summaryText(firstName, report))}</p>
<div class="tiles">
  <div class="tile"><b>${report.lessons.completed}</b>Lessons completed</div>
  <div class="tile"><b>${report.attendance.rate == null ? "—" : report.attendance.rate + "%"}</b>Attendance (${report.attendance.held} classes)</div>
  <div class="tile"><b>${report.work.submitted}</b>Work handed in${report.work.averageScore != null ? " · avg " + report.work.averageScore + "%" : ""}</div>
  <div class="tile"><b>${report.achievements.length}</b>Achievements</div>
</div>
<h2>Lessons by subject</h2>
<table><tr><th>Subject</th><th>Lessons completed</th><th></th></tr>${rows(report.lessons.bySubject, (s) => [s.subject, s.completed, ""])}</table>
<h2>Work handed in</h2>
<table><tr><th>Title</th><th>Subject</th><th>Score</th></tr>${rows(report.work.items, (w) => [w.title, w.subject ?? "—", w.percent == null ? "Awaiting marking" : w.percent + "%"])}</table>
<h2>Achievements</h2>
<table><tr><th>Title</th><th>Type</th><th>Date</th></tr>${rows(report.achievements, (a) => [a.title, a.kind === "REWARD" ? "Reward" : "Badge", formatDate(a.awardedAt)])}</table>
</body></html>`;
};

// Opens the browser's print dialog for the report (choose "Save as PDF" to download it).
export const printReport = (report, student, generatedAt) => {
  const frame = document.createElement("iframe");
  frame.setAttribute("aria-hidden", "true");
  frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  document.body.appendChild(frame);

  const doc = frame.contentWindow.document;
  doc.open();
  doc.write(buildReportHtml(report, student, generatedAt));
  doc.close();

  // Give the frame a moment to lay out before printing, then clean up.
  setTimeout(() => {
    frame.contentWindow.focus();
    frame.contentWindow.print();
    setTimeout(() => frame.remove(), 60000);
  }, 150);
};
