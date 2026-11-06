// Shapes the API's attendance records into the fields the attendance tables render.
const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtTime = (d) => new Date(d).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });

export const dayInput = (d) => {
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Monday to Sunday of the current week, as YYYY-MM-DD strings.
export const thisWeek = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { from: dayInput(start), to: dayInput(end) };
};

export const toRow = (r) => ({
  id: r.id,
  userId: r.userId,
  date: fmtDate(r.startsAt),
  dateISO: dayInput(new Date(r.startsAt)),
  studentName: r.studentName,
  studentId: r.learnerId,
  subject: `${r.subject}${r.level ? `-${r.level}` : ""}`,
  classTime: `${fmtTime(r.startsAt)} – ${fmtTime(r.endsAt)}`,
  timeJoined: "—", // join times are not recorded
  tutorName: r.tutorName,
  tutorId: `TID${String(r.tutorId).padStart(6, "0")}`,
  duration: `${Math.round((new Date(r.endsAt) - new Date(r.startsAt)) / 60000)} min`, // scheduled length
  attendance: r.statusLabel,
});
