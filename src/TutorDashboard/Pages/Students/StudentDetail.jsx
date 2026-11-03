import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Award, CalendarCheck, ClipboardList, Gift, TrendingUp } from "lucide-react";
import { api } from "../../../lib/api";
import Avatar from "../../../components/Avatar";
import { fullDate } from "../../../StudentPortal/classFormat";

const card = "rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6";
const TABS = [
  { id: "work", label: "Assignments & Quizzes", icon: ClipboardList },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "rewards", label: "Rewards & Badges", icon: Award },
];

const STATUS = {
  GRADED: ["Graded", "bg-emerald-50 text-emerald-700"],
  SUBMITTED: ["Submitted", "bg-blue-50 text-blue-700"],
  PENDING: ["Not submitted", "bg-slate-100 text-slate-600"],
  OVERDUE: ["Overdue", "bg-red-50 text-red-600"],
};
const ATT = {
  PRESENT: ["Present", "bg-emerald-50 text-emerald-700"],
  LATE: ["Late", "bg-amber-50 text-amber-700"],
  ABSENT: ["Absent", "bg-red-50 text-red-600"],
};

function AwardPanel({ studentId, already, onAwarded }) {
  const [options, setOptions] = useState([]);
  const [choice, setChoice] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/rewards").then(setOptions).catch(() => {});
  }, []);

  const available = options.filter((o) => !already.includes(o.id));

  const award = async (e) => {
    e.preventDefault();
    if (!choice || busy) return setMsg({ type: "error", text: "Choose a badge or reward." });
    setBusy(true);
    setMsg({ type: "", text: "" });
    try {
      await api.post(`/rewards/${choice}/award`, { studentId, note: note.trim() || undefined });
      setChoice("");
      setNote("");
      setMsg({ type: "success", text: "Awarded. The student has been notified." });
      onAwarded();
    } catch (err) {
      setMsg({ type: "error", text: err.message || "Could not award this." });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={award} className="mb-6 space-y-3 rounded-xl bg-slate-50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900"><Gift className="h-4 w-4 text-blue-600" /> Give a badge or reward</h3>
        <button type="button" onClick={() => navigate("/tutor/create-reward")} className="text-xs font-semibold text-blue-600 hover:underline">+ Create a new one</button>
      </div>
      {options.length === 0 ? (
        <p className="text-sm text-slate-500">You haven't created any badges or rewards yet.</p>
      ) : (
        <div className="flex flex-wrap gap-3">
          <select value={choice} onChange={(e) => setChoice(e.target.value)} className="h-10 min-w-[200px] rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500">
            <option value="">Select…</option>
            {available.map((o) => <option key={o.id} value={o.id}>{o.title} ({o.kind === "REWARD" ? "reward" : "badge"})</option>)}
          </select>
          <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={500} placeholder="A note for the student (optional)" className="h-10 min-w-[220px] flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-500" />
          <button type="submit" disabled={busy} className="h-10 rounded-lg bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60">{busy ? "Awarding…" : "Award"}</button>
        </div>
      )}
      {msg.text && <p role={msg.type === "error" ? "alert" : "status"} className={`text-sm ${msg.type === "error" ? "text-red-600" : "text-emerald-600"}`}>{msg.text}</p>}
    </form>
  );
}

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("work");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setData(await api.get(`/tutors/students/${id}`));
      setError("");
    } catch (err) {
      setError(err.message || "Could not load this student.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <p className="py-10 text-center text-sm text-slate-400">Loading…</p>;
  if (!data) return <p role="alert" className="py-10 text-center text-sm text-red-600">{error || "Student not found."}</p>;

  const { student, stats, assessments, attendance, awards } = data;
  const pct = (v) => (v == null ? "–" : `${v}%`);
  const cards = [
    { label: "Performance", value: pct(stats.performance), icon: TrendingUp },
    { label: "Attendance", value: pct(stats.attendanceRate), icon: CalendarCheck },
    { label: "Classes attended", value: String(stats.classesAttended), icon: CalendarCheck },
    { label: "Work to submit", value: String(stats.pending), icon: ClipboardList },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5 px-1 py-4">
      <button type="button" onClick={() => navigate("/tutor/students")} className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800">
        <ArrowLeft className="h-4 w-4" /> Back to students
      </button>

      <section className={`${card} flex flex-wrap items-center gap-5`}>
        <Avatar name={student.fullName} avatarUrl={student.avatarUrl} className="h-16 w-16 rounded-full" textClassName="text-xl" />
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900">{student.fullName}</h1>
          <p className="text-sm text-slate-500">
            {student.subjects.map((s) => `${s.name}${s.yearLevel ? ` · ${s.yearLevel}` : ""}`).join("  |  ") || "No subjects"}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {student.learnerId} · Joined {fullDate(student.joined)}
            {stats.lastClassAt ? ` · Last class ${fullDate(stats.lastClassAt)}` : ""}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className={`${card} !p-4`}>
            <Icon className="mb-2 h-5 w-5 text-blue-600" />
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className={card}>
        <div className="mb-5 flex flex-wrap gap-2 border-b border-slate-100 pb-3">
          {TABS.map(({ id: key, label, icon: Icon }) => (
            <button key={key} type="button" onClick={() => setTab(key)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${tab === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}>
              <Icon className="h-4 w-4" /> {label}
            </button>
          ))}
        </div>

        {tab === "work" && (
          assessments.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">You haven't set any work for this student yet.</p> : (
            <ul className="divide-y divide-slate-100">
              {assessments.map((a) => (
                <li key={a.id} onClick={() => navigate(`/tutor/assignment-quize/${a.id}`)} className="flex cursor-pointer flex-wrap items-center justify-between gap-3 py-3 hover:bg-slate-50/60">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                    <p className="text-xs text-slate-400">{a.type === "QUIZ" ? "Quiz" : "Assignment"} · {a.subject}{a.dueAt ? ` · due ${fullDate(a.dueAt)}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {a.score != null && <span className="text-sm font-semibold text-slate-700">{a.score}/{a.max}</span>}
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS[a.status][1]}`}>{STATUS[a.status][0]}</span>
                  </div>
                </li>
              ))}
            </ul>
          )
        )}

        {tab === "attendance" && (
          attendance.length === 0 ? <p className="py-6 text-center text-sm text-slate-400">No attendance has been recorded for this student yet.</p> : (
            <ul className="divide-y divide-slate-100">
              {attendance.map((a) => (
                <li key={`${a.classId}`} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{a.subject} – {a.title}</p>
                    <p className="text-xs text-slate-400">{fullDate(a.startsAt)}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${ATT[a.status][1]}`}>{ATT[a.status][0]}</span>
                </li>
              ))}
            </ul>
          )
        )}

        {tab === "rewards" && (
          <>
            <AwardPanel studentId={student.id} already={awards.map((a) => a.id)} onAwarded={load} />
            {awards.length === 0 ? <p className="py-4 text-center text-sm text-slate-400">Nothing awarded yet.</p> : (
              <ul className="grid gap-3 sm:grid-cols-2">
                {awards.map((a) => (
                  <li key={a.id} className="rounded-xl border border-slate-100 p-4">
                    <p className="text-sm font-bold text-slate-900">{a.title} <span className="font-normal text-slate-400">· {a.kind === "REWARD" ? "reward" : "badge"}</span></p>
                    <p className="text-xs text-slate-400">Awarded {fullDate(a.awardedAt)}{a.points ? ` · ${a.points} points` : ""}</p>
                    {a.note && <p className="mt-1 text-sm text-slate-600">“{a.note}”</p>}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </div>
  );
}
